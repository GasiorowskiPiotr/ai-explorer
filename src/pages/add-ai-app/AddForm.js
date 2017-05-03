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
                    errorText={this.props.nameValid ? null : "Required"}
                />
                <TextField
                    hintText="AI App ID - check portal.azure.com"
                    floatingLabelText="App ID"
                    onChange={this.props.onIDChange}
                    errorText={this.props.idValid ? null : "Required"}
                />
                <TextField
                    hintText="AI App Key - check portal.azure.com"
                    floatingLabelText="App Key"
                    onChange={this.props.onKeyChange}
                    errorText={this.props.keyValid ? null : "Required"}
                />
            </div>
        );
    }

}