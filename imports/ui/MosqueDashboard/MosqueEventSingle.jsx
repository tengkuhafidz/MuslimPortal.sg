import React from 'react';

export default class MosqueEventSingle extends React.Component{

  componentDidMount(){
    document.title = "Mosque Events | MosqueDashboard"
  }


  render(){
  	event = this.props.event

    needParticipants = event.needParticipants ? <span className="lessEmphasis"><i className="material-icons iconAlign">perm_identity</i> <span> Participants Needed </span> </span>: <span></span>
    needVolunteers = event.needVolunteers ? <span className="lessEmphasis"><i className="material-icons iconAlign">assignment_ind</i> <span> Volunteers Needed </span>  </span>: <span></span>
    gender = (event.gender == "f") ? <span className="lessEmphasis female"><i className="material-icons iconAlign">person</i> <span className=""> Female Only</span> </span>: (event.gender == "m") ? <span className="lessEmphasis male"><i className="material-icons iconAlign">person</i> <span className=""> Male Only </span> </span>: <span className="lessEmphasis"><i className="material-icons iconAlign">person</i> <span className=""> Any Genders </span> </span>

    console.log(event)

    return(
    	<div>
          <div className="col s12 m6 ">
            <div className="card hoverable">
              <div className="card-content black-text">
                <span className="card-title truncate"><strong>{event.name}</strong></span>
                <p>{event.theDate}, {event.start} - {event.end} </p>
                <br/>
                <p>{gender}</p>
                <p>{needParticipants} {needVolunteers}</p>
              </div>
              <div className="card-action">
                <a href={`/MosqueEventDetails/${event._id}`} className="green-text text-lighten-2">View Details</a>
              </div>
            </div>
          </div>
      </div>
    )
  }
}
