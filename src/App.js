import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppComponent from './components/AppComponent.js';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {purple500} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: purple500,
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <AppComponent></AppComponent>
      </MuiThemeProvider>
    );
  }
}

export default App;
