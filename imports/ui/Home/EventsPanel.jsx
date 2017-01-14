import React from 'react';

export default class EventsPanel extends React.Component{

  constructor() {
      super();

      this.state = {
          subscription: {
              events: Meteor.subscribe("allEvents")
          }
      }
  }

  showEvents() {

      events = Events.find({}).fetch();

      return events
  }


  render(){

    events = this.showEvents()

    if (!events)
      return "loading"

    // noEvents = (
    //   <div className="eventsPanel">
    //      <h6> No Upcoming Events <i className="material-icons iconAlign">sentiment_dissatisfied</i></h6>
    //   </div>
    // )

    // allEvents = (
    //   <div className="eventsPanel">
    //     <h6> No Upcoming Events <i className="material-icons iconAlign">sentiment_dissatisfied</i></h6>
    //   </div>
    //   <div className="eventsPanel">
    //     <h6> 2 Upcoming Events <i className="material-icons iconAlign">sentiment_satisfied</i></h6>
    //     <div className="eventPanelItems">
    //       <hr />
    //       <p><a className="white-text mainLink">PBUH: ruNNur <br /><span className="smallFont">Monday, 11 Jan, 6pm</span></a></p>
    //       <hr />
    //       <p><a className="white-text mainLink truncate">PBUH: Grand Mawlid <br /><span className="smallFont">Friday, 13 Jan, 8pm</span></a></p>
    //     </div>
    //   </div>
    // )

      // <div className="eventsPanel">
      //   <h6> No Upcoming Events <i className="material-icons iconAlign">sentiment_dissatisfied</i></h6>
      // </div>
      // <div className="eventsPanel">
      //   <h6> 2 Upcoming Events <i className="material-icons iconAlign">sentiment_satisfied</i></h6>
      //   <div className="eventPanelItems">
      //     <hr />
      //     <p><a className="white-text mainLink">PBUH: ruNNur <br /><span className="smallFont">Monday, 11 Jan, 6pm</span></a></p>
      //     <hr />
      //     <p><a className="white-text mainLink truncate">PBUH: Grand Mawlid <br /><span className="smallFont">Friday, 13 Jan, 8pm</span></a></p>
      //   </div>
      // </div>

    // eventsPanelArea = events ? allEvents : noEvents

    return(
      <div className="eventsPanel">
        <h6> No Upcoming Events <i className="material-icons iconAlign">sentiment_dissatisfied</i></h6>
        
      </div>
    )
  }
}
