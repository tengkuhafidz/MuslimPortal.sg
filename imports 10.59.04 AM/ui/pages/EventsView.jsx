import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react'

import {Events} from '../../api/events.js'

import EventAll from '../EventsView/EventAll.jsx'

export default class EventsView extends TrackerReact(React.Component) {

    componentDidMount() {
        document.title = "Mosque Events | Events"
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

        this.setState({filter: e.target.elements.filterBy.value});
    }

    events() {
        var filterState = this.state.filter;
        // opGender = (Meteor.user().profile.gender === 'm') ? 'f':'m'
        console.log(filterState)
        // if (filterState === "all")
        //     events = Events.find({hasExpired: { $ne: true }, gender: {$ne: opGender}}).fetch()
        // else if (filterState === "participant")
        //     events = Events.find({
        //         needParticipants: true,
        //         needVolunteers: {
        //             $ne: true
        //         },
        //         hasExpired: { $ne: true },
        //         gender: {$ne: opGender}
        //     }).fetch()
        // else
        //     events = Events.find({
        //         needVolunteers: true,
        //         needParticipants: {
        //             $ne: true
        //         },
        //         hasExpired: { $ne: true },
        //         gender: {$ne: opGender}
        //     }).fetch()

        var events = Events.find({hasExpired: { $ne: true }}).fetch()


            //console.log("e " + events )
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

                                        <input name="filterBy" type="radio" id="participant" value="participant" ref="filterBy"/>
                                        <label htmlFor="participant">Participant</label>
                                        &nbsp;
                                        <input name="filterBy" type="radio" id="volunteer" value="volunteer" ref="filterBy"/>
                                        <label htmlFor="volunteer">Volunteer</label>
                                        &nbsp;
                                        <input name="filterBy" type="radio" id="all" value="all" ref="filterBy" defaultChecked/>
                                        <label htmlFor="all">All</label>
                                        <button type="submit" className="btn-flat blue-text text-darken-2"><strong>Filter</strong></button>
                                

                                </div>

                            </form>
                </div>

                <EventAll events={events}/>
            </div>
        )
    }
}
