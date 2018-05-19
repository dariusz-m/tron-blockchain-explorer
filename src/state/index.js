import { createStore, applyMiddleware} from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import reducers from './reducers';
import { rootEpic } from './rootEpic';
import initialState from "./initialState";

export const history = createHistory();

export default function configureStore() {
    const composeEnhancers = composeWithDevTools({});
    const epicMiddleware = createEpicMiddleware(rootEpic);
    const historyMiddleware = routerMiddleware(history);

    return createStore(reducers, initialState, composeEnhancers(applyMiddleware(epicMiddleware, historyMiddleware)));
}
