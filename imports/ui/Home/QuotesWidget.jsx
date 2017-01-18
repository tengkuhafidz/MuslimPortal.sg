import React from 'react';


export default class QuotesWidget extends React.Component{

  // componentDidMount(){
  //     $('.swashIn').addClass('magictime swashIn');
  // }

  render(){
    var randomMessage = messages[Math.floor(Math.random() * messages.length)];
    return(
      <div className="center ">

        <div className="betaFont mainContent quote">
          <h6 className="">
            "{randomMessage.message}"
          </h6>
          <div className="flow-text smallFont" >({randomMessage.hashtag})</div>
        </div>
     
      </div>
    )
  }
}
