import React from 'react';
import MosqueEventSingle from './MosqueEventSingle.jsx'

export default class MosqueEventsAll extends React.Component{

  componentDidMount(){
    document.title = "Mosque Events | MosqueDashboard"
  }


  render(){
  	events = this.props.events
    if(!events)
      return <span> loading </span>

    return(
    	<div className="row">
        {events.map((event)=>{
          return <MosqueEventSingle key={event._id} event={event} /> 
        })}
      </div>
    )
  }
}
