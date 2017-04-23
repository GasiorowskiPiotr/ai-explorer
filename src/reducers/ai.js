import { ADD_AI_APP, REMOVE_AI_APP } from '../actions/ai';

const defaultState = [];

export default function ai(state = defaultState, action) {
    switch(action.type) {
        case ADD_AI_APP: {
            return [...state, Object.assign({}, action.app, { logs: [], filters: { types:[], date: 'LAST_DAY' } }) ]
        }
        case REMOVE_AI_APP: {
            return state.filter(app => app.appId !== action.app.appId);
        }
        default: {
            return state;
        }
    }
}