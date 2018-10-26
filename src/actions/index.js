import _ from 'lodash';
import moment from 'moment';
import { eventData } from '../demoData'

//EXPORT ALL ACTION TYPES
export const FETCH_EVENTS = 'fetch_events';
export const CREATE_EVENT = 'create_event';
export const UPDATE_EVENT = 'update_event';
export const DELETE_EVENT = 'delete_event';
export const PAST_EVENTS = 'past_events';
export const UPCOMING_EVENTS = 'upcoming_events';

//FETCH EVENTS FROM LOCAL STORAGE
export function fetchEvents() {
    if(!localStorage.getItem('events')) {
        localStorage.setItem('events', JSON.stringify(eventData)); // If storage is empty set demo data
    }
    let events = JSON.parse(localStorage.getItem('events')); //Get data from Storage
    return {
        type: FETCH_EVENTS,
        payload: events
    }
}

//CREATE NEW EVENT ACTION
export function createEvent(values) {
    let events = JSON.parse(localStorage.getItem('events'));
    events.push(values); //Push New Item
    localStorage.setItem('events', JSON.stringify(events)); //Update Storage
    return {
        type: CREATE_EVENT,
        payload: events
    }
}

//UPDATE EVENT ACTION
export function updateEvent(values) {
    let events = JSON.parse(localStorage.getItem('events')); //Get data from Storage
    let index = _.findIndex(events, { 'id': values.id});
    events[index] = values; //Update Item
    localStorage.setItem('events', JSON.stringify(events)); //Update Storage
    return {
        type: UPDATE_EVENT,
        payload: events
    }
}

//DELETE EVENT ACTION
export function deleteEvent(id) {
    let events = JSON.parse(localStorage.getItem('events')); //Get data from Storage
    let index = _.findIndex(events, { 'id': id});
    events.splice(index, 1); //Remove Item
    localStorage.setItem('events', JSON.stringify(events)); //Update Storage
    return {
        type: DELETE_EVENT,
        payload: events
    }
}

//GET ALL PAST EVENTS ACTION
export function pastEvents() {
    let events = JSON.parse(localStorage.getItem('events')); //Get data from Storage
    events = _.filter(events, (item) => (moment().format('YYYY MM DD') > moment(item.start).format('YYYY MM DD')) ? true : false);
    return {
        type: PAST_EVENTS,
        payload: events
    }
}

//GET ALL UPCOMING EVENTS ACTION
export function upcomingEvents() {
    let events = JSON.parse(localStorage.getItem('events')); //Get data from Storage
    events = _.filter(events, (item) => (moment().format('YYYY MM DD') < moment(item.start).format('YYYY MM DD')) ? true : false);
    return {
        type: UPCOMING_EVENTS,
        payload: events
    }
}