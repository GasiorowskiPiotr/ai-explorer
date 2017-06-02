import React, {Component} from 'react';

import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';

const checkBoxStyle = {
    paddingTop: '10px',
    paddingBottom: '10px'
}

export default class FilterEditor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            date: props.date,
            traces: !!props.types.find(a => a === 'traces') || !!props.types.find(a => a === '$all'),
            customEvents: !!props.types.find(a => a === 'customEvents') || !!props.types.find(a => a === '$all'),
            pageViews: !!props.types.find(a => a === 'pageViews') || !!props.types.find(a => a === '$all'),
            browserTimings: !!props.types.find(a => a === 'browserTimings') || !!props.types.find(a => a === '$all'),
            requests: !!props.types.find(a => a === 'requests') || !!props.types.find(a => a === '$all'),
            dependencies: !!props.types.find(a => a === 'dependencies') || !!props.types.find(a => a === '$all'),
            exceptions: !!props.types.find(a => a === 'exceptions') || !!props.types.find(a => a === '$all'),
            availabilityResults: !!props.types.find(a => a === 'availabilityResults') || !!props.types.find(a => a === '$all')
        };

        this.onDateChange = this.onDateChange.bind(this);
        this.onTypesChange = this.onTypesChange.bind(this);
        this.filter = this.filter.bind(this);
    }

    onDateChange(event, index, value) {
        this.setState({
            date: value,
        });
    }

    onTypesChange(typeName) {
        return ((event, isInputChecked) => {

            let state = { };
            state[typeName] = isInputChecked;
            this.setState(state);
             // eslint-disable-next-line
        }).bind(this);
    }

    filter(e) {

        e && e.preventDefault();

        let types = [];
        if(this.state.traces && 
            this.state.customEvents && 
            this.state.pageViews && 
            this.state.browserTimings && 
            this.state.requests && 
            this.state.dependencies && 
            this.state.exceptions && 
            this.state.availabilityResults) {
                types.push('$all');
        } else {
            if(this.state.traces) {
                types.push('traces');
            }
            if(this.state.customEvents) {
                types.push('customEvents');
            }
            if(this.state.pageViews) {
                types.push('pageViews');
            }
            if(this.state.browserTimings) {
                types.push('browserTimings');
            }
            if(this.state.requests) {
                types.push('requests');
            }
            if(this.state.dependencies) {
                types.push('dependencies');
            }
            if(this.state.exceptions) {
                types.push('exceptions');
            }
            if(this.state.availabilityResults) {
                types.push('availabilityResults');
            }
        }

        this.props.filter(this.state.date, types);
    }

    render() {

        const actions = [
            <FlatButton label="Filter" onTouchTap={this.filter} />,
            <FlatButton label="Cancel" onTouchTap={this.props.close} />
        ];

        return (
            <Dialog title="Filters" modal={true} open={this.props.open} actions={actions} autoScrollBodyContent={true}>
                    <SelectField floatingLabelText="Time span" value={this.state.date} onChange={this.onDateChange}>
                        <MenuItem value="PT1H" primaryText="Last hour" />
                        <MenuItem value="PT4H" primaryText="Last 4 hours" />
                        <MenuItem value="PT8H" primaryText="Last 8 hours" />
                        <MenuItem value="PT24H" primaryText="Last 24 hours" />
                    </SelectField>
                    <Checkbox style={checkBoxStyle} label="Traces" checked={this.state.traces} onCheck={this.onTypesChange('traces')} />
                    <Checkbox style={checkBoxStyle} label="Custom Events" checked={this.state.customEvents} onCheck={this.onTypesChange('customEvents')} />
                    <Checkbox style={checkBoxStyle} label="Page Views" checked={this.state.pageViews} onCheck={this.onTypesChange('pageViews')} />
                    <Checkbox style={checkBoxStyle} label="Browser Timings" checked={this.state.browserTimings} onCheck={this.onTypesChange('browserTimings')} />
                    <Checkbox style={checkBoxStyle} label="Requests" checked={this.state.requests} onCheck={this.onTypesChange('requests')} />
                    <Checkbox style={checkBoxStyle} label="Dependencies" checked={this.state.dependencies} onCheck={this.onTypesChange('dependencies')} />
                    <Checkbox style={checkBoxStyle} label="Exceptions" checked={this.state.exceptions} onCheck={this.onTypesChange('exceptions')} />
                    <Checkbox style={checkBoxStyle} label="Availability Results" checked={this.state.availabilityResults} onCheck={this.onTypesChange('availabilityResults')} />
            </Dialog>
        );
    }

}