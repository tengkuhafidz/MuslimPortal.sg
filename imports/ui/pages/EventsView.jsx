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

    events() {
        var filterState = this.state.filter

        // var d = new Date();
        // var d2 = new Date();
        //
        // d2.setHours(d.getHours() + 8);
        //
        // var nowDate = d2.toISOString();

        nowDate = new Date().toISOString();

        //console.log("now Date" + nowDate);

        if (filterState === "talk")
          events = Events.find({eventType: "talk", dateEnd: {$gte: nowDate}}, {sort: {dateStart: 1}}).fetch()
        else if (filterState === "social")
          events = Events.find({eventType: "social", dateEnd: {$gte: nowDate}}, {sort: {dateStart: 1}}).fetch()
        else if (filterState === "class")
          events = Events.find({eventType: "class", dateEnd: {$gte: nowDate}}, {sort: {dateStart: 1}}).fetch()
        else {

          events = Events.find({dateEnd: {$gte: nowDate}}, {sort: {dateStart: 1}}).fetch()
        }

        return events
    }

    render() {
        //console.log(Meteor.userId())
        events = this.events()

        if (!events)
            return <span>
                loading
            </span>

        return (
            <div className="bottomGap topGap">

                <h1 className="col s12 center">NUSMS Events</h1>
                <EventAll events={events}/>

            </div>
        )
    }
}
