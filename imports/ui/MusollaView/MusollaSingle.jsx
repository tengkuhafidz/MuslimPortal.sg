import React from 'react';

import DirectionSingle from '../MusollaView/DirectionSingle.jsx';

export default class MusollaSingle extends React.Component{

  componentDidMount(){
    document.title = "Musolla List| Musolla"
  }

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
      <div>
          <div className="col s12 m6 ">
            <div className="card hoverable">
              <div className="card-content black-text ">
                <span className="card-title truncate">
                  <strong>{musolla.faculty}</strong>
                  <span className="eventType right formalFont">
                    {musolla.buildingName}

                  </span>
                </span>

                <p className="formalFont grey-text"> <i className="material-icons iconAlign">business</i> {musolla.sideNote}</p>

              {directionSteps}

              <div className="card-action">
                <a href={`/musollaDetails/${musolla._id}`} className="blue-text text-darken-2">View Details</a>
              </div>
              </div>

            </div>
          </div>
      </div>

    )
  }
}
