import React from 'react';

import DirectionSingle from '../MusollaView/DirectionSingle.jsx';

export default class MusollaSingle extends React.Component{

  render(){

  	musolla = this.props.musolla

    if (musolla.direction){
      directionSteps = (
        musolla.direction.map((singleStep)=>{
          return (<p>singleStep</p>)
        })
      )
    }


    return(

        <a href={`/musollaDetails/${musolla._id}`} className="collection-item grey-text text-darken-3">
          {musolla.faculty}, {musolla.buildingName} 
          <span className="secondary-content grey-text text-darken-3">
            <i className="material-icons">send</i>
          </span>
        </a>


    )
  }
}
