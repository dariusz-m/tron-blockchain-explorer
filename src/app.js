import React from 'react';
import {Link, Route, Switch} from "react-router-dom";
import { hot } from 'react-hot-loader';

import Counter from "./counter/counter";

export class App extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <Link to="/">Home</Link><br/>
                    <Link to="/about">About</Link><br/>
                    <Link to="/topics">topics</Link><br/>
                    <Link to="/counter">counter</Link><br/>
                </div>
                <Switch>
                    <Route exact path="/" component={() => <h1>Home</h1>}/>
                    <Route path="/about" component={() => <h1>about</h1>}/>
                    <Route path="/topics" component={() => <h1>topics</h1>}/>
                    <Route path="/counter" component={Counter}/>
                </Switch>
            </div>
        );
    }
}

export default hot(module)(App);
