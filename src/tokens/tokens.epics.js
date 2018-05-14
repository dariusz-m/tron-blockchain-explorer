import { from, of } from 'rxjs';
import { mergeMap, map, catchError} from 'rxjs/operators';

import {TronBlockchainClient} from '../services/tron-api';
import {TokensActionTypes, tokensHaveBeenLoaded, tokensHaveNotBeenLoaded} from './tokens.actions';

export const loadTokens = action$ =>
    action$.ofType(TokensActionTypes.LOAD_TOKENS)
        .pipe(
            mergeMap(() =>
                from(TronBlockchainClient.getAssetIssueList()).pipe(
                    map((tokens) => tokensHaveBeenLoaded(tokens)),
                    catchError((error) => {
                        console.error(error);
                        return of(tokensHaveNotBeenLoaded());
                    })
                )

            ),
        );

