import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchEvents, pastEvents, upcomingEvents } from '../actions';

const navigate = {
    PREVIOUS: 'PREV',
    NEXT: 'NEXT',
    TODAY: 'TODAY',
    DATE: 'DATE',
}

class CustomToolbar extends Component {

    onClickAllEvents() {
        this.props.fetchEvents();
    };

    onClickPastEvents() {
        this.props.pastEvents();
    };
    
    onClickUpcomingEvents() {
        this.props.upcomingEvents();
    };

    render() {
        let { localizer: { messages }, label } = this.props;
        return(
            <div className="rbc-toolbar">
                <span className="rbc-btn-group">
                    <button type="button" className="btn btn-control" onClick={this.navigate.bind(null, navigate.PREVIOUS)}><i className="fa fa-arrow-left"></i> Prev</button>
                </span>
                <span className="rbc-btn-group">
                    <button type="button" className="btn btn-control" onClick={this.navigate.bind(null, navigate.NEXT)}>Next <i className="fa fa-arrow-right"></i></button>
                </span>
                <span className="rbc-toolbar-label">{label}</span>
                <span className="rbc-btn-group">
                    <button type="button" className="btn btn-control" onClick={(e) => this.onClickAllEvents()}>All</button>
                </span>
                <span className="rbc-btn-group">
                    <button type="button" className="btn btn-past" onClick={(e) => this.onClickPastEvents()}>Past</button>
                </span>
                <span className="rbc-btn-group">
                    <button type="button" className="btn btn-upcoming" onClick={(e) => this.onClickUpcomingEvents()}>Upcoming</button>
                </span>
            </div>
        )
    }
    navigate = action => {
        this.props.onNavigate(action)
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
        pastEvents, 
        upcomingEvents 
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomToolbar);