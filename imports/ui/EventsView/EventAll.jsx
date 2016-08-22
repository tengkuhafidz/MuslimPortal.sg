import React from 'react';
import EventSingle from './EventSingle.jsx';

export default class EventAll extends React.Component{
  //filter
  filter(type){

  }
  componentDidMount(){
    document.title = "Muslim Events | View All Events"
  }

  render(){
  	events = this.props.events

    if(!events)
      return <span> loading </span>

    return(
    	<div className="row">
          {events.map((event)=>{
            return <EventSingle key={event._id} event={event}/>
          } )}

      </div>
    )
  }
}
