import React from 'react';

import DirectionSingle from '../MusollaView/DirectionSingle.jsx';

export default class MusollaSingle extends React.Component{

  render(){

  	musolla = this.props.musolla

    return(

<<<<<<< HEAD
        <a href={`/musollaDetails/${musolla._id}`} className="collection-item grey-text text-darken-3">
          {musolla.faculty}, {musolla.buildingName} 
          <span className="secondary-content grey-text text-darken-3">
            <i className="material-icons">send</i>
          </span>
        </a>

=======
      <a href={`/musollaDetails/${musolla._id}`} class="collection-item grey-text text-darken-2">
        {musolla.faculty}, {musolla.building}
        <i className="material-icons secondary-content grey-text text-darken-2">send</i>
      </a>
>>>>>>> 25f66ec245cf0cea66f4c162b3060bc58a401919

    )
  }
}
