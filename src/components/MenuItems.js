import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import MenuItem from 'material-ui/MenuItem';

export default class MenuItems extends Component {

    static contextTypes = {
        router: PropTypes.object.isRequired,
    };

    handleRedirect(where) {
        return (e) => {
            e && e.preventDefault();

            this.context.router.history.push(where);
            this.props.onSelected(where);
        }
    }

    render() {
        return (
            <div>
                <MenuItem onTouchTap={this.handleRedirect('/').bind(this)}>My AI Apps</MenuItem>
                <MenuItem onTouchTap={this.handleRedirect('/add').bind(this)}>Add AI App</MenuItem>
                <MenuItem onTouchTap={this.handleRedirect('/add-batch').bind(this)}>Add AI Group</MenuItem>
            </div>
        );
    }

}