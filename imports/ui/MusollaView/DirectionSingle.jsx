import React from 'react';

export default class DirectionSingle extends React.Component{

  render() {
    direction = this.props.direction;

    return (
        <span >
        	+ {direction}
        <br/>
       	</span>


    )
  }
}
