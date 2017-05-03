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
import {grey400} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FilterEditor from './FilterEditor';

import { loadAILogs } from '../../actions/ai-async';
import { getAiApp } from '../../store';

import { prepareIcon, formatFirstLine, formatSecondLine } from './formatter';

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left">
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const rightIconMenu = (log, instance) => (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem onTouchTap={instance.selectItem(log)}>Explore</MenuItem>
  </IconMenu>
);

const style = {
    position: 'fixed',
    bottom: '20px',
    right: '20px'
};

class _ListLogsPage extends Component {

    constructor(props) {
        super(props);

        this.onRefreshRequested = this.onRefreshRequested.bind(this);
        this.startFilters = this.startFilters.bind(this);
        this.selectItem = this.selectItem.bind(this);
        this.closeFilters = this.closeFilters.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);

        this.state = {
            showingFilters: false
        };
    }

    static contextTypes = {
        router: PropTypes.object.isRequired,
    };

    onRefreshRequested() {
        this.props.onRefresh(
            this.props.app.appId,
            this.props.app.appKey,
            this.props.app.filters.types,
            this.props.app.filters.date
        );
    }

    selectItem(log) {
        return () => {
            this.context.router.history.push(`/log/${this.props.app.appId}/entry/${log.type}/${log.id}`);
        };
    }

    componentDidMount() {
        this.onRefreshRequested();
    }

    startFilters() {
        this.setState({
            showingFilters: true
        });
    }

    closeFilters() {
        this.setState({
            showingFilters: false
        });
    }

    handleFilterChange(date, types) {
        this.props.onRefresh(
            this.props.app.appId,
            this.props.app.appKey,
            types,
            date
        );
    }

    render() {

        var items = this.props.app.logs.map(log => (
            <ListItem key={log.id}
                rightIconButton={rightIconMenu(log, this)}
                leftIcon={prepareIcon(log)}
                primaryText={formatFirstLine(log)}
                secondaryText={formatSecondLine(log)}
                secondaryTextLines={2}
                onTouchTap={this.selectItem(log).bind(this)} />
            
        ));

        return (
            <div>
                <FilterEditor 
                    open={this.state.showingFilters} 
                    date={this.props.app.filters.date}
                    types={this.props.app.filters.types}
                    close={this.closeFilters}
                    filter={this.handleFilterChange}
                />
                <List>
                    <Subheader>
                        <FlatButton onTouchTap={this.startFilters}>Filters</FlatButton>
                    </Subheader>
                    <Divider />
                    {items}
                    <FloatingActionButton 
                        style={style}
                        onTouchTap={this.onRefreshRequested}>
                        <Replay />
                    </FloatingActionButton>
                </List>
            </div>
        )
    }
}

const mapStateToProps = ({ }, ownProps) => {
    return {
        app: getAiApp(ownProps.match.params.id)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRefresh: (appId, appKey, types, timeSpan) => dispatch(loadAILogs(appId, appKey, types, timeSpan))
    };
}

const ListLogsPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(_ListLogsPage));

export default ListLogsPage;