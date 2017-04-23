import React, {Component} from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { withRouter } from 'react-router';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FlatButton from 'material-ui/FlatButton';
import Replay from 'material-ui/svg-icons/av/replay';

const style = {
    position: 'fixed',
    bottom: '20px',
    right: '20px'
};

export default class ListLogsPage extends Component {

    constructor(props) {
        super(props);

        this.onRefreshRequested = this.onRefreshRequested.bind(this);
        this.startFilters = this.startFilters.bind(this);
    }

    onRefreshRequested() {

    }

    startFilters() {
        
    }

    render() {
        return (
            <List>
                <Subheader>
                    <FlatButton onTouchTap={this.startFilters}>Filters</FlatButton>
                </Subheader>
                <Divider />
                <FloatingActionButton 
                    style={style}
                    onTouchTap={this.onRefreshRequested}>
                    <Replay />
                </FloatingActionButton>
            </List>
        )
    }

}