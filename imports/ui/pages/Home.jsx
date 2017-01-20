import React from 'react';

import Greeting from '../Home/Greeting.jsx'


export default class Home extends React.Component{

  // componentDidMount(){
  //     $('.swashIn').addClass('magictime swashIn');
  // }

  render(){
   
    return(
      <div className="center ">
        <p className="">
          <Greeting/>
        </p>
      </div>
    )
  }
}
