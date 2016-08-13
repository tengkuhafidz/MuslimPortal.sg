import React, {Component} from 'react';
import SingleParticipant from './SingleParticipant.jsx';

import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Participants extends TrackerReact(Component) {
  constructor(){
  super();

  this.state={
    subscription: {
      users:  Meteor.subscribe('allUsers')

    }
  }
  }

  // participantDetails(){
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
    participants = this.props.participants;
    if(!participants)
      return <span> loading </span>

  //console.log("fe", participants)

    var stringOfMail = 'mailto:';
    return (
      <div className="row rightAbit">

          {participants.map((singleEmail)=>{
            console.log(singleEmail)
            stringOfMail += singleEmail + ','
            return <SingleParticipant email={singleEmail} key={singleEmail} eventName={this.props.eventName}/>
          } )}

          <a href={stringOfMail} className="btn rightAbitSgt">Mail All</a>
      </div>
    )
  }
}
