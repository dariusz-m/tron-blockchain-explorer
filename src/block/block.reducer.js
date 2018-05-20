import initialState from '../state/initialState';
import {BlockActionTypes} from './block.actions';
import {DATA_LOADING_STATUS} from "../data-loading-status";

export default (state = initialState.blockSummary, action) => {
    switch (action.type) {
        case BlockActionTypes.LOAD_BLOCK:
            return {...state, statusOfDataLoading: DATA_LOADING_STATUS.DATA_PROCESSING};
        case BlockActionTypes.BLOCK_HAS_BEEN_LOADED:
            return {...state, block: action.payload, statusOfDataLoading: DATA_LOADING_STATUS.DATA_HAVE_BEEN_LOADED};

        case BlockActionTypes.LOAD_TRANSACTIONS_BY_BLOCK:
            return {...state, statusOfDataLoading: DATA_LOADING_STATUS.DATA_PROCESSING};
        case BlockActionTypes.TRANSACTIONS_BY_BLOCK_HAVE_BEEN_LOADED:
            return {
                ...state,
                transactions: action.payload,
                statusOfDataLoading: DATA_LOADING_STATUS.DATA_HAVE_BEEN_LOADED
            };
        default:
            return state;
    }
};
