import { combineEpics } from 'redux-observable';

import {loadTokens} from '../tokens/tokens.epics';
import {loadBlock} from '../block/block.epics';

export const rootEpic = combineEpics(
    loadTokens,
    loadBlock
);
