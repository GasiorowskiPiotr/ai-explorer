import { ADD_AI_APP, REMOVE_AI_APP, AI_LOGS_LOADED, AI_STATS_LOADED, ADD_AI_GROUP } from '../actions/ai';

export default function ai(state = [], action) {
    switch(action.type) {
        case ADD_AI_APP: {
            return [...state, Object.assign({}, action.app, { top: 100, skip: 0, logs: [], filters: { types:['$all'], date: 'PT24H' } }) ]
        }
        case REMOVE_AI_APP: {
            return state.filter(app => app.appId !== action.app.appId);
        }
        case AI_LOGS_LOADED: {
            let app = state.find(app => app.appId === action.app.appId);
            if(!action.reload) {
                app = Object.assign({}, app, { top: action.top, skip: action.skip, filters: { types: [...action.types], date: action.timeSpan }, logs: [...app.logs, ...action.logs]});
            } else {
                app = Object.assign({}, app, { top: action.top, skip: action.skip, filters: { types: [...action.types], date: action.timeSpan }, logs: action.logs});
            }
            
            return [...state.filter(app => app.appId !== action.app.appId), app];
        }
        case AI_STATS_LOADED: {
            let app = state.find(app => app.appId === action.appId);
            app = Object.assign({}, app, { exceptions: action.exceptions });

            return [...state.filter(app => app.appId !== action.appId), app];
        }
        case ADD_AI_GROUP: {

            let apps = action.apps;

            return [...state, ...apps.map(app => Object.assign({}, app, { top: 100, skip: 0, logs: [], filters: { types:['$all'], date: 'PT24H' } }))];

        }
        default: {
            return state;
        }
    }
}