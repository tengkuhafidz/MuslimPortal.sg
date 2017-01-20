import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Musolla} from '../../api/musolla.js'

// import MusollaAll from '../MusollaView/MusollaAll.jsx'
import MusollaSingle from '../MusollaView/MusollaSingle.jsx';

export default class MusollaView extends TrackerReact(React.Component) {
  constructor() {
      super();

      this.state = {
          subscription: {
              musolla: Meteor.subscribe("allMusolla")
          }
      }
  }

  showMusolla() {

      musolla = Musolla.find({}).fetch();

      return musolla
  }

  render(){

    musolla = this.showMusolla()

    if (!musolla)
        return <span>loading</span>

    return(
      <div className="lessMarginTop">
        <h1 className="center ">
          Musolla in NUS
        </h1>
        <p className="betaFont belowCaption center">(Scrollable List)</p>
          <div className="row noShadow">
            <div className="col s8 push-s2">
              <div className="collection scrollView">

              {musolla.map((musollaEach)=>{
                console.log(musollaEach._id)
                return <MusollaSingle key={musollaEach._id} musolla={musollaEach} />
              })}

              </div>
            </div>
          </div>

      </div>
    )
  }
}
