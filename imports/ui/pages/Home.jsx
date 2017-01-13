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
        <br/>
          <br/>
            <br/>
        <div className=" messageAnimation invisible betaFont">
          <h5 className="">
            "{randomMessage.message}"
          </h5>
          <div className="flow-text slightSmall" >({randomMessage.hashtag})</div>
        </div>
      </div>
    )
  }
}
