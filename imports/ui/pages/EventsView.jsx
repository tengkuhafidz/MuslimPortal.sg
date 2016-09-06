import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react'

import {Events} from '../../api/events.js'

import EventAll from '../EventsView/EventAll.jsx'

export default class EventsView extends TrackerReact(React.Component) {
    constructor() {
        super();

        this.state = {
            subscription: {
                events: Meteor.subscribe("allEvents")
            },
            filter: "all"
        }
    }

    handleFilter(e) {
        e.preventDefault()

        this.setState({filter: this.refs.type.value});
    }

    getOneUpcomingEvent(){
      upcomingEvent = Events.findOne({dateEnd: {$gte: nowDate}}, {sort: {dateStart: 1}});

      return upcomingEvent;

    }

    events() {
        var filterState = this.state.filter

        // var d = new Date();
        // var d2 = new Date();
        //
        // d2.setHours(d.getHours() + 8);
        //
        // var nowDate = d2.toISOString();

        nowDate = new Date().toISOString();

        standardTypes = ["all", "talk", "community", "social"];

        if (filterState === "others"){
          events = Events.find({eventType: {$nin: standardTypes}, dateEnd: {$gte: nowDate}}, {sort: {dateStart: 1}}).fetch()
        }
        else if (filterState !== "all") {
          events = Events.find({eventType: filterState, dateEnd: {$gte: nowDate}}, {sort: {dateStart: 1}}).fetch()
        }
        else
          events = Events.find({dateEnd: {$gte: nowDate}}, {sort: {dateStart: 1}}).fetch()

        return events
    }

    render() {
        events = this.events()

        if (!events)
            return <span>
                loading
            </span>

            addBtn = "";
        if (Meteor.userId()) {
          addBtn = (
            <div>
              <div className="addDataBtnLarge hide-on-med-and-down">
                <a className="btn blue lighten-1" href="/mosqueEventForm">
                  Add Event
                </a>
              </div>
              <div className="fixed-action-btn hide-on-large-only addDataBtnSmall">
                <a className="btn-floating btn-large blue lighten-1" href="/mosqueEventForm">
                  <i className="large material-icons">add</i>
                </a>
              </div>
            </div>
          )
        }

        console.log(Meteor.userId())

        upcomingEvent = this.getOneUpcomingEvent();
        console.log("up", upcomingEvent)
        //
        if (!upcomingEvent)
            return <span></span>
        //

        dateTimeStart = upcomingEvent.dateStart

        dateStart = moment(dateTimeStart).format("DD MMM, h:mm a")
       console.log("up", upcomingEvent)

        return (
            <div className="topRight fullWidth">

              <a href={`/eventDetails/${upcomingEvent._id}`} className="white-text mainLink"><i className="material-icons iconAlign">notifications_active</i> {upcomingEvent.name} @ {dateStart}hrs </a>

            </div>
        )
    }
}
