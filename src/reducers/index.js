import { combineReducers } from 'redux';
import EventReducer from './reducer_events';

const rootReducer = combineReducers({
    events: EventReducer
});

export default rootReducer;
