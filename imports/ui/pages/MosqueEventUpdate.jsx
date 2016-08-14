import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react'

import {Events} from '../../api/events.js'

export default class MosqueEventUpdate extends TrackerReact(React.Component) {
    constructor(props) {
        super(props)

        defaultEventValues = this.defaultEventValues()
        this.state={
            subscription: {
                events: Meteor.subscribe("allEvents")
            },
            eventType: defaultEventValues.eventType
        }
    }

    componentDidMount() {
        document.title = "Admin | Edit Event Details"
        //load jQuery for datePicker
        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15, // Creates a dropdown of 15 years to control year
            format: 'dd-mm-yyyy'
        });
    }


    handleEventType(){
      this.setState({
          eventType: this.refs.type.value.trim()
      });
    }

    defaultEventValues(){
        return Events.findOne({_id: this.props.eventId})
    }

    handleSubmit(e) {
      e.preventDefault()

      /* what */
      var name = this.refs.name.value.trim();
      var eventType = this.refs.type.value.trim();
      var description = this.refs.description.value.trim();

      try {
        var speaker = this.refs.speaker.value.trim();

      } catch (err) {
        var speaker = "";
      }

      /* when */
      previousStartDate = moment(this.defaultEventValues().dateStart).format("DD-MM-YYYY");
      previousEndDate =  moment(this.defaultEventValues().dateEnd).format("DD-MM-YYYY");


      var dateStart = this.refs.dateStart.value.trim() ||  previousStartDate;//dd-mm-yy
      var timeStart = this.refs.start.value.trim(); //HH:mm
      var dateEnd = this.refs.dateEnd.value.trim() || previousEndDate;
      var timeEnd = this.refs.end.value.trim();
      var direction = this.refs.direction.value.trim();
      var venue = this.refs.venue.value.trim();
      var address = this.refs.address.value.trim();

      console.log("tS", dateStart)
      console.log("tS", timeStart)

      console.log("tS", dateEnd)
      console.log("tS", timeEnd)


      var fee = this.refs.fee.value;
      var tags = this.refs.tags.value;

//eventId, name, eventType, description, speaker, dateStart, timeStart, dateEnd, timeEnd, venue, address, fee, tags
      Meteor.call('updateEvents', this.props.eventId, name, eventType, description, speaker, dateStart, timeStart, dateEnd, timeEnd, venue, address, direction, fee, tags, (error,data) => {
            if(error){
                Bert.alert(error.error, 'danger', 'fixed-top', 'fa-frown-o');
            } else {
                Materialize.toast('Event Updated Successfully!', 4000)
            FlowRouter.go(`/mosqueEventDetails/${this.props.eventId}`)

            }
        })



    }

    render() {

        defaultEventValues = this.defaultEventValues()


        if(!defaultEventValues)
            return <span>loading.. </span>

        //console.log(defaultEventValues)

        if (defaultEventValues.speaker !== "" || this.state.eventType === "talk") {
            speaker = (
              <div className="input-field" className="col">
                  <input id="speaker" type="text" className="validate" ref="speaker" placeholder="Speaker 1,Speaker 2,..."/>
                  <label htmlFor="speaker" className="active">Speaker</label>
              </div>
            )

        } else {
            speaker = <span></span>
        }

        //date start, time start
        var startTime = moment(defaultEventValues.dateStart).format("HH:mm");
        var startDate = moment(defaultEventValues.dateStart).format("DD-MM-YYYY");

        console.log(startDate)

        //date end, time end
        var endTime = moment(defaultEventValues.dateEnd).format("HH:mm");
        var endDate = moment(defaultEventValues.dateEnd).format("DD-MM-YYYY");

        return (
                <div className="row topGap bottomGap">
                  <div className="col s12 m10 offset-m1">
                    <div className="card-panel ">

                        <h3> Add Event </h3>
                        <form onSubmit={this.handleSubmit.bind(this)} className="topGap">
                            <div className="row">

                                <div className="input-field col m6">
                                    <input id="name" type="text" className="validate" ref="name" defaultValue={defaultEventValues.name}/>
                                    <label htmlFor="name" className="active">title</label>
                                </div>

                                <div className="input-field col m6">
                                  <select ref="type" className="browser-default" onChange={this.handleEventType.bind(this)} defaultValue={defaultEventValues.eventType}>

                                    <option value="talk">talk</option>
                                    <option value="social">social</option>
                                    <option value="community">community</option>
                                    <option value="others">others</option>
                                  </select>

                                </div>
                            </div>

                            <div className="row">
                              <div className="input-field col m6">
                                <div>{speaker}</div>
                              </div>
                            </div>

                            <div className="row">
                                <div className="input-field">
                                    <textarea id="description" className="materialize-textarea" ref="description" defaultValue={defaultEventValues.description}></textarea>
                                    <label htmlFor="description" className="active">Description</label>
                                </div>

                            </div>

                            <div className="row">
                                <div className="input-field col m3">
                                    <input type="date" className="datepicker" id="dateStart" ref="dateStart" defaultValue={startDate} placeholder={startDate}/>
                                    <label htmlFor="dateStart" className="active">Start Date</label>
                                </div>
                                <div className="input-field col m3">
                                    <input type="time" id="start" ref="start" defaultValue={startTime}/>
                                </div>

                                <div className="input-field col m3">
                                    <input type="date" className="datepicker" id="dateEnd" ref="dateEnd" defaultValue={endDate} placeholder={endDate}/>
                                    <label htmlFor="dateEnd" className="active">End Date</label>
                                </div>

                                <div className="input-field col m3">
                                    <input type="time" id="end" ref="end" defaultValue={endTime}/>
                                </div>

                            </div>

                            <div className="input-field">
                                <input id="venue" type="text" className="validate" ref="venue" defaultValue={defaultEventValues.venue}/>
                                <label htmlFor="venue" className="active">Venue</label>
                            </div>

                            <div className="input-field">
                                <input id="address" type="text" className="validate" ref="address" defaultValue={defaultEventValues.address}/>

                                <label htmlFor="address" className="active">Address</label>
                            </div>

                            <div className="input-field">
                              <textarea id="direction" className="materialize-textarea" ref="direction" defaultValue={defaultEventValues.direction}></textarea>
                              <label htmlFor="direction" className="active">Directions (optional)</label>
                            </div>

                            <div className="input-field">
                                <input id="fee" type="number" step="0.01" className="validate" ref="fee" defaultValue="0.00" defaultValue={defaultEventValues.fee}/>
                                <label htmlFor="fee" className="active">Fee (SGD)</label>
                            </div>

                            <div className="input-field">
                                <input id="tags" type="text" className="validate" ref="tags" defaultValue={defaultEventValues.tags}/>
                                <label htmlFor="tags" className="active">tags (separated by comma)</label>
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
