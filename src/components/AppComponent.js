import React from 'react';
import { Provider } from 'react-redux';

import AppShell from './AppShell';

import {store} from '../store';

const AppComponent = () => {
    return (
        <Provider store={store}>
            <AppShell></AppShell>
        </Provider>
    );
};

export default AppComponent;
