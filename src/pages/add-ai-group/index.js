import React, {Component} from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import AddGroupForm from './AddGroupForm';

import { addAIGroup } from '../../actions/ai-async';

import { withRouter } from 'react-router';



class _AddAIAppGroupPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            code: '',
            codeValid: true
        };

        this.onCodeChange = this.onCodeChange.bind(this);
        this.submit = this.submit.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    static contextTypes = {
        router: PropTypes.object.isRequired,
    };

    onCodeChange(_, code) {
        this.setState({
            code: code,
            codeValid: !!code
        });
    }

    submit(e) {
        e && e.preventDefault();

        let codeValid = true;
        if(!this.state.code) {
            codeValid = false;
        }

        this.props.onNewAppGroup(this.state.code);
        this.context.router.history.push('/');
    }

    cancel(e) {
        e && e.preventDefault();
        this.setState({
            code: ''
        });

        this.context.router.history.push('/');
    }

    render() {
        return (
            <div>
                <Card>
                    <CardTitle title="New AI App Group" subtitle="Provide the AI App Group code provided by your Azure administrator" />
                    <CardText>
                        <AddGroupForm
                            codeValid={this.state.codeValid}
                            onCodeChange={this.onCodeChange}>
                        </AddGroupForm>
                    </CardText>
                    <CardActions>
                        <FlatButton primary={true} label="Add" onTouchTap={this.submit} />
                        <FlatButton secondary={true} label="Cancel" onTouchTap={this.cancel} />
                    </CardActions>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = () => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onNewAppGroup: (code) => {
            dispatch(addAIGroup(code));
        }
    }
};

const AddAIAppGroupPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(_AddAIAppGroupPage));

export default AddAIAppGroupPage;