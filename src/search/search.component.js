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
        event.preventDefault();
    }

    render() {
        return (
            <div className="wrapper-search">
                <a className="logo"/>
                <form className="search-widget" onSubmit={this.search}>
                    <input className="search-bar"
                           id="search-bar"
                           placeholder="Transaction, block, account, token..."
                           autoFocus
                           type="text"
                           value={this.state.value}
                           onChange={this.onChange}
                    />
                        <a className="btn search" id="btn-search" onClick={this.search}>
                            &nbsp;
                        </a>
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
