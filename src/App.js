import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppComponent from './components/AppComponent.js';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <AppComponent></AppComponent>
      </MuiThemeProvider>
    );
  }
}

export default App;
