import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react'

import {Musolla} from '../../api/musolla.js'

import MusollaSingle from '../MusollaView/MusollaSingle.jsx';

export default class MusollaDetails extends TrackerReact(React.Component) {
  componentDidMount() {
      document.title = "NUSMS | Musolla Details"
  }

  constructor(props) {
      super(props);

      this.state = {
          subscription: {
              events: Meteor.subscribe("allMusolla")
          },

      }
  }
  showMusolla() {
      return Musolla.findOne({"_id": this.props.musollaId})
  }

  render(){
    musolla = this.showMusolla()
    //alert(this.props.musollaId)
    if (!musolla)
        return <span>loading</span>

    if (musolla.direction){
      directionSteps = (
        musolla.direction.map((singleStep)=>{
          return (<p>singleStep</p>)
        })
      )
    }

    return (
      <div className="topGap">
          <div className="row">
              <div className="col s12">
                  <div className="card-panel hoverable">
                      <h2>{musolla.buildingName}{musolla.gender}</h2>

                      <p className="formalFont lessEmphasis">{musolla.faculty}</p>
                      <p className="formalFont lessEmphasis">{musolla.sideNote}</p>

                      <h4>Description</h4>
                      <p>{musolla.description}</p>

                      <p></p>
                      <p className="topGap"></p>
                      <p>{directionSteps}</p>

                  </div>
              </div>

          </div>

      </div>
    )
  }
}
