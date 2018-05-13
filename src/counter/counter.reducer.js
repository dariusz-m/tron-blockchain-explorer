import initialState from '../state/initialState';
import {CounterActionType} from './counter.actions';

export default (state = initialState.counter, action) => {
    switch (action.type) {
        case CounterActionType.INCREMENT:
            return state + 1;
        case CounterActionType.DECREMENT:
            return state - 1;
        default:
            return state;
    }
};
