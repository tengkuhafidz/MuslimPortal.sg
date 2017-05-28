import React from 'react';


export default class RamadhanHopes extends React.Component{

  // componentDidMount(){
  //     $('.swashIn').addClass('magictime swashIn');
  // }

  render(){
    var randomRamadhanHope = ramadhanHopes[Math.floor(Math.random() * ramadhanHopes.length)];

    var twitterLink = `https://twitter.com/intent/tweet?text="${randomRamadhanHope.message}"%20(${randomRamadhanHope.by})%20-%20Via%20MyNUSMS%20Portal`

    return(
      <div className="center">
        <img src="/logo-white.png" height="80px"/>
        <div >
          <h5 className=" cursiveFont">NUSMS Ramadhan Hopes <i className="fa fa-heart" aria-hidden="true"></i></h5>
          <h3 className=" ">
            "{randomRamadhanHope.message}"
          </h3>
          <div className="flow-text smallFont" >({randomRamadhanHope.by})</div>
          <a class="twitter-share-button " href={twitterLink} target="_blank">
            <i className="fa fa-twitter  socialShare" aria-hidden="true"></i>
          </a>
        </div>
     
      </div>
    )
  }
}
