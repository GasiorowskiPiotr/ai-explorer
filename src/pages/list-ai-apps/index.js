import React, {Component} from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { sortBy } from 'lodash';

import { withRouter } from 'react-router';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import {grey400} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { removeAiApp } from '../../actions/ai';

import { removeById } from '../../repository'

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left">
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const rightIconMenu = (app, instance) => (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem onTouchTap={instance.selectItem(app)}>Explore</MenuItem>
    <MenuItem onTouchTap={instance.deleteItem(app)}>Delete</MenuItem>
  </IconMenu>
);

const style = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 1000
};

class _ListAIAppPage extends Component {

    constructor(props) {
        super(props);

        this.onAddRequested = this.onAddRequested.bind(this);
        this.selectItem = this.selectItem.bind(this);
        this.removeFromLocalStorage = this.removeFromLocalStorage.bind(this);
    }

    static contextTypes = {
        router: PropTypes.object.isRequired,
    };

    onAddRequested() {
        this.context.router.history.push('/add');
    }

    selectItem(app) {
        return (e) => { 
            e && e.preventDefault();
            this.context.router.history.push(`/logs/${app.appId}`); 
        };
    }

    deleteItem(app) {
        return (e) => {
            e && e.preventDefault();

            this.removeFromLocalStorage(app.appId);
            this.props.deleteItem(app.appId);
        }
    }

    removeFromLocalStorage(appId) {
        removeById(appId);
    }

    render() {

        var items = sortBy(this.props.apps, [(i) => i.appName.toLowerCase()]).map(app => (
            <ListItem key={app.appId}
                rightIconButton={rightIconMenu(app, this)}
                primaryText={app.appName}
                secondaryText={app.appId}
                secondaryTextLines={1}
                onTouchTap={this.selectItem(app).bind(this)} />
            
        ));

        return (
            <List>
                <Subheader>
                    Registered AI Applications
                </Subheader>
                <Divider />
                {items}
                <FloatingActionButton 
                    style={style}
                    onTouchTap={this.onAddRequested}>
                    <ContentAdd />
                </FloatingActionButton>
            </List>
        );
    }
}

const mapStateToProps = ({ai}) => {
    return {
        apps: ai
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteItem: (id) => dispatch(removeAiApp(id))
    };
};

const ListAIAppPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(_ListAIAppPage));

export default ListAIAppPage;