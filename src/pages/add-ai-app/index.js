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
            nameValid: true,
            id: '',
            idValid: true,
            key: '',
            keyValid: true
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
            name: name,
            nameValid: !!name
        });
    }

    onIDChange(_, id) {
        this.setState({
            id: id,
            idValid: !!id
        });
    }

    onKeyChange(_, key) {
        this.setState({
            key: key,
            keyValid: !!key
        });
    }

    submit(e) {
        e && e.preventDefault();

        let nameValid = true;
        if(!this.state.name) {
            nameValid = false;
        }

        let idValid = true;
        if(!this.state.id) {
            idValid = false;
        }

        let keyValid = true;
        if(!this.state.key) {
            keyValid = false;
        }

        if(nameValid && idValid && keyValid) {
            this.props.onNewApp(this.state.name, this.state.id, this.state.key);
            this.context.router.history.push('/');
            this.saveToLocalStorage(this.state.name, this.state.id, this.state.key);
        } else {
            this.setState({
                nameValid,
                idValid,
                keyValid
            });
        }
    }

    saveToLocalStorage(name, id, key) {
        var apps = JSON.parse(localStorage.getItem('__apps__'));
        apps = apps || [];
        apps.push({ 
            appName: name,
            appKey: key,
            appId: id,
            logs: [],
            filters: { types:['$all'], date: 'PT24H' },
            top: 100,
            skip: 0
        });

        localStorage.setItem('__apps__', JSON.stringify(apps));
    }

    cancel(e) {
        e && e.preventDefault();
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
                            nameValid={this.state.nameValid}
                            idValid={this.state.idValid}
                            keyValid={this.state.keyValid}
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