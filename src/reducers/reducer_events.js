
import { FETCH_EVENTS, CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, PAST_EVENTS, UPCOMING_EVENTS } from "../actions";

export default function(state = [], action) {
    switch(action.type) {
        case FETCH_EVENTS:
            return action.payload;

        case CREATE_EVENT:
            return action.payload;

        case UPDATE_EVENT:
            return action.payload;

        case DELETE_EVENT:
            return action.payload;

        case PAST_EVENTS:
            return action.payload;

        case UPCOMING_EVENTS:
            return action.payload;
            
        default: 
            return state;
    }
}