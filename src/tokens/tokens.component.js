import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {loadTokens} from './tokens.actions';

export class Tokens extends React.Component {
    componentDidMount() {
        this.props.actions.loadTokens();
    }

    render() {
        return (
            <div>
                <h1>Tokens</h1>
                {this.props.tokens.map((token) => {
                    return (
                        <div key={token.name}>{token.name}</div>
                    );
                })}
            </div>
        );
    }
}

Tokens.propTypes = {
    tokens: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            ownerAddress: PropTypes.string.isRequired,
            totalSupply: PropTypes.number.isRequired,
            startTime: PropTypes.number.isRequired,
            endTime: PropTypes.number.isRequired,
            description: PropTypes.string.isRequired,
            num: PropTypes.number.isRequired,
            trxNum: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired,
        })
    ).isRequired,
    actions: PropTypes.shape({
        loadTokens: PropTypes.func.isRequired,
    }),
};

function mapStateToProps(state) {
    return {
        tokens: state.tokens
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            loadTokens: loadTokens,
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tokens);
