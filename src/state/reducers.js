import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import tokensReducer from '../tokens/tokens.reducer';
import selectedBlockReducer from '../block/block.reducer';

export default combineReducers({
    router: routerReducer,
    tokens: tokensReducer,
    selectedBlock: selectedBlockReducer,
});
