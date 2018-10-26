import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MyCalendar from 'react-big-calendar';
import CustomToolbar from './toolbar';
import Popup from 'react-popup';
import Input from './input';
import moment from 'moment';
import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../actions';


// Setup the localizer by providing the moment (or globalize) Object to the correct localizer.
const localizer = MyCalendar.momentLocalizer(moment); // or globalizeLocalizer

class Calendar extends Component {

    componentDidMount() {
        this.props.fetchEvents();
    }

    //RENDER SINGLE EVENT POPUP CONTENT
    renderEventContent(slotInfo) {
        const date = moment(slotInfo.start).format('MMMM D, YYYY');
        return (
            <div>
                <p>Date: <strong>{date}</strong></p>
                <p>Location: {slotInfo.location}</p>
            </div>
        );
    }
    
    //ON SELECT EVENT HANDLER FUNCTION
    onSelectEventHandler = (slotInfo) => {
        Popup.create({
            title: slotInfo.title,
            content: this.renderEventContent(slotInfo),
            buttons: {
                right: [{
                    text: 'Edit',
                    className: 'info',
                    action: function () {
                        Popup.close(); //CLOSE PREVIOUS POPUP
                        this.openPopupForm(slotInfo); //OPEN NEW EDIT POPUP
                    }.bind(this)
                }, {
                    text: 'Delete',
                    className: 'danger',
                    action: function () {
                        //CALL EVENT DELETE ACTION
                        this.props.deleteEvent(slotInfo.id);
                        Popup.close();
                    }.bind(this)
                }]
            }
        });
    }

    //HANDLE FUNCITON ON SELECT EVENT SLOT
    onSelectEventSlotHandler = (slotInfo) => {
        this.openPopupForm(slotInfo); //OPEN POPUP FOR CREATE/EDIT EVENT
    }

    //POPUP-FORM FUNCTION FOR CREATE AND EDIT EVENT
    openPopupForm = (slotInfo) => {
        let newEvent = false;
        let popupTitle = "Update Event";
        if(!slotInfo.hasOwnProperty('id')) {
            slotInfo.id = moment().format('x');  //Generate id with Unix Millisecond Timestamp
            slotInfo.title = null;
            slotInfo.location = null;
            popupTitle = "Create Event";
            newEvent = true;
        }

        let titleChange = function (value) {
            slotInfo.title = value;
        };
        let locationChange = function (value) {
            slotInfo.location = value;
        };
        
        Popup.create({
            title: popupTitle,
            content: <div>
                        <Input onChange={titleChange} placeholder="Event Title" defaultValue={slotInfo.title} />
                        <Input onChange={locationChange} placeholder="Event Location" defaultValue={slotInfo.location} />
                    </div>,
            buttons: {
                left: ['cancel'],
                right: [{
                    text: 'Save',
                    className: 'success',
                    action: function () {
                        //CHECK THE ID PROPERTY FOR CREATE/UPDATE
                        if(newEvent) {
                            this.props.createEvent(slotInfo); //EVENT CREATE ACTION
                        } else {
                            this.props.updateEvent(slotInfo); //EVENT UPDATE ACTION
                        }
                        Popup.close();
                    }.bind(this)
                }]
            }
        });
    }

    //EVENT STYLE GETTER FOR SLYLING AN EVENT ITEM
    eventStyleGetter(event, start, end, isSelected) {
        let current_time = moment().format('YYYY MM DD');
        let event_time = moment(event.start).format('YYYY MM DD');
        let background = (current_time>event_time) ? '#DE6987' : '#8CBD4C';
        return {
            style: {
                backgroundColor: background
            }
        };
    }
    
    render() {
        return (
            <div className="calendar-container">
                <MyCalendar
                    popup
                    selectable
                    localizer={localizer}
                    defaultView={MyCalendar.Views.MONTH}
                    components={{toolbar: CustomToolbar}}
                    views={['month']}
                    style={{height: 600}}
                    events={this.props.events}
                    eventPropGetter={(this.eventStyleGetter)}
                    onSelectEvent={(slotInfo) => this.onSelectEventHandler(slotInfo)}
                    onSelectSlot={(slotInfo) => this.onSelectEventSlotHandler(slotInfo)}
                />
                <Popup />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        events: state.events
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ 
        fetchEvents, 
        createEvent, 
        updateEvent, 
        deleteEvent
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
