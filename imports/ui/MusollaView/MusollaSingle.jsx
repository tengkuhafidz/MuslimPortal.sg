import React from 'react';

import DirectionSingle from '../MusollaView/DirectionSingle.jsx';

export default class MusollaSingle extends React.Component{

  componentDidMount(){
    document.title = "Musolla List| Musolla"
  }

  render(){


    musolla = this.props.musolla

    return(

      <a href={`/musollaDetails/${musolla._id}`} className="collection-item grey-text text-darken-2">
        {musolla.faculty}, {musolla.building}
        <i className="material-icons secondary-content grey-text text-darken-2">send</i>
      </a>

    )
  }
}
