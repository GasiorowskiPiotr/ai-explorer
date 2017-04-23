import { combineReducers } from 'redux';
import ui from './ui';
import ai from './ai';

export default combineReducers({
    ui,
    ai
});