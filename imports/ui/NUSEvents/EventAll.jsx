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
  	events = this.props.event

    if(!events)
      return <span> loading </span>

    return(
    	<div className="row">
          {events.map((event)=>{
            return <EventSingle key={event.id} event={event}/>
          } )}

      </div>
    )
  }
}
