import initialState from '../state/initialState';
import {TokensActionTypes} from './tokens.actions';

export default (state = initialState.tokens, action) => {
    switch (action.type) {
        case TokensActionTypes.TOKENS_HAVE_BEEN_LOADED:
            return [...action.tokens];
        default:
            return state;
    }
};
