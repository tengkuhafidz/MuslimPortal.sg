import React from 'react';

export default class BeBetter extends React.Component{

  // componentDidMount(){
  //     $('.swashIn').addClass('magictime swashIn');
  // }

  render(){
    var randomMessage = messages[Math.floor(Math.random() * messages.length)];

    return(
      <div className="center moreTopPadding ">
        <div className="moreTopPadding">
        <img src="/logo-white.png" height="80px"/>
        <h5>#BeBetter Challenge of The Week:</h5>
        <br/>
        <h1 className="cursiveFont noTopGap">Start Every Conversation With A Smile</h1>
          <br/>
            <br/>
        </div>
      </div>
    )
  }
}
