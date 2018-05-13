import './style.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import {Provider} from "react-redux";
import { ConnectedRouter } from 'react-router-redux';

import configureStore, {history} from "./state";

const configuredStore = configureStore();

const TronBlockchainExplorer = () => (
    <Provider store={configuredStore}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>
);

ReactDOM.render(<TronBlockchainExplorer/>, document.getElementById("app"));
