import React from 'react';
import MusollaSingle from './MusollaSingle.jsx';

export default class MusollaAll extends React.Component{

  render(){
  	musolla = this.props.musolla
    if(!musolla)
      return <span> loading </span>

    return(
    	<div className="row">
        <div className="col s8 push-s2">
          <div className="collection">
            {musolla.map((musollaEach)=>{
              return <MusollaSingle key={musollaEach._id} musolla={musollaEach}/>
            })}
          </div>
        </div>
      </div>
    )
  }
}
