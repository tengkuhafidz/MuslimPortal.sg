import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react'

import {Events} from '../../api/events.js'

export default class EventDetails extends TrackerReact(React.Component) {
    componentDidMount() {
        document.title = "GoMosque 2.0 | EventDetails"
    }

    constructor(props) {
        super(props);

        // hasParticipated = this.hasParticipated()
        // hasVolunteered = this.hasVolunteered()

        this.state = {
            subscription: {
                events: Meteor.subscribe("allEvents")
            },
            // participate: hasParticipated,
            // volunteer: hasVolunteered
        }
    }

    event() {
        return Events.findOne(this.props.eventId)
    }

    handleParticipate() {
        event = this.event()

        console.log(event._id)

        if (this.state.participate) {

            Meteor.call('participateUser', event._id, function() {
                console.log("SUCCESSS")
                Materialize.toast('Participation RSVP Success!', 4000)

            })

            this.setState({participate: false})

        } else {
            Meteor.call('cancelParticipation', event._id, function() {
                console.log("SUCCESSS")
                Materialize.toast('Participation Cancelled!', 4000)

            })
            this.setState({participate: true})

        }

    }

    handleVolunteer() {
        event = this.event()

        console.log(event._id)

        if (this.state.volunteer) {

            Meteor.call('volunteerUser', event._id, function() {
                console.log("SUCCESSS")
                Materialize.toast('Volunteer RSVP Success!', 4000)

            })

            this.setState({volunteer: false})

        } else {
            Meteor.call('cancelVolunteer', event._id, function() {
                console.log("SUCCESSS")
                Materialize.toast('Volunteer Cancelled!', 4000)

            })
            this.setState({volunteer: true})
        }

    }

    // hasParticipated() {
    //     event = this.event()
    //     if (Events.findOne({_id: event._id, participants: Meteor.user().emails[0].address}))
    //         return false;
    //     else
    //         return true;
    //     }

    // hasVolunteered() {
    //     event = this.event()
    //     if (Events.findOne({_id: event._id, volunteers: Meteor.user().emails[0].address}))
    //         return false;
    //     else
    //         return true;
    //     }

    render() {
        event = this.event()

        if (!event)
            return <span>loading</span>

        // console.log(this.state.participate)

        // participateBtn = this.state.participate
        //     ? <button className="btn blue darken-2 fullButton" onClick={this.handleParticipate.bind(this)}>
        //             <i className="material-icons left">perm_identity</i>Participate</button>
        //     : <button className="btn grey darken-2 fullButton" onClick={this.handleParticipate.bind(this)}>Cancel Participation</button>
        // volunteerBtn = this.state.volunteer
        //     ? <button className="btn blue darken-2 fullButton" onClick={this.handleVolunteer.bind(this)}>
        //             <i className="material-icons left">assignment_indi</i>Volunteer</button>
        //     : <button className="btn grey darken-2 fullButton" onClick={this.handleVolunteer.bind(this)}>Cancel Volunteer</button>

        // needParticipants = event.needParticipants
        //     ? <span>{participateBtn}</span>
        //     : <span></span>
        // needVolunteers = event.needVolunteers
        //     ? <span>{volunteerBtn}</span>
        //     : <span></span>

        numberParticipants = (!event.participants)
            ? <span>
                    0
                </span>
            : <span >{event.participants.length}</span>
        pLength = (isNaN(event.numberParticipants))
            ? <span></span>
            : <span >
                / {event.numberParticipants}
            </span>
    //     if (needParticipants) {

    //         if (!isNaN(event.numberParticipants)) {
    //             //event.numberParticipants - event.participants.length
    //             vacant = event.numberParticipants

    //             if (event.participants) {
    //                 vacant -= event.participants.length
    //             }
    //         }

    //         gender = (event.gender == "f")
    //             ? <span className="lessEmphasis female">
    //                     <i className="material-icons iconAlign">person</i>
    //                     <span className="">
    //                         Female Only</span>
    //                 </span>
    //             : (event.gender == "m")
    //                 ? <span className="lessEmphasis male">
    //                         <i className="material-icons iconAlign">person</i>
    //                         <span className="">
    //                             Male Only
    //                         </span>
    //                     </span>
    //                 : <span className="lessEmphasis">
    //                     <i className="material-icons iconAlign">person</i>
    //                     <span className="">
    //                         Any Genders
    //                     </span>
    //                 </span>

    //         vacantParticipant = (isNaN(event.numberParticipants))
    //             ? <p>
    //                     <strong>No Participantion Limit</strong>
    //                 </p>
    //             : <p>
    //                 <strong>Participation</strong>: {vacant}
    //                 places left
    //             </p>
    //     } else {
				// 	vacantParticipant = <span></span>
				// }

				// if (needVolunteers) {

				// 		if (!isNaN(event.numberVolunteers)) {
				// 				//event.numberParticipants - event.participants.length
				// 				vacant = event.numberVolunteers

				// 				if (event.volunteers) {
				// 						vacant -= event.volunteers.length
				// 				}
				// 		}

				// 		gender = (event.gender == "f")
				// 				? <span className="lessEmphasis female">
				// 								<i className="material-icons iconAlign">person</i>
				// 								<span className="">
				// 										Female Only</span>
				// 						</span>
				// 				: (event.gender == "m")
				// 						? <span className="lessEmphasis male">
				// 										<i className="material-icons iconAlign">person</i>
				// 										<span className="">
				// 												Male Only
				// 										</span>
				// 								</span>
				// 						: <span className="lessEmphasis">
				// 								<i className="material-icons iconAlign">person</i>
				// 								<span className="">
				// 										Any Genders
				// 								</span>
				// 						</span>

				// 		vacantVolunteer = (isNaN(event.numberVolunteers))
				// 				? <p>
				// 								<strong>No Volunteer Limit</strong>
				// 						</p>
				// 				: <p>
				// 						<strong>Volunteers</strong>: {vacant}
				// 						places left
				// 				</p>
				// } else {
				// 	vacantVolunteer = <span></span>
				// }
        return (
            <div className="topGap">
                <div className="row">
                    <div className="col s12">
                        <div className="card-panel hoverable">
                            <h2>{event.name}</h2>
                            <p>{event.theDate}, {event.start}
                                - {event.end}
                            </p>
                            <p>{event.mosqueName}
                                Mosque</p>
                            <p></p>
                            <p>{event.description}</p>
                            <p></p>
														<p></p>

                            <p className="topGap"></p>
                            <p></p>

                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
