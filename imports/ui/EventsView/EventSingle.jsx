import React from 'react';
import SpeakerSingle from './SpeakerSingle.jsx';

export default class EventSingle extends React.Component{

  componentDidMount(){
    document.title = "Mosque Events | Events"
  }

  render(){
  	event = this.props.event

    needParticipants = event.needParticipants ? <span className="lessEmphasis"><i className="material-icons iconAlign">perm_identity</i> <span> Participants Needed </span> </span>: <span></span>
    needVolunteers = event.needVolunteers ? <span className="lessEmphasis"><i className="material-icons iconAlign">assignment_ind</i> <span> Volunteers Needed </span>  </span>: <span></span>
    gender = (event.gender == "f") ? <span className="lessEmphasis female"><i className="material-icons iconAlign">person</i> <span className=""> Female Only</span> </span>: (event.gender == "m") ? <span className="lessEmphasis male"><i className="material-icons iconAlign">person</i> <span className=""> Male Only </span> </span>: <span className="lessEmphasis"><i className="material-icons iconAlign">person</i> <span className=""> Any Genders </span> </span>

  speaker = (event.speaker == "") ? <p>NIL</p> : <span>{event.speaker}</span>

  dateEnd = new Date(event.dateEnd)
  dateStart = new Date(event.dateStart)
  //console.log("date",date.toLocaleDateString("en-US"))

  //Get timeStart/timeEnd outta ISOString
  //myDate.getMinutes();
  //myDate.getHours();

  // formattedDateEnd = dateEnd.getHours() + ":" + dateEnd.getMinutes()
  // console.log(formattedDateEnd);

  //date start, time start
  var startTime = moment(dateStart).format("HH:mm");
  var startDate = moment(dateStart).format("dddd, MMMM Do YYYY");

  //date end, time end
  var endTime = moment(dateEnd).format("HH:mm");
  var endDate = moment(dateEnd).format("dddd, MMMM Do YYYY");

  console.log("es", event.speaker[0])
speaker = ""
  if (event.speaker){
    speaker = (
      event.speaker.map((singleSpeaker)=>{
        return <SpeakerSingle key={singleSpeaker} singleSpeaker={singleSpeaker} />
      })
    )
  }

    return(
      <div>
          <div className="col s12 m6 ">
            <div className="card hoverable">
              <div className="card-content black-text">
                <span className="card-title truncate"><strong>{event.name}</strong></span>

                  <div className="row">

                      {speaker}
                  </div>
                <p>{startDate}, {startTime} -  {endDate}, {endTime}
                <span className="">
                    <span> @ {event.mosqueName} Mosque</span>
                  </span>
                <br/>
                <br/></p>
                <p>{event.venue}</p>

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
