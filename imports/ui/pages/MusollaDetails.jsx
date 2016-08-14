import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react'

import {Musolla} from '../../api/musolla.js'

import MusollaSingle from '../MusollaView/MusollaSingle.jsx';

export default class MusollaDetails extends TrackerReact(React.Component) {

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
<<<<<<< HEAD
        musolla.direction.map((singleStep)=>{
          return (<li>{singleStep}</li>)
        })
=======
      <div>
        <h5> Directions </h5>
        <ul> 
          {musolla.direction.map((singleStep)=>{
            return (<li>{singleStep}</li>)
          })}
        </ul>
      </div>
>>>>>>> 25f66ec245cf0cea66f4c162b3060bc58a401919
      )
    }

    return (
      <div className="topGap">
          <div className="row">
              <div className="col s12">
                  <div className="card-panel hoverable">
                      <h2>
<<<<<<< HEAD
                        {musolla.faculty}, {musolla.buildingName}
                        <span className="eventType right formalFont">
                            {musolla.gender}
                        </span>
                      </h2>

                      <p className="formalFont ">{musolla.sideNote}</p>



                      <p></p>
                      <p className="topGap"></p>
                      <h5>Directions: </h5>
                      <p>{directionSteps}</p>
=======
                        {musolla.faculty}, {musolla.building}
                        <span className="eventType right formalFont">
                          {musolla.gender}
                        </span>
                      </h2>

                      <h5>({musolla.description})</h5>
                      
                      <div>{directionSteps}</div>
>>>>>>> 25f66ec245cf0cea66f4c162b3060bc58a401919

                  </div>
              </div>

          </div>

      </div>
    )
  }
}
