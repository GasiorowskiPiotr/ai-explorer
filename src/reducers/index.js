import { combineReducers } from 'redux';
import ui from './ui';
import ai from './ai';
import current from './current';

export default combineReducers({
    ui,
    ai,
    current
});