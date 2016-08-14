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

        if (filterState !== "all")
          events = Events.find({eventType: filterState, dateEnd: {$gte: nowDate}}, {sort: {dateStart: 1}}).fetch()
        else
          events = Events.find({dateEnd: {$gte: nowDate}}, {sort: {dateStart: 1}}).fetch()

        return events
    }

    render() {
        //console.log(Meteor.userId())
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

        return (
            <div className="bottomGap topGap">
                
                <div className="title">
                  <h1 className="col s12 center">NUSMS Events </h1>
                  {addBtn}
                </div>

                  <div className="input-field center bottomGap">
                    <select ref="type" className="browser-default" onChange={this.handleFilter.bind(this)}>
                      <option value="all">All Events</option>
                      <option value="talk" >Talks</option>
                      <option value="social">Social Events</option>
                      <option value="community">Community Works</option>
                      <option value="others">Others</option>
                    </select>

                  </div>

                <EventAll events={events}/>

              

            </div>
        )
    }
}
