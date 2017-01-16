import React from 'react';

export default class EventSingle extends React.Component{

  componentDidMount(){
    document.title = "NUS Events | All Events"
  }

  render(){

  	event = this.props.event

    dateEnd = new Date(event.start_time)
    dateStart = new Date(event.end_time)

    //date start, time start
    var startTime = moment(dateStart).format("HH:mm");

    //date end, time end
    var endTime = moment(dateEnd).format("HH:mm");

    return(
      <div>
          <div className="col s12 m6 ">
            <div className="card hoverable">
              <div className="card-content black-text ">
                <span className="card-title truncate">
                  <strong>{event.name}</strong>

                </span>

                <p className="formalFont grey-text"> <i className="material-icons iconAlign">schedule</i> {startTime} hrs - {endTime} hrs</p>

              </div>
              <div className="card-action">
                <a href={`/eventDetails/${event.id}`} className="blue-text text-darken-2">View Details</a>
              </div>
            </div>
          </div>
      </div>

    )
  }
}
