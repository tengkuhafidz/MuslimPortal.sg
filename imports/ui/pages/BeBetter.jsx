import React from 'react';

export default class BeBetter extends React.Component{

  // componentDidMount(){
  //     $('.swashIn').addClass('magictime swashIn');
  // }

  render(){
    var randomMessage = messages[Math.floor(Math.random() * messages.length)];

    return(
      <div className="center moreTopPadding">
        <div className="moreTopPadding">
        <img src="/logo-white.png" height="80px"/>
        <h5>#BeBetter Challenge of The Week:</h5>
        <br/>
        <h1 className="cursiveFont noTopGap">Start Every Conversation With A Smile</h1>
        <h6 className="halfSee topGap"> Current Challenge Takers: 65 </h6>
        <a className="waves-effect waves-light btn-large ">Join Challenge</a>
       {/* <p className="betaFont animated challengeMessage">
          <b>Thank you for joining!</b> Let's keep at this and <b>#bebetter #together</b>. 
        </p> */}
       {/* <p className="betaFont challengeMessage">
          <b>FINAL DAY!</b> &nbsp; Share your reflections with <b>#bebetter #nusms</b>.
        </p> */}

        </div>
      </div>
    )
  }
}
