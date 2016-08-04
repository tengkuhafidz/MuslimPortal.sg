import React, {Component} from 'react';

export default class SingleVolunteers extends Component {
  render(){
    //var stringOfMail = "";

    return (
      <div className="row">
        <a href={`mailto:${this.props.email}?Subject=${this.props.eventName}`} className="rightAbit">{this.props.email}</a>

      </div>
    )
  }
}
