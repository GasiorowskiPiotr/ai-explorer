import { CURRENT_LOADED } from '../actions/current';

export default function current(state = {}, action) {
    switch(action.type) {
        case CURRENT_LOADED: {
            return action.entry;
        }
        default: {
            return state;
        }
    }
};