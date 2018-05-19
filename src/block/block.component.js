import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import ReactList from 'react-list';

import {loadBlock, loadTransactionsByBlock} from "./block.actions";
import {DATA_LOADING_STATUS} from "../data-loading-status";

export class Block extends React.Component {
    constructor() {
        super();
        this.renderTransaction = this.renderTransaction.bind(this);
    }

    componentDidMount() {
        if(this.props.statusOfDataLoading === DATA_LOADING_STATUS.DATA_HAVE_NOT_BEEN_LOADED) {
            this.props.actions.loadBlock(this.props.match.params.searchTerm);
        }
        this.props.actions.loadTransactionsByBlock(this.props.selectedBlock.number);
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

    // render() {
    //     return (
    //         <div>
    //             <h2>Block</h2>
    //             <div><pre>{JSON.stringify(this.props.selectedBlock, null, 2) }</pre></div>
    //
    //             <h2>Transactions</h2>
    //             <div style={{overflow: 'auto', maxHeight: 200}}>
    //                 <ReactList
    //                     itemRenderer={this.renderTransaction}
    //                     length={this.props.transactions.length}
    //                 />
    //             </div>
    //         </div>
    //     );
    // }

    render() {
        return (
            <div className="results visible">
                <div className="main-block">
                    <h3 className="data-piece loading loaded" id="h3-main">BLOCK HEIGHT</h3>
                    <span className="data-piece loading loaded" id="search-result">53402</span>
                    <a className="data-piece loading loaded balance" id="data-main">5 minutes ago</a>
                    <span className="data-piece loading loaded result-block-hash">
                    # 27w8fusdksjYFn4qNSda4H4sUu5zURba321
                    </span>
                    <h3 className="data-piece loading loaded" id="h3-secondary">TRANSACTIONS</h3>
                </div>
                <div className="result-block">
                    <div className="data-piece loading loaded">
                        <span className="balance result-title">1 043 TRX</span>
                    </div>

                    <div className="data-piece loading loaded">
                        <a className="link result-attr-1" href=""> 27w8fusdksjYFn4qNSda4H4sUu5zURba321</a>
                        <span className="icon href"/>
                    </div>


                    <div className="data-piece loading loaded">
                        <span className="icon flow to" id="icon-direction"/>
                        <a className="link result-attr-2" href=""> 27jXY5ZL6qWYFn4qNSda4H4sUu5zURb5sC3</a>
                        <span className="icon href"/>
                    </div>

                    <div className="data-piece loading loaded">
                        <a className="link result-attr-3 truncate" href="">
                            <span className="icon hashtag"/>
                            7d0d77b9b5509c1a232401db1a74f09cc93e29f8575a1ee0e421beba9d4cb5da
                        </a>
                        <span className="icon href"/>
                    </div>
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
