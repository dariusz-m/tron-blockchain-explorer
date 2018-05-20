import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import ReactList from 'react-list';
import TimeAgo from 'react-timeago'

import {loadBlock, loadTransactionsByBlock} from "./block.actions";
import {DATA_LOADING_STATUS} from "../data-loading-status";

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
        return (
            <div key={key} className="result-block">
                <div className="data-piece loading loaded">
                    <span className="balance result-title">
                        {this.props.transactions[index].amount} {this.props.transactions[index].tokenName}
                    </span>
                </div>

                <div className="data-piece loading loaded">
                    <a className="link result-attr-1"> {this.props.transactions[index].transferFromAddress}</a>
                    <span className="icon href"/>
                </div>


                <div className="data-piece loading loaded">
                    <span className="icon flow to" id="icon-direction"/>
                    <a className="link result-attr-2"> {this.props.transactions[index].transferToAddress}</a>
                    <span className="icon href"/>
                </div>

                <div className="data-piece loading loaded">
                    <a className="link result-attr-3 truncate" onClick={this.goToTransactionDetails}>
                        <span className="icon hashtag"/>
                        {this.props.transactions[index].hash}
                    </a>
                    <span className="icon href"/>
                </div>
            </div>
        )
    }


    render() {
        return (
            <div className="results visible">
                <div className="main-block">
                    <h3 className="data-piece loading loaded" id="h3-main">BLOCK HEIGHT</h3>
                    <span className="data-piece loading loaded" id="search-result">{this.props.selectedBlock.number}</span>
                    <a className="data-piece loading loaded balance" id="data-main">
                        <TimeAgo date={this.props.selectedBlock.timestamp}/>
                    </a>
                    <span className="data-piece loading loaded result-block-hash">
                    #&nbsp;{this.props.selectedBlock.hash}
                    </span>
                    <h3 className="data-piece loading loaded" id="h3-secondary">TRANSACTIONS</h3>
                </div>
                <div className="scrollable-wrapper">
                    <ReactList
                        itemRenderer={this.renderTransaction}
                        length={this.props.transactions.length}
                    />
                </div>
            </div>
        )
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
