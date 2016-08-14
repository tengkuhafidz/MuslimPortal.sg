import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react'

import {Events} from '../../api/events.js'

import SpeakerSingle from '../EventsView/SpeakerSingle.jsx';
import TagSingle from '../EventsView/TagSingle.jsx';


export default class EventDetails extends TrackerReact(React.Component) {

    constructor(props) {
        super(props);

        this.state = {
            subscription: {
                events: Meteor.subscribe("allEvents")
            },
        }
    }

    event() {
        return Events.findOne(this.props.eventId)
    }

   
    removeEvent(){
        eventId = this.props.eventId
        swal({
          title: "Delete Event?",
          text: "Are you sure you want to Delete this event?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Delete",
          closeOnConfirm: true,
          html: false
        }, function(){
          Meteor.call('removeEvent', eventId)
          FlowRouter.go('/eventsView');
        }); 
      
    }

    render() {
        
        event = this.event()

        if (!event)
            return <span>loading</span>

        dateEnd = new Date(event.dateEnd)
        dateStart = new Date(event.dateStart)

          //date start, time start
          var startTime = moment(dateStart).format("HH:mm");
          var startDate = moment(dateStart).format("Do MMMM YYYY");

          //date end, time end
          var endTime = moment(dateEnd).format("HH:mm");
          var endDate = moment(dateEnd).format("Do MMMM YYYY");

          speaker = ""

          if (event.speaker){
            speaker = (
              event.speaker.map((singleSpeaker)=>{
                return <SpeakerSingle key={singleSpeaker} singleSpeaker={singleSpeaker} />
              })
            )
          } 

        tags = ""

        if (event.tags !== ""){
            tags = (
              event.tags.map((singleTag)=>{
                return <TagSingle key={singleTag} singleTag={singleTag} />
              })
            )
        }


        return (
            <div className="topGap formalFont">
                <div className="row">
                    <div className="col s12">
                        <div className="card-panel hoverable">
                            <h2 className="">{event.name}</h2>
                            <p className="formalFont lessEmphasis"> <i className="material-icons iconAlign">person_pin</i> {speaker}</p>
                            <p className="formalFont lessEmphasis "> <i className="material-icons iconAlign">schedule</i> {startDate}, {startTime} hrs -  {endDate}, {endTime} hrs</p>
                            <p className="formalFont lessEmphasis"> <i className="material-icons iconAlign">business</i> {event.venue}</p>
                            <p className="formalFont lessEmphasis"> <i className="material-icons iconAlign">explore</i> {event.address}</p>
                            
                            <h4>Description</h4>
                            <p>{event.description}</p>
                            {tags}
                            <p></p>
                            <p className="topGap"></p>
                            <p></p>

                              <div className="right-align">
                                <a href={`/MosqueEventUpdate/${event._id}`} className="btn green">Update</a>
                                  <span className="marginSides"></span>
                                <button className="btn red" onClick={this.removeEvent.bind(this)}>Delete</button>
                              </div>

                        </div>
                    </div>

                </div>

            </div>
        )
    }
}
