import { from, of } from 'rxjs';
import { mergeMap, map, catchError} from 'rxjs/operators';

import {TronBlockchainClient} from '../services/tron-api';
import {BlockActionTypes, blockHasBeenLoaded, blockHasNotBeenLoaded} from './block.actions';

export const loadBlock = action$ =>
    action$.ofType(BlockActionTypes.LOAD_BLOCK)
        .pipe(
            mergeMap(() =>
                from(TronBlockchainClient.getLatestBlock()).pipe(
                    map((lastBlock) => blockHasBeenLoaded(lastBlock)),
                    catchError((error) => {
                        console.error(error);
                        return of(blockHasNotBeenLoaded());
                    })
                )

            ),
        );

