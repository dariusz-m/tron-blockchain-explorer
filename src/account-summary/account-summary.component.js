import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import ReactList from 'react-list';
import TimeAgo from 'react-timeago';
import NumberFormat from 'react-number-format';

import {loadAccountDetails, loadTransactionsByAccount} from './account-summary.actions';
import {DATA_LOADING_STATUS} from "../data-loading-status";
import {TRON_TOKEN_NAME, TRX_PRECISION} from "../config/tron-api.config";

export class AccountSummary extends React.Component {
    constructor() {
        super();
        this.renderTransaction = this.renderTransaction.bind(this);
        this.goToTransactionDetails = this.goToTransactionDetails.bind(this);
    }

    componentDidMount() {
        if(this.props.statusOfDataLoading === DATA_LOADING_STATUS.DATA_HAVE_NOT_BEEN_LOADED) {
            this.props.actions.loadAccountDetails(this.props.match.params.address);
        }
        this.props.actions.loadTransactions(this.props.match.params.address);
    }

    goToTransactionDetails() {
        event.preventDefault();
        event.stopPropagation();
    }

    renderTransaction(index, key) {
        const flowDirection = this.props.account.address === this.props.transactions[index].transferFromAddress?
            {address: this.props.transactions[index].transferToAddress, directionClassName: 'to'}
            : {address: this.props.transactions[index].transferFromAddress, directionClassName: 'from'};

        const amount = this.props.transactions[index].tokenName === TRON_TOKEN_NAME?
            this.props.transactions[index].amount/TRX_PRECISION: this.props.transactions[index].amount;

        const dataLoadedClassName = this.props.statusOfDataLoading === DATA_LOADING_STATUS.DATA_HAVE_BEEN_LOADED
            ? "loaded":"";

        return (
            <div key={key} className="result-block">
                <div className={`data-piece loading ${dataLoadedClassName}`}>
                    <span className="balance result-title">
                        <NumberFormat value={amount} thousandSeparator={" "} displayType={'text'}/>
                        &nbsp;{this.props.transactions[index].tokenName}</span>
                    <span className="result-title-side">
                        <TimeAgo date={this.props.transactions[index].timestamp}/>
                    </span>
                </div>
                <div className={`data-piece loading ${dataLoadedClassName}`}>
                    <span className={`icon flow ${flowDirection.directionClassName}`} id="icon-direction"/>
                    <a className="link result-attr-2"> {flowDirection.address}</a>
                    <span className="icon href"/>
                </div>
                <div className={`data-piece loading ${dataLoadedClassName}`}>
                    <a className="link result-attr-3 truncate" onClick={this.goToTransactionDetails}>
                        <span className="icon hashtag"/>
                        {this.props.transactions[index].hash}</a>
                    <span className="icon href"/>
                </div>
            </div>

        );
    }


    render() {
        const dataLoadedClassName = this.props.statusOfDataLoading === DATA_LOADING_STATUS.DATA_HAVE_BEEN_LOADED
            ? "loaded":"";
        const balance = this.props.account.balance/TRX_PRECISION;
        return (
            <div className="results visible">
                <div className="main-block">
                    <h3 className={`data-piece loading ${dataLoadedClassName}`} id="h3-main">Account</h3>
                    <span className={`data-piece loading ${dataLoadedClassName}`} id="search-result">
                        {this.props.account.address}
                    </span>
                    <a className={`data-piece loading ${dataLoadedClassName} balance`} id="data-main">{balance} TRX</a>
                    <h3 className={`data-piece loading ${dataLoadedClassName}`} id="h3-secondary">
                        Recent transactions
                    </h3>
                </div>
                <div className="scrollable-wrapper">
                    <ReactList
                        itemRenderer={this.renderTransaction}
                        length={this.props.transactions.length}
                        pageSize={1}
                    />
                </div>
            </div>
        );
    }
}

AccountSummary.propTypes = {
    account: PropTypes.shape({
        address: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        /* e.g {"Shasta": 1024, "By A Nose": 5300, "Head Coin": 1301}*/
        tokenBalances: PropTypes.object.isRequired,
    }).isRequired,
    transactions: PropTypes.arrayOf(PropTypes.shape({
        amount: PropTypes.number.isRequired,
        block: PropTypes.number.isRequired,
        hash: PropTypes.string.isRequired,
        timestamp: PropTypes.number.isRequired,
        tokenName: PropTypes.string.isRequired,
        transferFromAddress: PropTypes.string.isRequired,
        transferToAddress: PropTypes.string.isRequired
    })).isRequired,
    statusOfDataLoading: PropTypes.string.isRequired,
    actions: PropTypes.shape({
        loadTransactions: PropTypes.func.isRequired,
        loadAccountDetails: PropTypes.func.isRequired,
    }),
};

function mapStateToProps(state) {
    return {
        account: state.accountSummary.account,
        transactions: state.accountSummary.transactions,
        statusOfDataLoading: state.accountSummary.statusOfDataLoading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            loadTransactions: loadTransactionsByAccount,
            loadAccountDetails: loadAccountDetails,
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSummary);
