import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
import thunkMiddleware from 'redux-thunk';


export let store = createStore(
    reducers,
    applyMiddleware(
        thunkMiddleware
));

export function getAiApp(appId) {
    return store.getState().ai.find(a => a.appId === appId);
};
