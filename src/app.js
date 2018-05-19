import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Switch, Route, Redirect, withRouter} from "react-router-dom";
import { hot } from 'react-hot-loader';

import Block from "./block/block.component";
import Search from "./search/search.component";
import AccountSummary from "./account-summary/account-summary.component";
import {SearchStatus} from "./search/search.actions";
import {DATA_LOADING_STATUS} from "./data-loading-status";

export class App extends React.Component {
    render() {
        const shouldBeElevated = this.props.searchEngineStatus === SearchStatus.FOUND_SOMETHING ||
            this.props.dataHaveBeenLoaded? "elevated": "";
        return (
            <div className={`inner-container ${shouldBeElevated}`}>
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

App.propTypes = {
    searchEngineStatus: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    const dataHaveBeenLoaded = state.blockSummary.statusOfDataLoading === DATA_LOADING_STATUS.DATA_HAVE_BEEN_LOADED ||
        state.accountSummary.statusOfDataLoading === DATA_LOADING_STATUS.DATA_HAVE_BEEN_LOADED;
    return {
        searchEngineStatus: state.searchEngine.status,
        dataHaveBeenLoaded: dataHaveBeenLoaded,
    };
}

const connectedApp = withRouter(connect(mapStateToProps)(App));

export default hot(module)(connectedApp);
