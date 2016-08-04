import React from 'react';

export default class Home extends React.Component{
  componentDidMount(){
    document.title = "Quick Plate | Home"
  }

  render(){
    return(
      <div>
        <h1>This is home.. Truly.. Where I know I must be....</h1>
        <a href="/login">login</a>

      </div>
    )
  }
}
