import { combineEpics } from 'redux-observable';

import {loadBlock, loadTransactionsByBlock} from '../block/block.epics';
import {search} from '../search/search.epics';
import {loadTransactionsByAccount, loadAccountDetails} from '../account-summary/account-summary.epics';

export const rootEpic = combineEpics(
    loadBlock,
    search,
    loadTransactionsByAccount,
    loadAccountDetails,
    loadTransactionsByBlock
);
