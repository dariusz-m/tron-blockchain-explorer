import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {loadBlock} from "./block.actions";

export class Block extends React.Component {
    componentDidMount() {
        this.props.actions.loadBlock();
    }

    render() {
        return (
            <div>
                <h2>Block</h2>
                <div><pre>{JSON.stringify(this.props.selectedBlock, null, 2) }</pre></div>
            </div>
        );
    }
}

Block.propTypes = {
    selectedBlock: PropTypes.shape({
        number: PropTypes.number.isRequired,
        witnessId: PropTypes.number.isRequired,
        hash: PropTypes.string.isRequired,
        parentHash: PropTypes.string.isRequired,
    }).isRequired,
    actions: PropTypes.shape({
        loadBlock: PropTypes.func.isRequired,
    }),
};

function mapStateToProps(state) {
    return {
        selectedBlock: state.selectedBlock
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            loadBlock: loadBlock,
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Block);
