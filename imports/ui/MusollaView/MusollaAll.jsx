import React from 'react';
import MusollaSingle from './MusollaSingle.jsx';

export default class MusollaAll extends React.Component{
  //filter
  filter(type){

  }
  componentDidMount(){
    document.title = "Musolla | View All Musolla"
  }

  render(){
  	musolla = this.props.musolla
    if(!musolla)
      return <span> loading </span>

    return(
    	<div className="row">
        <div className="collection">

      
          {musolla.map((musollaEach)=>{
            return <MusollaSingle key={musollaEach._id} musolla={musollaEach} />
          })}

        </div>
      </div>
    )
  }
}
