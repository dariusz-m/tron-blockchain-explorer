import { from, of, merge } from 'rxjs';
import { mergeMap, map, catchError, pluck} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

import {
    BlockActionTypes,
    blockHasBeenLoaded,
    blockHasNotBeenLoaded,
    transactionsByBlockHaveBeenLoaded, transactionsByBlockHaveNotBeenLoaded
} from './block.actions';
import {makeRequest, TYPE_OF_REQUESTS} from "../search/search.epics";
import {filter} from "rxjs/operators/index";
import {TRON_ORGIN} from "../config/tron-api.config";

export const loadBlock = action$ => {
    return action$.ofType(BlockActionTypes.LOAD_BLOCK)
        .pipe(
            mergeMap((action) => merge(
                makeRequest(
                    `${TRON_ORGIN}/api/block?sort=-number&limit=1&number=${action.payload}`,
                    TYPE_OF_REQUESTS.BLOCK_BY_NUMBER
                ),
                makeRequest(
                    `${TRON_ORGIN}/api/block?sort=-number&limit=1&hash=${action.payload}`,
                    TYPE_OF_REQUESTS.BLOCK_BY_HASH
                )
            ).pipe(
                filter((response) => response.data.length > 0),
                map((response) => blockHasBeenLoaded(response.data[0])),
                catchError((error) => {
                    console.error(error);
                    return of(blockHasNotBeenLoaded());
                }),
            )),
        );
};

export const loadTransactionsByBlock = action$ =>
    action$.ofType(BlockActionTypes.LOAD_TRANSACTIONS_BY_BLOCK)
        .pipe(
            mergeMap((action) =>
                from(
                    ajax(`${TRON_ORGIN}/api/transaction?sort=-timestamp&limit=100&start=0&block=${action.payload}`)
                ).pipe(
                    pluck('response','data'),
                    map((transactions) => transactionsByBlockHaveBeenLoaded(transactions)),
                    catchError((error) => {
                        console.error(error);
                        return of(transactionsByBlockHaveNotBeenLoaded());
                    })
                )
            ),
        );
