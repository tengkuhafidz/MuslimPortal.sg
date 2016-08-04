import React from 'react';

import {Events} from '../../api/events.js';

export default class MosqueEventForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            needParticipants: true,
            needVolunteers: true,
            gender: "all"
        };
    }
    componentDidMount() {
        document.title = "Mosque Events | MosqueEventForm"
        //load jQuery for datePicker
        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year
        });
    }

    handleNeedParticipants() {

        this.setState({
            needParticipants: !this.state.needParticipants
        });
    }
    handleNeedVolunteers() {

        this.setState({
            needVolunteers: !this.state.needVolunteers
        });
    }
    handleSubmit(e) {
      e.preventDefault()
      var name = this.refs.name.value.trim();
      var description = this.refs.description.value.trim();
      var theDate = this.refs.date.value.trim();
      var start = this.refs.start.value.trim();
      var end = this.refs.end.value.trim();

      var needParticipants = this.state.needParticipants;
      var numberParticipants = parseInt(this.refs.participantNumber.value.trim());
      var needVolunteers = this.state.needVolunteers;
      var numberVolunteers = parseInt(this.refs.volunteerNumber.value.trim());
      var gender = e.target.elements.gender.value;

      console.log(name)
      console.log(description)
      console.log(theDate)
      console.log(needParticipants)
      console.log(numberParticipants)
      console.log(needVolunteers)
      console.log(numberVolunteers)
      console.log(gender)

      Meteor.call('addEvents', name, description, theDate, start, end, needParticipants, numberParticipants, needVolunteers, numberVolunteers,
    gender, (error,data) => {
            if(error){
                Bert.alert('Some input fields are not filled in.', 'danger', 'fixed-top', 'fa-frown-o');
            } else {
                Materialize.toast('Event Added Successfully!', 4000)
                FlowRouter.go("/mosqueDashboard")

            }
        })

    
    }

    render() {
        return (

                <div className="row topGap bottomGap">
                  <div className="col s12 m10 offset-m1">
                    <div className="card-panel ">
                        
                        <h3> Add Event </h3>
                        <form onSubmit={this.handleSubmit.bind(this)} className="topGap">
                            <div className="row">
                                <div className="input-field">
                                    <input id="name" type="text" className="validate" ref="name"/>
                                    <label htmlFor="name">Name</label>
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field ">
                                    <textarea id="description" className="materialize-textarea" ref="description"></textarea>
                                    <label htmlFor="description">Description</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col m4">
                                    <input type="date" className="datepicker " id="date" ref="date"/>
                                    <label htmlFor="date">Date</label>
                                </div>

                                <div className="input-field col m4">
                                    <input type="time" id="start" ref="start" />
                                </div>
                                
                                <div className="input-field col m4">
                                    <input type="time" id="end" ref="end" />
                                </div>

                            </div>

                            <div className="row">
                                <div className="input-field col m4">
                                    <input type="checkbox" className="filled-in" id="needParticipants" ref="needParticipants" onClick={this.handleNeedParticipants.bind(this)} defaultChecked={this.state.needParticipants}/>
                                    <label htmlFor="needParticipants">Need Participants?</label>
                                </div>
                                <div className="input-field col m2">
                                    <input id="participantNumber" type="text" className="validate" ref="participantNumber"/>
                                    <label htmlFor="participantNumber">Limit</label>
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col m4">
                                    <input type="checkbox" id="needVolunteers" className="filled-in" ref="needVolunteers" onClick={this.handleNeedVolunteers.bind(this)} defaultChecked={this.state.needVolunteers}/>
                                    <label htmlFor="needVolunteers">Need Volunteers?</label>
                                </div>
                                <div className="input-field col m2">
                                    <input id="volunteerNumber" type="text" className="validate" ref="volunteerNumber"/>
                                    <label htmlFor="volunteerNumber">Limit</label>
                                </div>
                            </div>
                            <div className="row">

                                <p className="grey-text">Event Suitable for?</p>
                                <div className="col m3">
                                    <input name="gender" type="radio" id="all" value="all" ref="gender" />
                                    <label htmlFor="all">Any Gender</label>
                                </div>
                                <div className="col m3">
                                    <input name="gender" type="radio" id="male" value="m" ref="gender" />
                                    <label htmlFor="male">Male</label>
                                </div>

                                <div className="col m3">
                                    <input name="gender" type="radio" id="female" value="f" ref="gender" />
                                    <label htmlFor="female">Female</label>
                                </div>

                            </div>

                            <div className="topGap"></div>

                            <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                                <i className="material-icons right">send</i>
                            </button>

                        </form>

                    </div>
                  </div>
                </div>

        )
    }
}
