import React from 'react';
import SpeakerSingle from './SpeakerSingle.jsx';

export default class EventSingle extends React.Component{

  componentDidMount(){
    document.title = "Mosque Events | Events"
  }

  render(){

  	event = this.props.event

    dateEnd = new Date(event.dateEnd)
    dateStart = new Date(event.dateStart)

  //date start, time start
  var startTime = moment(dateStart).format("HH:mm");
  var startDate = moment(dateStart).format("Do MMMM");

  //date end, time end
  var endTime = moment(dateEnd).format("HH:mm");
  var endDate = moment(dateEnd).format("Do MMMM");

  console.log("es", event.speaker[0])

    return(
      <div>
          <div className="col s12 m6 ">
            <div className="card hoverable">
              <div className="card-content black-text ">
                <span className="card-title truncate">
                  <strong>{event.name}</strong>
                  <span className="eventType right formalFont">
                    {event.eventType}

                  </span>
                </span>

                <p className="formalFont grey-text"> <i className="material-icons iconAlign">business</i> {event.venue}</p>
                <p className="formalFont grey-text"> <i className="material-icons iconAlign">schedule</i> {startDate}, {startTime} hrs -  {endDate}, {endTime} hrs</p>

              </div>
              <div className="card-action">
                <a href={`/eventDetails/${event._id}`} className="blue-text text-darken-2">View Details</a>
              </div>
            </div>
          </div>
      </div>

    )
  }
}
