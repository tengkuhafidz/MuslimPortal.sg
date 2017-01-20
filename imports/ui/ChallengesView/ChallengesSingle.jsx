import React from 'react';

import DirectionSingle from '../MusollaView/DirectionSingle.jsx';
import {Challenges} from '../../api/challenges.js';

export default class ChallengesSingle extends React.Component{

  componentDidMount(){
    document.title = "List Of Challenges| #Challenges"
  }
  deleteThisChallenge() {
  //  Meteor.call('deleteChallenge', this.props.challenges._id)
  that = this
       swal({
        title: "Bye?",
        text: "Are you sure you want to delete?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete now!",
        closeOnConfirm: true,
        html: false
      }, function(){
         Meteor.call('deleteChallenge', that.props.challenges._id)

      });


  }
  editThisChallenge(e) {
    updateChallenge
  }


  render(){

    challenges = this.props.challenges
    dateStart = moment(challenges.dateStart).format("DD MMM (ddd)")
    dateEnd = moment(challenges.dateEnd).format("DD MMM (ddd)")

    return(
      <li className="collection-item">

        <span className="grey-text text-darken-3 truncate collection-span">{challenges.action} <br /><span className="smallFont">{dateStart} - {dateEnd}</span></span>
        <a href={`/challengesUpdate/${challenges._id}`}
          className="fa fa-pencil right grey-text"></a>
      {/* <a href={`/MosqueEventUpdate/${event._id}`} className="btn green darken-2">Update</a> */}
      &nbsp;&nbsp;&nbsp;&nbsp;
        <a
          className="fa fa-trash right grey-text text-darken-2"
          onClick={this.deleteThisChallenge.bind(this)}
        ></a>
    </li>

    )
  }
}
