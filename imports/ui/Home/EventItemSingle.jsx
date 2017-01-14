import React from 'react';

export default class EventItemSingle extends React.Component{


  render(){

    event = this.props.eventItem

    //gender = (musolla.gender === "Male") ? (<i className="fa fa-mars" aria-hidden="true"></i>) : (<i className="fa fa-venus" aria-hidden="true"></i>)

    dateFormatted = moment(event.dateStart).format("DD MMM (ddd), h:mm a")
    eventCountdown = moment(event.dateStart).fromNow()

    return(

      <div>
        <hr />
          <a className="white-text mainLink" href={event.url}>
           <p className="truncate">{event.name} <br /><span className="smallFont">{dateFormatted}</span></p>
          </a>
      </div>

    )
  }
}
