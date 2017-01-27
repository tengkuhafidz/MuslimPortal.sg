import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Events} from '../../api/events.js'

import EventItemSingle from '../Home/EventItemSingle.jsx'

export default class EventsWidget extends TrackerReact(React.Component) {

    constructor() {
        super();
        Tracker.autorun(function(){
           Meteor.subscribe("allEvents");
        });

        this.state = {
            showEvents: 0
        }
    }

    showEvents() {

        nowDate = new Date().toISOString()
        events = Events.find({
            dateEnd: {
                $gte: nowDate
            }
        }, {
            sort: {
                dateStart: 1
            }
        }).fetch()
        return events

    }

    handleClick() {
        this.setState({
            showEvents: this.state.showEvents + 1
        })
    }

    render() {

        events = this.props.events

        if (!events)
            return <span>loading</span>

        if (events.length < 1) {
            eventsPanel = (
                <div className="eventsPanel">
                    <h6>
                        No Upcoming Events
                        <i className="material-icons iconAlign">sentiment_dissatisfied</i>
                    </h6>
                </div>
            )
        } else if (events.length === 1) {
            eventsPanel = (
                <div className="eventsPanel scrollView">
                    <h6>
                        1 Upcoming Event
                        <i className="material-icons iconAlign">sentiment_satisfied</i>
                    </h6>
                    {events.map((eventEach) => {
                        return <EventItemSingle key={eventEach.id} eventItem={eventEach}/>
                    })}
                </div>
            )
        } else {
            eventsPanel = (
                <div className="eventsPanel scrollView">
                    <h6 >
                        {events.length}
                        Upcoming Events
                        <i className="material-icons iconAlign">sentiment_very_satisfied</i>
                    </h6>
                    {events.map((eventEach) => {
                        return <EventItemSingle key={eventEach.id} eventItem={eventEach}/>
                    })}
                </div>
            )
        }

        eventsToday = this.props.todayEvents

        eventAlert = ""
        if (eventsToday.length === 1) {
            eventAlert = (
                <div className="eventAlert center flash animated  ">
                    <h6>
                        <i className="material-icons iconAlign">event_available</i>
                        1 EVENT TODAY!</h6>
                </div>
            )
        } else if (eventsToday.length > 1) {
            eventAlert = (
                <div className="eventsPanel center flash animated">
                    <h6>
                        <i className="material-icons iconAlign">error_outline</i>
                        {eventsToday.length}
                        EVENTS TODAY!</h6>
                </div>
            )
        }

        showEvents = this.state.showEvents
        // console.log('showEventsMod', showEvents % 2)

        eventsArea = "";
        if (showEvents === 0)
            eventsArea = eventAlert;
        else if (showEvents % 2 === 1)
            eventsArea = eventsPanel;

        return (
            <div>
                {eventsArea}
                <a onClick={this.handleClick.bind(this)} className="formalFont bottomRight white-text mainLink">
                    <i className="material-icons iconAlign">date_range</i>
                    NUSMS Events ({events.length})
                </a>
            </div>
        )
    }
}
