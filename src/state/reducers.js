import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import counterReducer from '../counter/counter.reducer';

export default combineReducers({
    router: routerReducer,
    counter: counterReducer
});
