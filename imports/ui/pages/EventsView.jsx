import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react'

import {Events} from '../../api/events.js'

import EventAll from '../EventsView/EventAll.jsx'

export default class EventsView extends TrackerReact(React.Component) {

    componentDidMount() {
        document.title = "Muslim Events | Events"
    }
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

        console.log(filterState)

        if (filterState === "talk")
          events = Events.find({eventType: "talk"}).fetch()
        else if (filterState === "social")
          events = Events.find({eventType: "social"}).fetch()
        else if (filterState === "class")
          events = Events.find({eventType: "class"}).fetch()
        else {
          events = Events.find().sort({dateStart: -1})
        }

        //var events = Events.find({hasExpired: { $ne: true }}).fetch()
        console.log('THIS IS EVENT' + events)
        return events
    }

    render() {
        console.log(Meteor.userId())
        events = this.events()

        if (!events)
            return <span>
                loading
            </span>

            //console.log("events: " + events)

        return (
            <div className="bottomGap topGap">

                <div className="row">

                        <span className="header col s12 m6"><strong>Upcoming Events</strong></span>
                            <form className=" col s12 m6 topGapSmall" onSubmit={this.handleFilter.bind(this)}>

                                <div className="row">

                                          <div className="input-field">
                                            <select ref="type" className="browser-default" onChange={this.handleFilter.bind(this)}>

                                              <option value="all">all</option>
                                              <option value="talk">talk</option>
                                              <option value="social">social</option>
                                              <option value="class">class</option>
                                            </select>

                                          </div>


                                </div>

                            </form>
                </div>

                <EventAll events={events}/>
            </div>
        )
    }
}
