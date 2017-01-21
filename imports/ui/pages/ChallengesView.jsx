import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Challenges} from '../../api/challenges.js'

// import MusollaAll from '../MusollaView/MusollaAll.jsx'
import ChallengesSingle from '../ChallengesView/ChallengesSingle.jsx';

export default class ChallengesView extends TrackerReact(React.Component) {
  constructor() {
      super();

      this.state = {
          subscription: {
              challenges: Meteor.subscribe("allChallenges")
          }
      }
  }

  showAllChallenges() {

      challenges = Challenges.find({}).fetch();

      return challenges
  }

  render(){

    challenges = this.showAllChallenges()

    if (!challenges)
        return <span>loading</span>

    return(
      <div className="lessMarginTop">
        <h1 className="center ">
          Take Teh #Challenge
        </h1>
        <p className="betaFont belowCaption center">(Scrollable List)</p>
          <div className="row noShadow">
            <div className="col s8 push-s2">
              <ul className="collection scrollView">

              {challenges.map((challengeEach)=>{
                console.log(challengeEach._id)
                return <ChallengesSingle key={challengeEach._id} challenges={challengeEach} />
              })}

            </ul>
            </div>
          </div>

      </div>
    )
  }
}
