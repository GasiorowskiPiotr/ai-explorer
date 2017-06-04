import React, {Component} from 'react';

import TextField from 'material-ui/TextField';

export default class AddGroupForm extends Component {

    render() {
        return (
            <div>
                <TextField
                    hintText="Provide code of AI group"
                    floatingLabelText="Code"
                    onChange={this.props.onCodeChange}
                    errorText={this.props.codeValid ? null : "Required"}
                />
            </div>
        );
    }

}