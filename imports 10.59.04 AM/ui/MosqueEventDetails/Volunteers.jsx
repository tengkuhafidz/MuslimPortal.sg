import React, {Component} from 'react';
import SingleVolunteers from './SingleVolunteers.jsx';

import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Volunteers extends TrackerReact(Component) {
  constructor(){
  super();

  this.state={
    subscription: {
      users:  Meteor.subscribe('allUsers')

    }
  }
  }

  // volunteersDetails(){
  //   participantsId = this.props.participantsId
  //   participantsDetails =[]
  //   {participantsId.map((participantId)=>{
  //
  //      participantsDetails.push(Meteor.users.find({_id: participantId}).fetch());
  //
  //   } )}
  //
  //
  //   return participantsDetails;
  // }

  render(){
    volunteers = this.props.volunteers;
    if(!volunteers)
      return <span> loading </span>

  //console.log("fe", volunteers)

    var stringOfMail = 'mailto:';
    return (
      <div className="row">
          {volunteers.map((singleEmail)=>{
            console.log(singleEmail)
            stringOfMail += singleEmail + ','
            return <SingleVolunteers email={singleEmail} key={singleEmail} eventName={this.props.eventName}/>
          } )}

          <a href={stringOfMail} className="btn rightAbitSgt">Mail All</a>
      </div>
    )
  }
}
