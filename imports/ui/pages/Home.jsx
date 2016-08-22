import React from 'react';

import Greeting from '../Home/Greeting.jsx'

export default class Home extends React.Component{

  // componentDidMount(){
  //     $('.swashIn').addClass('magictime swashIn');
  // }

  render(){
    var randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setInterval(function(){ 
        $('.messageAnimation').addClass('magictime swashIn visible');
    }, 1000 );
    return(
      <div className="center moreTopPadding ">
        <Greeting />
        <div className="topPadding messageAnimation invisible">
          <h1 className=""> 
            {randomMessage.message}
          </h1>
          <div className="flow-text">#{randomMessage.hashtag}</div>
        </div>
      </div>
    )
  }
}
