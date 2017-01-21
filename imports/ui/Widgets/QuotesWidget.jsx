import React from 'react';


export default class QuotesWidget extends React.Component{

  // componentDidMount(){
  //     $('.swashIn').addClass('magictime swashIn');
  // }

  render(){
    var randomMessage = messages[Math.floor(Math.random() * messages.length)];

    var twitterLink = `https://twitter.com/intent/tweet?text="${randomMessage.message}"%20(${randomMessage.hashtag})&hashtags=NUSMSReminds`

    return(
      <div className="center quoteArea">

        <div className="betaFont mainContent quote ">
          <h6 className="">
            "{randomMessage.message}"
          </h6>
          <div className="flow-text smallFont" >({randomMessage.hashtag})</div>
          <a class="twitter-share-button " href={twitterLink} target="_blank">
            <i className="fa fa-twitter  socialShare" aria-hidden="true"></i>
          </a>
        </div>
     
      </div>
    )
  }
}
