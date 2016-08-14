import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import {Musolla} from '../../api/musolla.js'

import MusollaAll from '../MusollaView/MusollaAll.jsx'

export default class MusollaView extends TrackerReact(React.Component) {
  constructor() {
      super();

      this.state = {
          subscription: {
              events: Meteor.subscribe("allMusolla")
          },
          filter: "all"
      }
  }

  showMusolla() {

      musolla = Musolla.find({});

      return musolla
  }
  render(){

    musolla = this.showMusolla()

    if (!musolla)
        return <span>
            loading
        </span>
    return(
      <div className="">
        <h1 className=" topGap center">
          Musolla in NUS
        </h1>
        
        <MusollaAll musolla={musolla}/>

      </div>
    )
  }
}
