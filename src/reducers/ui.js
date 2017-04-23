import { GO_TO_ADD_AI, GO_TO_AI, GO_TO_AI_LIST } from '../actions/ui';

const defaultState = {
    title: 'Your AI Apps'
};

export default function ui(state = defaultState, action) {
    switch(action.type) {
        case GO_TO_ADD_AI: {
            return { title: 'Add AI App' };
        }
        case GO_TO_AI: {
            return { title: 'AI Logs' };
        }
        case GO_TO_AI_LIST: {
            return defaultState;
        }
        default: {
            return state;
        }
    }
}