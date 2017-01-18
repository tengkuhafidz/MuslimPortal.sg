import React from 'react';
import EventItemSingle from '../Home/EventItemSingle.jsx'


export default class AnnouncementWidget extends React.Component {

  handleClick(){
  
  }

  render(){

    events = this.props.events



    console.log('today events: ', events)
     
    

    if(events.length < 1 ) {
      announcement = "";
    } else {
      announcement = (
        <div className="announcementArea">
           <h6> Happening Today: </h6>
           {events.map((eventEach)=>{
            return <EventItemSingle key={eventEach.id} eventItem={eventEach} />
            })}
        </div>
        )
    } 



    return(
      <div>
        {/*{announcement}*/}
      </div>
    )
  }
}
