import React from 'react';
import {Link, Switch, Route, Redirect} from "react-router-dom";
import { hot } from 'react-hot-loader';

import Block from "./block/block.component";
import Search from "./search/search.component";
import AccountSummary from "./account-summary/account-summary.component";

export class App extends React.Component {
    render() {
        return (
            <div className="inner-container">
                <Search/>
                <Switch>
                    <Route exact path="/" component={() => <div/>}/>
                    <Route path="/account/:address" component={AccountSummary}/>
                    <Route path="/block/:searchTerm" component={Block}/>
                    <Redirect to="/"/>
                </Switch>
            </div>
        );
    }
}

export default hot(module)(App);
