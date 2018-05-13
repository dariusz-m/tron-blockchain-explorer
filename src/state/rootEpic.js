import { combineEpics } from 'redux-observable';

import {increment} from '../counter/counter.epics';

export const rootEpic = combineEpics(
    increment
);
