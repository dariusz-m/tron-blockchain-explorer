import initialState from '../state/initialState';
import {AccountSummaryActionTypes} from './account-summary.actions';
import {DATA_LOADING_STATUS} from "../data-loading-status";

export default (state = initialState.accountSummary, action) => {
    switch (action.type) {
        case AccountSummaryActionTypes.ACCOUNT_DETAILS_HAVE_BEEN_LOADED:
            return {...state, account: action.payload, statusOfDataLoading: DATA_LOADING_STATUS.DATA_HAVE_BEEN_LOADED};
        case AccountSummaryActionTypes.LOAD_ACCOUNT_DETAILS:
            return {...state, statusOfDataLoading: DATA_LOADING_STATUS.DATA_PROCESSING};
        case AccountSummaryActionTypes.TRANSACTION_BY_ACCOUNT_HAVE_BEEN_LOADED:
            return {...state, transactions: action.payload};
        default:
            return state;
    }
};
