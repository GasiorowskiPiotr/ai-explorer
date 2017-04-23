import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../reducers';

import AppShell from './AppShell';

let store = createStore(reducers);

const AppComponent = () => {
    return (
    <Provider store={store}>
        <AppShell></AppShell>
    </Provider>
);
};

export default AppComponent;
