import "rxjs/add/operator/do";
import "rxjs/add/operator/mapTo";
import "rxjs/add/operator/mergeMap";

import { fromPromise } from 'rxjs/observable/fromPromise';

import {TronBlockchainClient} from '../services/tron-api';
import {CounterActionType} from './counter.actions';

export const increment = action$ =>
    action$.ofType(CounterActionType.INCREMENT)
        .mergeMap(() => fromPromise(TronBlockchainClient.getLatestBlock()))
        .mergeMap((block) => fromPromise(TronBlockchainClient.getBlockByNum(block.number)))
        .do((data) => {
            console.log(data);
        })
        .mapTo({type: "test"});
