import React, {Component} from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { withRouter } from 'react-router';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import {grey400} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FilterEditor from './FilterEditor';

import { loadAILogs } from '../../actions/ai-async';
import { currentLoaded } from '../../actions/current';
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

class _ListLogsPage extends Component {

    constructor(props) {
        super(props);

        this.onRefreshRequested = this.onRefreshRequested.bind(this);
        this.startFilters = this.startFilters.bind(this);
        this.selectItem = this.selectItem.bind(this);
        this.closeFilters = this.closeFilters.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.showExceptions = this.showExceptions.bind(this);

        this.state = {
            showingFilters: false
        };
    }

    static contextTypes = {
        router: PropTypes.object.isRequired,
    };

    onRefreshRequested(e) {

        e && e.preventDefault();

        this.props.onRefresh(
            this.props.app.appId,
            this.props.app.appKey,
            this.props.app.filters.types,
            this.props.app.filters.date,
            100,
            0,
            true
        );
    }

    loadMore(e) {

        e && e.preventDefault();

        this.props.onRefresh(
            this.props.app.appId,
            this.props.app.appKey,
            this.props.app.filters.types,
            this.props.app.filters.date,
            this.props.app.top,
            this.props.app.skip + this.props.app.top,
            false
        );
    }

    selectItem(log) {
        
        return (e) => {

            e && e.preventDefault();

            this.props.onSelect(log);
            this.context.router.history.push(`/log/${this.props.app.appId}/entry/${log.type}/${log.id}`);
        };
    }

    componentDidMount() {
        if(this.props.app.logs && this.props.app.logs.length === 0) {
            this.onRefreshRequested();
        }
    }

    startFilters(e) {

        e && e.preventDefault();

        this.setState({
            showingFilters: true
        });
    }

    closeFilters(e) {

        e && e.preventDefault();

        this.setState({
            showingFilters: false
        });
    }

    handleFilterChange(date, types) {
        this.props.onRefresh(
            this.props.app.appId,
            this.props.app.appKey,
            types,
            date,
            100,
            0,
            true
        );
        this.closeFilters();
    }

    showExceptions(e) {

        e && e.preventDefault();

        this.props.onRefresh(
            this.props.app.appId,
            this.props.app.appKey,
            ['exceptions'],
            this.props.app.filters.date,
            100,
            0,
            true
        );
    }

    render() {

        var items = this.props.app.logs.map((log, idx) => (
            <ListItem key={idx}
                rightIconButton={rightIconMenu(log, this)}
                leftIcon={prepareIcon(log)}
                primaryText={formatFirstLine(log)}
                secondaryText={formatSecondLine(log)}
                secondaryTextLines={2}
                onTouchTap={this.selectItem(log).bind(this)} />
            
        ));

        var loadMore = (
            <ListItem key={"load-more-items"}>
                <FlatButton label="Load more..." fullWidth={true} onTouchTap={this.loadMore}/>
            </ListItem>
        );

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
                            <FlatButton onTouchTap={this.onRefreshRequested}>Reload</FlatButton>
                            <FlatButton onTouchTap={this.showExceptions} secondary={true} style={ {paddingLeft: "15px", paddingRight: "15px"} }>Exceptions: {this.props.app.exceptions || 0}</FlatButton>
                    </Subheader>
                    <Divider />
                    {items}
                    {loadMore}
                </List>
            </div>
        )
    }
}

 // eslint-disable-next-line
const mapStateToProps = ({ }, ownProps) => {
    return {
        app: getAiApp(ownProps.match.params.id)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRefresh: (appId, appKey, types, timeSpan, top, skip, refresh) => dispatch(loadAILogs(appId, appKey, types, timeSpan, top, skip, refresh)),
        onSelect: (entry) => dispatch(currentLoaded(entry))
    };
}

const ListLogsPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(_ListLogsPage));

export default ListLogsPage;