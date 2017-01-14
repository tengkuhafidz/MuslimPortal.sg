import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Events} from '../../api/events.js'
import EventItemSingle from './EventItemSingle.jsx'

export default class EventsWidget extends TrackerReact(React.Component) {
  
  constructor() {
    super();

    this.state = {
        showEvents: false,
        subscription: {
            events: Meteor.subscribe("allEvents")
        }

    }
  }

  showEvents() {

    nowDate = new Date().toISOString()
    console.log("nowDate", nowDate)
    events = Events.find({dateEnd: {$gte: nowDate}}, {sort: {dateStart: 1}}).fetch()
    console.log("filteredEvents", events)
    return events

  }

  handleClick(){
    this.setState({showEvents: !this.state.showEvents})
  }

  render(){

    events = this.showEvents()

    if (!events)
        return <span>loading</span>

      console.log(events)
     
    

    if(events.length < 1 ) {
      eventsPanel = (
        <div className="eventsPanel">
           <h6> No Upcoming Events <i className="material-icons iconAlign">sentiment_dissatisfied</i></h6>
        </div>
      )
    } else if (events.length === 1 ) {
      eventsPanel = (
        <div className="eventsPanel ">
           <h6> 1 Upcoming Event <i className="material-icons iconAlign">sentiment_satisfied</i></h6>
           {events.map((eventsEach)=>{
            return <EventItemSingle key={eventsEach._id} eventItem={eventsEach} />
            })}
        </div>
        )
    } else {
      eventsPanel = (
        <div className="eventsPanel">
           <h6 > {events.length} Upcoming Events <i className="material-icons iconAlign">sentiment_very_satisfied</i></h6>
           {events.map((eventsEach)=>{
            return <EventItemSingle key={eventsEach._id} eventItem={eventsEach} />
          })}
        </div>
      )
    }



      // <div className="eventsPanel">
      //   <h6> No Upcoming Events <i className="material-icons iconAlign">sentiment_dissatisfied</i></h6>
      // </div>
      // <div className="eventsPanel">
      //   <h6> 2 Upcoming Events <i className="material-icons iconAlign">sentiment_satisfied</i></h6>
      //   <div className="eventPanelItems">
      //     <hr />
      //     <p><a className="white-text mainLink">PBUH: ruNNur <br /><span className="smallFont">Monday, 11 Jan, 6pm</span></a></p>
      //     <hr />
      //     <p><a className="white-text mainLink truncate">PBUH: Grand Mawlid <br /><span className="smallFont">Friday, 13 Jan, 8pm</span></a></p>
      //   </div>
      // </div>

    showEvents = this.state.showEvents
    eventsArea = showEvents ? eventsPanel : ""
    eventLinkClasses = events.length > 0 ? "formalFont bottomRight white-text mainLink bounce animated eventLink" : "formalFont bottomRight white-text mainLink"

    return(
      <div>
        {eventsArea}
        <a onClick={this.handleClick.bind(this)} className={eventLinkClasses}><i className="material-icons iconAlign">date_range</i> NUSMS Events ({events.length}) </a>
      </div>
    )
  }
}
