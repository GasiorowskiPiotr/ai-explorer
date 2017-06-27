import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Snackbar from 'material-ui/Snackbar';

import MenuItems from './MenuItems';

import AddAIPage from '../pages/add-ai-app';
import ListAIAppPage from '../pages/list-ai-apps';
import ListLogsPage from '../pages/list-logs';
import EntryPage from '../pages/entry';
import AddAIGroupPage from '../pages/add-ai-group';

import { goToAddAi, goToAiList, messageHidden } from '../actions/ui';

const loaderStyle = {
    position: 'fixed'
};

class _AppShell extends Component {


    constructor(props) {
        super(props);

        this.toggleNavMenu = this.toggleNavMenu.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
        this.isThereMessage = this.isThereMessage.bind(this);

        this.state = {open: false};
    }

    toggleNavMenu() {
        this.setState({
            open: !this.state.open
        });
    };

    handleRedirect(where) {
        this.setState({
            open: false
        });

        this.props.onRedirect(where);
    };

    getTop() {
        return window.document.documentElement.clientHeight / 2 - 35;
    }

    getLeft() {
        return window.document.documentElement.clientWidth / 2 - 35;
    }

    isThereMessage() {
        if(this.props.message) {
            return true;
        } else {
            return false;
        }
    }

    clearMessage() {
        this.props.onMessageClosed();
    }

    render() {
        return (
            <div>
                <Router>
                    <div>
                        <AppBar 
                            title="AI Explorer"
                            onLeftIconButtonTouchTap={this.toggleNavMenu}>
                        </AppBar>
                        <RefreshIndicator size={70} left={this.getLeft()} top={this.getTop()} status={this.props.loaderState} style={loaderStyle}/>
                        <Snackbar open={this.isThereMessage()} message={this.props.message || ''} autoHideDuration={4000} onRequestClose={this.clearMessage()} />
                        <Drawer
                            docked={false}
                            open={this.state.open}
                            onRequestChange={(open) => console.log(open)}>

                            <MenuItems
                                onSelected={this.handleRedirect}>
                            </MenuItems>
                        </Drawer>
                        <Route exact path="/" component={ListAIAppPage}/>
                        <Route path="/add" component={AddAIPage}/>
                        <Route path="/logs/:id" component={ListLogsPage}/>
                        <Route path="/log/:id/entry/:etype/:eid" component={EntryPage} />
                        <Route path="/add-batch" component={AddAIGroupPage} />
                    </div>
                </Router>
            </div>
        );
    }
}

const mapStateToProps = ({ui}) => {
    return {
        loaderState: ui.state,
        message: ui.message
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRedirect: (where) => {
            if(where === '/') {
                dispatch(goToAiList());
            } else if(where === '/add') {
                dispatch(goToAddAi());
            }
        },
        onMessageClosed: () => {
            setTimeout(() => {
                dispatch(messageHidden());
            }, 4000);
        }
    }
};

const AppShell = connect(mapStateToProps, mapDispatchToProps)(_AppShell);

export default AppShell;