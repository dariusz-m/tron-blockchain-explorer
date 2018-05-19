import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import searchEngineReducer from '../search/search.reducer';
import blockSummaryReducer from '../block/block.reducer';
import accountSummaryReducer from '../account-summary/account-summary.reducer';

export default combineReducers({
    router: routerReducer,
    searchEngine: searchEngineReducer,
    blockSummary: blockSummaryReducer,
    accountSummary: accountSummaryReducer,
});
