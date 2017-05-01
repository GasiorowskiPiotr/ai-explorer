import { ADD_AI_APP, REMOVE_AI_APP, AI_LOGS_LOADED } from '../actions/ai';

const defaultState = JSON.parse(localStorage.getItem('__apps__'));

export default function ai(state = defaultState || [], action) {
    switch(action.type) {
        case ADD_AI_APP: {
            return [...state, Object.assign({}, action.app, { logs: [], filters: { types:['$all'], date: 'PT24H' } }) ]
        }
        case REMOVE_AI_APP: {
            return state.filter(app => app.appId !== action.app.appId);
        }
        case AI_LOGS_LOADED: {
            var app = state.find(app => app.appId === action.app.appId);
            app = Object.assign({}, app, { logs: action.logs });
            return [...state.filter(app => app.appId !== action.app.appId), app];
        }
        default: {
            return state;
        }
    }
}