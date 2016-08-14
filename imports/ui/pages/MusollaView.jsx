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
<<<<<<< HEAD
        <h1 className="center topGap">
=======
        <h1 className=" topGap center">
>>>>>>> 25f66ec245cf0cea66f4c162b3060bc58a401919
          Musolla in NUS
        </h1>

        <MusollaAll musolla={musolla}/>

      </div>
    )
  }
}
