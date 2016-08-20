import React from 'react';

import DirectionSingle from '../MusollaView/DirectionSingle.jsx';

export default class MusollaSingle extends React.Component{

  componentDidMount(){
    document.title = "Musolla List| Musolla"
  }

  render(){


    musolla = this.props.musolla

    //gender = (musolla.gender === "Male") ? (<i className="fa fa-mars" aria-hidden="true"></i>) : (<i className="fa fa-venus" aria-hidden="true"></i>)

    if (musolla.gender === "Male")
      gender = (<i className="fa fa-male blue-text" aria-hidden="true"></i>)
    else if (musolla.gender === "Female")
      gender = (<i className="fa fa-female pink-text" aria-hidden="true"></i>)
    else
      gender = (<span><i className="fa fa-male blue-text" aria-hidden="true"></i><i className="fa fa-female pink-text" aria-hidden="true"></i></span>)

    return(

      <a href={`/musollaDetails/${musolla._id}`} className="collection-item grey-text text-darken-2">
        {gender} &nbsp;&nbsp;
        {musolla.faculty}, {musolla.building}
        <i className="material-icons secondary-content grey-text text-darken-2">send</i>
      </a>

    )
  }
}
