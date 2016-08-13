import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import {Events} from '../../api/events.js'
import SingleEvent from '../Dashboard/SingleEvent.jsx'

export default class Dashboard extends TrackerReact(Component){

  constructor(){

    super();

    this.state={
      subscription: {
        events: Meteor.subscribe("allEvents")
      },
      filter: "volunteer"
    }
  }
  componentDidMount(){
    document.title = "Mosque Events | Dashboard"
  }

  handleFilter(e) {
      e.preventDefault()

      this.setState({filter: e.target.elements.filterBy.value});
  }
  events() {
    //events = Events.find({$or: [{participants: userEmail},{volunteers: userEmail}]}).fetch()

      var filterState = this.state.filter;

      var userEmail = Meteor.user().emails[0].address;

      //		events = Events.find({mosqueId: Meteor.userId(), hasExpired: { $ne: true }}, {sort: {createdAt: -1}}).fetch();


      if (filterState === "history")
          events = Events.find({$and: [{$or: [{participants: userEmail},{volunteers: userEmail}]}, {hasExpired: true}]}, {sort: {createdAt: -1}}).fetch()
      else if (filterState === "participant")
          events = Events.find({participants: userEmail, hasExpired: { $ne: true }}, {sort: {createdAt: -1}}).fetch()
      else if (filterState === "volunteer")
          events = Events.find({volunteers: userEmail, hasExpired: { $ne: true }}, {sort: {createdAt: -1}}).fetch()

      return events
  }
  getMyEvents(){
    //return an array of events that I participated/volunteered
    //$or: [{email: 'some@mail.com'},{city: 'atlanta'}]
  return  Events.find({$or: [{participants: Meteor.user().emails[0].address},{volunteers: Meteor.user().emails[0].address}]}).fetch()

  }
  getMyEventsVolunteered(){
    return  Events.find({volunteers: Meteor.user().emails[0].address}).fetch()
  }
  render(){
    myEvents = this.events();

    if (!myEvents)
      return (<p>Loading...</p>)

    return(
      <div className="row topGap">
        <form onSubmit={this.handleFilter.bind(this)}>

            <span className="header col s12 m6"><strong>My Events</strong></span>
                <form className=" col s12 m6 topGapSmall" onSubmit={this.handleFilter.bind(this)}>

                    <div className="row">

                      <input name="filterBy" type="radio" id="participant" value="participant" ref="filterBy"/>
                      <label htmlFor="participant">Participating</label>
                      &nbsp;
                      <input name="filterBy" type="radio" id="volunteer" value="volunteer" ref="filterBy" defaultChecked/>
                      <label htmlFor="volunteer">Volunteering</label>
                      &nbsp;
                      <input name="filterBy" type="radio" id="history" value="history" ref="filterBy"/>
                      <label htmlFor="history">History</label>
                      <button type="submit" className="btn-flat blue-text "><strong>Filter</strong></button>

                    </div>

                </form>

        </form>
        {myEvents.map((singleEvent)=>{

          return <SingleEvent singleEvent={singleEvent} key={singleEvent._id}/>

        } )}
      </div>

    )
  }
}
