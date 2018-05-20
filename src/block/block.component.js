import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import ReactList from 'react-list';
import TimeAgo from 'react-timeago';
import NumberFormat from 'react-number-format';

import {loadBlock, loadTransactionsByBlock} from "./block.actions";
import {DATA_LOADING_STATUS} from "../data-loading-status";
import {TRON_TOKEN_NAME, TRX_PRECISION} from "../config/tron-api.config";

export class Block extends React.Component {
    constructor() {
        super();
        this.renderTransaction = this.renderTransaction.bind(this);
        this.goToTransactionDetails = this.goToTransactionDetails.bind(this);
    }

    componentDidMount() {
        if(this.props.statusOfDataLoading === DATA_LOADING_STATUS.DATA_HAVE_NOT_BEEN_LOADED) {
            this.props.actions.loadBlock(this.props.match.params.searchTerm);
        }
        this.props.actions.loadTransactionsByBlock(this.props.selectedBlock.number);
    }

    goToTransactionDetails() {
        event.preventDefault();
        event.stopPropagation();
    }

    renderTransaction(index, key) {
        const dataLoadedClassName = this.props.statusOfDataLoading === DATA_LOADING_STATUS.DATA_HAVE_BEEN_LOADED
            ? "loaded":"";
        const amount = this.props.transactions[index].tokenName === TRON_TOKEN_NAME?
            this.props.transactions[index].amount/TRX_PRECISION: this.props.transactions[index].amount;
        return (
            <div key={key} className="result-block">
                <div className={`data-piece loading ${dataLoadedClassName}`}>
                    <span className="balance result-title">
                        <NumberFormat value={amount} thousandSeparator={" "} displayType={'text'}/>
                         &nbsp;{this.props.transactions[index].tokenName}
                    </span>
                </div>

                <div className={`data-piece loading ${dataLoadedClassName}`}>
                    <a className="link result-attr-1"> {this.props.transactions[index].transferFromAddress}</a>
                    <span className="icon href"/>
                </div>


                <div className={`data-piece loading ${dataLoadedClassName}`}>
                    <span className="icon flow to" id="icon-direction"/>
                    <a className="link result-attr-2"> {this.props.transactions[index].transferToAddress}</a>
                    <span className="icon href"/>
                </div>

                <div className={`data-piece loading ${dataLoadedClassName}`}>
                    <a className="link result-attr-3 truncate" onClick={this.goToTransactionDetails}>
                        <span className="icon hashtag"/>
                        {this.props.transactions[index].hash}
                    </a>
                    <span className="icon href"/>
                </div>
            </div>
        );
    }


    render() {
        const dataLoadedClassName = this.props.statusOfDataLoading === DATA_LOADING_STATUS.DATA_HAVE_BEEN_LOADED
            ? "loaded":"";
        return (
            <div className="results visible">
                <div className="main-block">
                    <h3 className={`data-piece loading ${dataLoadedClassName}`} id="h3-main">BLOCK HEIGHT</h3>
                    <span className={`data-piece loading ${dataLoadedClassName}`} id="search-result">
                        {this.props.selectedBlock.number}
                    </span>
                    <a className={`data-piece loading ${dataLoadedClassName} balance`} id="data-main">
                        <TimeAgo date={this.props.selectedBlock.timestamp}/>
                    </a>
                    <span className={`data-piece loading ${dataLoadedClassName} result-block-hash`}>
                    #&nbsp;{this.props.selectedBlock.hash}
                    </span>
                    <h3 className={`data-piece loading ${dataLoadedClassName}`} id="h3-secondary">TRANSACTIONS</h3>
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

Block.propTypes = {
    selectedBlock: PropTypes.shape({
        hash: PropTypes.string.isRequired,
        nrOfTrx: PropTypes.number.isRequired,
        number: PropTypes.number.isRequired,
        parentHash: PropTypes.string.isRequired,
        size: PropTypes.number.isRequired,
        timestamp: PropTypes.number.isRequired,
        txTrieRoot: PropTypes.string.isRequired,
        witnessAddress: PropTypes.string.isRequired,
        witnessId: PropTypes.number.isRequired
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
        loadBlock: PropTypes.func.isRequired,
        loadTransactionsByBlock: PropTypes.func.isRequired,
    }),
};

function mapStateToProps(state) {
    return {
        selectedBlock: state.blockSummary.block,
        transactions: state.blockSummary.transactions,
        statusOfDataLoading: state.blockSummary.statusOfDataLoading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            loadBlock: loadBlock,
            loadTransactionsByBlock: loadTransactionsByBlock,
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Block);
