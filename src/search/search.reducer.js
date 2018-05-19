import initialState from '../state/initialState';
import {SearchActionTypes, SearchStatus} from "./search.actions";

export default (state = initialState.searchEngine, action) => {
    switch (action.type) {
        case SearchActionTypes.NOTHING_FOUND:
            return {...state, status: SearchStatus.NOTHING_WAS_FOUND};
        case SearchActionTypes.FOUND_SOMETHING:
            return {...state, status: SearchStatus.FOUND_SOMETHING};
        default:
            return state;
    }
};
