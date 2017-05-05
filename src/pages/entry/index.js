import React, {Component} from 'react';
import { PropTypes } from 'prop-types';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { getAiApp } from '../../store';
import { loadAIEntry } from '../../actions/ai-async';

import Trace from './trace';
import CustomEvent from './customEvent';
import PageView from './pageView';
import Request from './request';
import Dependency from './dependency';
import Exception from './exception';

class _EntryPage extends Component {

    static contextTypes = {
        router: PropTypes.object.isRequired,
    };

    componentDidMount() {
        this.props.onRefresh(this.props.app.appId, this.props.app.appKey, this.props.type, this.props.entryId);
    }

    render() {
        
        if(this.props.entry.id) {
            if(this.props.type === 'trace' && this.props.entry.trace) {
                return(
                    <Trace entry={this.props.entry} />
                );
            } else if(this.props.type === 'customEvent' && this.props.entry.customEvent) {
                return (
                    <CustomEvent entry={this.props.entry} />
                );
            } else if(this.props.type === 'pageView' && this.props.entry.pageView) {
                return (
                    <PageView entry={this.props.entry} />
                );
            } else if(this.props.type === 'request' && this.props.entry.request) {
                return (
                    <Request entry={this.props.entry} />
                );
            } else if(this.props.type === 'dependency' && this.props.entry.dependency) {
                return (
                    <Dependency entry={this.props.entry} />
                );
            } else if(this.props.type === 'exception' && this.props.entry.exception) {
                return (
                    <Exception entry={this.props.entry} />
                );
            } else {
                return (
                    <div>Loading...</div>
                );
            }
        } else {
            return (
                <div>Loading...</div>
            );
        }
        
    }
}

const mapStateToProps = ({ current }, ownProps) => {
    return {
        app: getAiApp(ownProps.match.params.id),
        entryId: ownProps.match.params.eid,
        type: ownProps.match.params.etype,
        entry: current
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRefresh: (appId, appKey, type, entryId) => dispatch(loadAIEntry(appId, appKey, type, entryId))
    };
};

const EntryPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(_EntryPage));

export default EntryPage;