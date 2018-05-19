import { from, of } from 'rxjs';
import { mergeMap, map, catchError, pluck} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

import {
    AccountSummaryActionTypes,
    transactionsByAccountHaveBeenLoaded,
    transactionsByAccountHaveNotBeenLoaded,
    accountDetailsHaveBeenLoaded,
    accountDetailsHaveNotBeenLoaded
} from './account-summary.actions';
import {TRON_ORGIN} from "../config/tron-api.config";

export const loadTransactionsByAccount = action$ =>
    action$.ofType(AccountSummaryActionTypes.LOAD_TRANSACTIONS_BY_ACCOUNT)
        .pipe(
            mergeMap((action) =>
                from(
                    ajax(`${TRON_ORGIN}/api/transaction?sort=-timestamp&address=${action.payload}`)
                ).pipe(
                    pluck('response','data'),
                    map((transactions) => transactionsByAccountHaveBeenLoaded(transactions)),
                    catchError((error) => {
                        console.error(error);
                        return of(transactionsByAccountHaveNotBeenLoaded());
                    })
                )
            ),
        );

export const loadAccountDetails = action$ =>
    action$.ofType(AccountSummaryActionTypes.LOAD_ACCOUNT_DETAILS)
        .pipe(
            mergeMap((action) =>
                from(
                    ajax(`${TRON_ORGIN}/api/account?sort=-balance&limit=1&address=${action.payload}`)
                ).pipe(
                    pluck('response','data'),
                    map((accountDetails) => accountDetailsHaveBeenLoaded(accountDetails[0])),
                    catchError((error) => {
                        console.error(error);
                        return of(accountDetailsHaveNotBeenLoaded());
                    })
                )
            ),
        );

