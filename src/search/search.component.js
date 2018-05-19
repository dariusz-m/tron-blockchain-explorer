import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {search} from "./search.actions";
import PropTypes from "prop-types";

export class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };

        this.onChange = this.onChange.bind(this);
        this.search = this.search.bind(this);
    }

    search(event) {
        event.preventDefault();
        event.stopPropagation();
        this.props.actions.search(this.state.value);
    }

    onChange(event) {
        this.setState(() => {
            return {value: event.target.value};
        });
        event.persist();
    }

    render() {
        return (
            <div>
                <form className="search">
                    <input type="text" value={this.state.value} onChange={this.onChange}/>
                    <button onClick={this.search}>Search</button>
                </form>
            </div>
        );
    }
}

Search.propTypes = {
    actions: PropTypes.shape({
        search: PropTypes.func.isRequired,
    }),
};


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            search: search,
        }, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(Search);
