import React from 'react';
import MusollaSingle from './MusollaSingle.jsx';

export default class MusollaAll extends React.Component{

  componentDidMount(){
    document.title = "Musolla | View All Musolla"
  }

  render(){
    musolla = this.props.musolla
    if(!musolla)
      return <span> loading </span>

    return(
    	<div className="row noShadow">
        <div className="col s8 push-s2">
          <div className="collection scrollView">


          {musolla.map((musollaEach)=>{
            console.log(musollaEach._id)
            return <MusollaSingle key={musollaEach._id} musolla={musollaEach} />
          })}

                    {musolla.map((musollaEach)=>{
                      console.log(musollaEach._id)
                      return <MusollaSingle key={musollaEach._id} musolla={musollaEach} />
                    })}

                              {musolla.map((musollaEach)=>{
                                console.log(musollaEach._id)
                                return <MusollaSingle key={musollaEach._id} musolla={musollaEach} />
                              })}

                                        {musolla.map((musollaEach)=>{
                                          console.log(musollaEach._id)
                                          return <MusollaSingle key={musollaEach._id} musolla={musollaEach} />
                                        })}

          </div>
        </div>
      </div>
    )
  }
}
