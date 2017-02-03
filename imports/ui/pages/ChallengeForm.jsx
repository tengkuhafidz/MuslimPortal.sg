import React from 'react';

import {Challenges} from '../../api/challenges.js';
// const moment = require('moment-timezone');

export default class ChallengeForm extends React.Component {

    constructor(props) {
        super(props);
    }
    //
    // componentWillMount() {
    //
    // }

    isEventExist(dateStart){
      return Challenges.findOne({"dateStart": dateStart})
    }

    componentDidMount() {
        //load jQuery for datePicker
        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15, // Creates a dropdown of 15 years to control year
            format: 'yyyy-mm-dd'
        });
    }

    handleSubmit(e) {
        e.preventDefault()

        var activity = this.refs.name.value.trim();
        var dateStart = this.refs.dateStart.value.trim();

        if (dateStart && activity) {
          //get start_date
          dateStart = moment(dateStart).format() // 2017-01-31T00:00:00+08:00
          dayOfWeek = moment(dateStart).day() //1 = Monday, 2 =Tuesday etc

          /* STARTS HERE */
          if (dayOfWeek != 1){ //don't need to contact mongoDB if start_date is not even on Monday to begin with
            Bert.alert("Start Date must be on Monday", 'danger', 'fixed-top', 'fa-frown-o');
          } else {
            if (this.isEventExist(dateStart)) {
              Bert.alert("Challenge already exist on that date", 'danger', 'fixed-top', 'fa-frown-o');
            } else {
              //compute end_date
              dateEnd = moment(dateStart).add(6, 'days').endOf('day').format();
              Meteor.call('addChallenge', activity, dateStart, dateEnd, (error, data) => {
                  if (error) {
                      Bert.alert(error.error, 'danger', 'fixed-top', 'fa-frown-o');
                  } else {
                      Materialize.toast('Challenge Added Successfully!', 4000)
                      FlowRouter.go("/")

                  }
              })
            }
          }

          /* ENDS HERE */

          // if (this.isEventExist(dateStart)){
          //   Bert.alert("Challenge already exist on that date", 'danger', 'fixed-top', 'fa-frown-o');
          //
          // } else if (dayOfWeek == 1) {
          //   //compute end_date
          //   dateEnd = moment(dateStart).add(6, 'days').endOf('day').format();
          //
          //   Meteor.call('addChallenge', activity, dateStart, dateEnd, (error, data) => {
          //       if (error) {
          //           Bert.alert(error.error, 'danger', 'fixed-top', 'fa-frown-o');
          //       } else {
          //           Materialize.toast('Challenge Added Successfully!', 4000)
          //           FlowRouter.go("/")
          //
          //       }
          //   })
          //
          //
          // } else {
          //   Bert.alert("Start Date must be on Monday", 'danger', 'fixed-top', 'fa-frown-o');
          // }

        } else {
            Bert.alert("Some input fields are not filled", 'danger', 'fixed-top', 'fa-frown-o');
        }
    }

    render() {
        return (

            <div className="row bottomGap grey-text text-darken-3">
                <div className="col s12 m10 offset-m1 ">
                    <div className="card-panel">

                        <h2>
                            Add #BeBetter Challenge
                        </h2>
                        <form onSubmit={this.handleSubmit.bind(this)} className="topGap">
                            <div className="topGap">
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="name" type="text" className="validate" ref="name"/>
                                        <label htmlFor="name" className="active">Action</label>
                                    </div>
                                </div>

                            </div>

                            <div className="topGap">
                                <div className="row">
                                    <div className="input-field col m3">
                                        <input type="date" className="datepicker" id="dateStart" ref="dateStart"/>
                                        <label htmlFor="dateStart">Start Date</label>
                                    </div>

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
