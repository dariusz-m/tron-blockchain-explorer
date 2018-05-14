import React from 'react';
import {Link, Route, Switch} from "react-router-dom";
import { hot } from 'react-hot-loader';

import Tokens from "./tokens/tokens.component";
import Block from "./block/block.component";

export class App extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <Link to="/">Home</Link><br/>
                    <Link to="/tokens">Tokens</Link><br/>
                    <Link to="/last-block">Last block</Link><br/>
                </div>
                <Switch>
                    <Route exact path="/" component={() => <h1>Home</h1>}/>
                    <Route path="/tokens" component={Tokens}/>
                    <Route path="/last-block" component={Block}/>
                </Switch>
            </div>
        );
    }
}

export default hot(module)(App);
