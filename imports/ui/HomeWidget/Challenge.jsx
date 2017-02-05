import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react'

import {Challenges} from '../../api/challenges.js'

export default class Challenge extends TrackerReact(React.Component){

  constructor() {
    super();

    this.state = {
        subscription: {
            challenges: Meteor.subscribe("allChallenges")
        }
    }
  }

  getChallenge(){

    nowDate = moment().format();

    challenge = Challenges.findOne({dateEnd: {$gte: nowDate}, dateStart: {$lte: nowDate}});

    return challenge;

  }

  handleJoin(){

    var challenge = this.getChallenge()

    console.log("id", challenge._id)


    localStorage.setItem("joined", challenge._id)
    
    Meteor.call('joinChallenge', (error,data) => {
            if(error){
                Bert.alert(error.error, 'danger', 'fixed-top', 'fa-frown-o');
            } else {
               Bert.alert("Thank you! Let's take on this challenge.", 'success', 'fixed-top', 'fa-check');
            }
    })
  }


  render(){

    joinedId = localStorage.getItem("joined");
    var challenge = this.getChallenge();

    if (!challenge)
            return <span> &nbsp; </span>


    var joinedNo = challenge.joined ? <span>{challenge.joined}</span> : "";

    var joinStatusArea = joinedId === challenge._id ? "" : <a className="waves-effect waves-light btn-large " onClick={this.handleJoin.bind(this)}>Join Challenge</a>


    // if(joinedDate > challenge.dateStart && moment().isoWeekday() === 7){
    //   joinStatusArea = (
    //       <p className="betaFont challengeMessage">
    //         <b>FINAL DAY!</b> &nbsp; Share your reflections with <b>#bebetter #nusms</b>.
    //       </p>
    //     )
    // } else if(joinedDate > challenge.dateStart) {
    //   joinStatusArea = (
    //       <p className="betaFont challengeMessage">
    //         <b>Thank you for joining!</b> Let's do this together and <b>#bebetter</b>.
    //       </p>
    //     )
    // }


    return(
      <div className="center bottomGap animated fadeIn">
        <div className="">
        <img src="/logo-white.png" height="80px"/>
        <h5>#BeBetter Challenge of The Week:</h5>
        <br/>
        <h1 className="cursiveFont noTopGap">{challenge.action}</h1>
        <h6 className="joinedCount"> Current Challenge Takers: {joinedNo} </h6>

          {joinStatusArea}

        </div>
      </div>
    )
  }
}
