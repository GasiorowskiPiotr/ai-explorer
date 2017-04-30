import React, {Component} from 'react';
import { PropTypes } from 'prop-types';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { getAiApp } from '../../store';
import { loadAIEntry } from '../../actions/ai-async';

class _EntryPage extends Component {

    static contextTypes = {
        router: PropTypes.object.isRequired,
    };

    componentDidMount() {
        this.props.onRefresh(this.props.app.appId, this.props.app.appKey, this.props.type, this.props.entryId);
    }

    render() {
        var aaa = JSON.stringify(this.props.entry);
        return (<div>
            {aaa}
        </div>);
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