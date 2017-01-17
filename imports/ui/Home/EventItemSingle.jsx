import React from 'react';

export default class EventItemSingle extends React.Component{


  render(){

    event = this.props.eventItem

    eventURL = "https://www.facebook.com/events/" + event.id

    dateStart = new Date(event.start_time)

    //gender = (musolla.gender === "Male") ? (<i className="fa fa-mars" aria-hidden="true"></i>) : (<i className="fa fa-venus" aria-hidden="true"></i>)

    dateFormatted = moment(dateStart).format("DD MMM (ddd), h:mm a")
    eventCountdown = moment(dateStart).fromNow()

    return(

      <div>
        <hr />
          <a className="white-text mainLink" href={eventURL} target="_blank">
           <p className="truncate">{event.name} <br /><span className="smallFont">{dateFormatted}</span></p>
          </a>
      </div>

    )
  }
}
