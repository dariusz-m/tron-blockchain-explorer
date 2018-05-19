import { of, merge } from 'rxjs';
import { mergeMap, catchError, pluck, bufferCount} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

import {foundSomething, nothingFound} from './search.actions';
import {accountDetailsHaveBeenLoaded} from '../account-summary/account-summary.actions';
import {SearchActionTypes} from "./search.actions";
import {push} from "react-router-redux";
import {blockHasBeenLoaded} from "../block/block.actions";
import {TRON_ORGIN} from "../config/tron-api.config";

export const TYPE_OF_REQUESTS = {
    BLOCK_BY_NUMBER: "BLOCK_BY_NUMBER",
    BLOCK_BY_HASH: "BLOCK_BY_HASH",
    TRANSACTION_BY_HASH: "TRANSACTION_BY_HASH",
    TOKEN_BY_NAME: "TOKEN_BY_NAME",
    ACCOUNT_BY_ADDRESS: "ACCOUNT_BY_ADDRESS",
};

export const LOAD_DATA_ACTIONS = {
    [TYPE_OF_REQUESTS.BLOCK_BY_NUMBER]: blockHasBeenLoaded,
    [TYPE_OF_REQUESTS.BLOCK_BY_HASH]: blockHasBeenLoaded,
    [TYPE_OF_REQUESTS.TRANSACTION_BY_HASH]: () => {},
    [TYPE_OF_REQUESTS.TOKEN_BY_NAME]: () => {},
    [TYPE_OF_REQUESTS.ACCOUNT_BY_ADDRESS]: accountDetailsHaveBeenLoaded,
};

export const REDIRECT_ACTIONS = {
    [TYPE_OF_REQUESTS.BLOCK_BY_NUMBER]: (block) => push(`/block/${block.number}`),
    [TYPE_OF_REQUESTS.BLOCK_BY_HASH]: (block) => push(`/block/${block.hash}`),
    [TYPE_OF_REQUESTS.TRANSACTION_BY_HASH]: (transaction) => push(`/transaction/${transaction.hash}`),
    [TYPE_OF_REQUESTS.TOKEN_BY_NAME]: (token) => push(`/token/${token.name}`),
    [TYPE_OF_REQUESTS.ACCOUNT_BY_ADDRESS]: (account) => push(`/account/${account.address}`),
};

export const makeRequest = (url, typeOfRequest) =>
    ajax(url).pipe(
        pluck('response', 'data'),
        mergeMap((data) => of({type: typeOfRequest, data: data, error: ''})),
        catchError((error) => of({type: typeOfRequest, data: [], error: error})),
    );

export const search = action$ => {
    return action$.ofType(SearchActionTypes.SEARCH)
        .pipe(
            mergeMap((action) => merge(
                makeRequest(
                    `${TRON_ORGIN}/api/block?sort=-number&limit=1&number=${action.payload}`,
                    TYPE_OF_REQUESTS.BLOCK_BY_NUMBER
                ),
                makeRequest(
                    `${TRON_ORGIN}/api/block?sort=-number&limit=1&hash=${action.payload}`,
                    TYPE_OF_REQUESTS.BLOCK_BY_HASH
                ),
                makeRequest(
                    `${TRON_ORGIN}/api/account?sort=-balance&limit=1&address=${action.payload}`,
                    TYPE_OF_REQUESTS.ACCOUNT_BY_ADDRESS
                )
            ).pipe(
                bufferCount(3),
                mergeMap((responses) => {
                    for(let i=0; i < responses.length; i++) {
                        if (responses[i].data.length > 0) {
                            const loadData = LOAD_DATA_ACTIONS[responses[i].type];
                            const redirect = REDIRECT_ACTIONS[responses[i].type];
                            return of(
                                loadData(responses[i].data[0]),
                                foundSomething(),
                                redirect(responses[i].data[0]),
                            );
                        }
                    }
                    return of(nothingFound());
                }),
                catchError((error) => {
                    console.error(error);
                    return of(nothingFound());
                }),
            )),
        );
};
