import React, {Component} from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import AddForm from './AddForm';

import { addAIApp } from '../../actions/ai';

import { withRouter } from 'react-router';



class _AddAIAppPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            id: '',
            key: ''
        };

        this.onNameChange = this.onNameChange.bind(this);
        this.onIDChange = this.onIDChange.bind(this);
        this.onKeyChange = this.onKeyChange.bind(this);
        this.submit = this.submit.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    static contextTypes = {
        router: PropTypes.object.isRequired,
    };

    onNameChange(_, name) {
        this.setState({
            name: name
        });
    }

    onIDChange(_, id) {
        this.setState({
            id: id
        })
    }

    onKeyChange(_, key) {
        this.setState({
            key: key
        });
    }

    submit(e) {
        e.preventDefault();
        this.props.onNewApp(this.state.name, this.state.id, this.state.key);
        this.context.router.history.push('/');
    }

    cancel(e) {
        e.preventDefault();
        this.setState({
            name: '',
            id: '',
            key: ''
        });

        this.context.router.history.push('/');
    }

    render() {
        return (
            <div>
                <Card>
                    <CardTitle title="New AI App" subtitle="Start adding new AI App" />
                    <CardText>
                        <AddForm
                            onNameChange={this.onNameChange}
                            onIDChange={this.onIDChange}
                            onKeyChange={this.onKeyChange}
                        ></AddForm>
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
        onNewApp: (name, id, key) => {
            dispatch(addAIApp(id, key, name));
        }
    }
};

const AddAIAppPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(_AddAIAppPage));

export default AddAIAppPage;