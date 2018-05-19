import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import ReactList from 'react-list';

import {loadAccountDetails, loadTransactionsByAccount} from './account-summary.actions';
import {DATA_LOADING_STATUS} from "../data-loading-status";

export class AccountSummary extends React.Component {
    constructor() {
        super();
        this.renderTransaction = this.renderTransaction.bind(this);
    }

    componentDidMount() {
        if(this.props.statusOfDataLoading === DATA_LOADING_STATUS.DATA_HAVE_NOT_BEEN_LOADED) {
            this.props.actions.loadAccountDetails(this.props.match.params.address);
        }
        this.props.actions.loadTransactions(this.props.match.params.address);
    }

    renderTransaction(index, key) {
        return (
            <div key={key}>
                <p>{this.props.transactions[index].amount}</p>
                <p>{this.props.transactions[index].block}</p>
                <p>{this.props.transactions[index].hash}</p>
                <p>{this.props.transactions[index].timestamp}</p>
                <p>{this.props.transactions[index].tokenName}</p>
                <p>{this.props.transactions[index].transferFromAddress}</p>
                <p>{this.props.transactions[index].transferToAddress}</p>
            </div>
        );
    }

    render() {
        return (
            <div>
                <h1>Account</h1>
                <p>{this.props.account.address}</p>
                <p>{this.props.account.balance}</p>
                <p>{this.props.account.name}</p>
                <div>

                    {Object.keys(this.props.account.tokenBalances).map((tokenName) => {
                        return <p key={tokenName}>{tokenName}: {this.props.account.tokenBalances[tokenName]}</p>;
                    })}
                </div>
                <h2>Transactions</h2>
                <div style={{overflow: 'auto', maxHeight: 200}}>
                    <ReactList
                        itemRenderer={this.renderTransaction}
                        length={this.props.transactions.length}
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
