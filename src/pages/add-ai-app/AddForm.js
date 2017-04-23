import React, {Component} from 'react';

import TextField from 'material-ui/TextField';

export default class AddForm extends Component {

    render() {
        return (
            <div>
                <TextField
                    hintText="Provide a name of AI App"
                    floatingLabelText="Application Name"
                    onChange={this.props.onNameChange}
                />
                <TextField
                    hintText="AI App ID - check portal.azure.com"
                    floatingLabelText="App ID"
                    onChange={this.props.onIDChange}
                />
                <TextField
                    hintText="AI App Key - check portal.azure.com"
                    floatingLabelText="App Key"
                    onChange={this.props.onKeyChange}
                />
            </div>
        );
    }

}