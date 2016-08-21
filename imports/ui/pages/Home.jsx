import React from 'react';

import Greeting from '../Home/Greeting.jsx'

export default class Home extends React.Component{

  componentDidMount(){
    console.log("in")
    $('.swashIn').addClass('magictime puffIn');
    console.log("out")
  }

  render(){
    var randomMessage = messages[Math.floor(Math.random() * messages.length)];

    return(
      <div className="center moreTopPadding ">
        <Greeting />
        <h1 className="topPadding swashIn"> 
          {randomMessage.message}
        </h1>
        <div className="flow-text">#{randomMessage.hashtag}</div>

      </div>
    )
  }
}
