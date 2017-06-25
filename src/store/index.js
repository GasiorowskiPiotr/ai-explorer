import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
import thunkMiddleware from 'redux-thunk';
import { aiMiddleware } from '../infrastructure';


export let store = createStore(
    reducers,
    applyMiddleware(
        aiMiddleware,
        thunkMiddleware
));

export function getAiApp(appId) {
    return store.getState().ai.find(a => a.appId === appId);
};
