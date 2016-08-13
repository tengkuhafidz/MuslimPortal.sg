import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react'

import {Events} from '../../api/events.js'

import MosqueEventsAll from '../MosqueDashboard/MosqueEventsAll.jsx'

export default class MosqueDashboard extends TrackerReact(React.Component){

  componentDidMount(){
    document.title = "Mosque Events | MosqueDashboard"
  }

  constructor(){
		super();

		this.state={
			subscription: {
				events: Meteor.subscribe("allEvents")
			},
		}
	}

	events(){
		events = Events.find({mosqueId: Meteor.userId(), hasExpired: { $ne: true } }).fetch();
		console.log("e " + events )
		return events
	}


  render(){
  	console.log(Meteor.userId())
  	events = this.events()

  	if(!events)
  		return <span> loading </span>

  	console.log("events: " + events)

    return(
    	<div>
      		<h3>Upcoming Events</h3>
      		<MosqueEventsAll events={events}/>
          <div className="fixed-action-btn containedFAB">
            <a className="btn-floating btn-large green darken-2" href="/mosqueEventForm">
              <i className="large material-icons ">add</i>
            </a>
          </div>
      	</div>
    )
  }
}
