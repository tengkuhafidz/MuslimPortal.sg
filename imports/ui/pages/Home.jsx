import React from 'react';

import Greeting from '../Home/Greeting.jsx'

export default class Home extends React.Component{

  render(){
    var randomMessage = messages[Math.floor(Math.random() * messages.length)];

    return(
      <div className="center moreTopPadding ">
        <Greeting />
        <h1 className="topPadding "> 
          {randomMessage.message}
        </h1>
        <div className="flow-text">#{randomMessage.hashtag}</div>

      </div>
    )
  }
}
