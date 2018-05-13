import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {decrement, increment} from "./counter.actions";
import {bindActionCreators} from "redux";

export class Counter extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <h1>Test</h1>
                <h2>Counter: {this.props.counter}</h2>
                <button onClick={this.props.actions.increment}>INC</button>
                <button onClick={this.props.actions.decrement}>DEC</button>
            </div>
        );
    }
}

Counter.propTypes = {
    counter: PropTypes.number.isRequired,
    actions: PropTypes.shape({
        increment: PropTypes.func.isRequired,
        decrement: PropTypes.func.isRequired,
    }),
};

function mapStateToProps(state) {
    return {
        counter: state.counter
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            increment: increment,
            decrement: decrement
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
