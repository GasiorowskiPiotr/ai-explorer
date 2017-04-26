import { GO_TO_ADD_AI, GO_TO_AI, GO_TO_AI_LIST, LOADING_AIS, LOADING_AIS_FINISHED } from '../actions/ui';

const defaultState = {
    title: 'Your AI Apps',
    isLoading: false
};

export default function ui(state = defaultState, action) {
    switch(action.type) {
        case GO_TO_ADD_AI: {
            return Object.assign({}, state, { title: 'Add AI App' }) ;
        }
        case GO_TO_AI: {
            return Object.assign({}, state, { title: 'AI Logs' });
        }
        case GO_TO_AI_LIST: {
            return defaultState;
        }
        case LOADING_AIS: {
            return Object.assign({}, state, { isLoading: true });
        }
        case LOADING_AIS_FINISHED: {
            return Object.assign({}, state, { isLoading: false });
        }
        default: {
            return state;
        }
    }
}