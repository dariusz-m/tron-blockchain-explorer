import React from 'react';
import {Link, Switch, Route, Redirect} from "react-router-dom";
import { hot } from 'react-hot-loader';

import Block from "./block/block.component";
import Search from "./search/search.component";
import AccountSummary from "./account-summary/account-summary.component";

export class App extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <Link to="/">Home</Link><br/>
                </div>
                <Search/>
                <Switch>
                    <Route exact path="/" component={() => <h1>Home</h1>}/>
                    <Route path="/account/:address" component={AccountSummary}/>
                    <Route path="/block/:searchTerm" component={Block}/>
                    <Redirect to="/"/>
                </Switch>
            </div>
        );
    }
}

export default hot(module)(App);
