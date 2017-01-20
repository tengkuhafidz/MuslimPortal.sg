import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react'

import {Challenges} from '../../api/challenges.js'

export default class ChallengesUpdate extends TrackerReact(React.Component) {
    constructor(props) {
        super(props)
        this.state={
            subscription: {
                challenges: Meteor.subscribe("allChallenges")
            },
        }
    }

    componentDidMount() {
        document.title = "#Challenge | Edit"
        //load jQuery for datePicker
        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15, // Creates a dropdown of 15 years to control year
            format: 'dd-mm-yyyy'
        });
    }

    defaultEventValues(){
        return Challenges.findOne({_id: this.props.challengeId})
    }

    handleSubmit(e) {

      e.preventDefault()

      var action = this.refs.action.value.trim();
      var dateStart = this.refs.dateStart.value.trim();

      //If this.refs.dateStart is empty, dateStart = the default dateStart
      // if (dateStart === ''){
      //   date = defaultEventValues.dateStart //keep returning 20
      //   dateStart = moment(defaultEventValues.date).format("DD-MM-YYYY")
      // }

      if (dateStart && action) { //it doesnt run this when dateStart remains the same

        properDateStart = dateStart;
        properDateStartFormat = dateStart.split("-");
        finalisedStart = properDateStartFormat[2] + "-" + properDateStartFormat[1] + "-" + properDateStartFormat[0] + "T" + "00:00:00"

        dateStart = new Date(finalisedStart)

        dateStart = dateStart.toISOString();

        //dateEnd
        dateEnd = moment(dateStart).add(6, 'days').endOf('day');

        dateEnd = dateEnd.toISOString();

      Meteor.call('updateChallenge', this.props.challengeId, action, dateStart, dateEnd, (error, data) => {
            if(error){
                Bert.alert('Some input fields are not filled in.', 'danger', 'fixed-top', 'fa-frown-o');
            } else {
                Materialize.toast('Updated Successfully!', 4000)
            FlowRouter.go(`/challengesView`)

            }
        })

    } else {
      //dateStart empty, set to default
      dateStart = this.defaultEventValues().dateStart;
      //dateEnd
      dateEnd = moment(dateStart).add(6, 'days').endOf('day');

      dateEnd = dateEnd.toISOString();

    Meteor.call('updateChallenge', this.props.challengeId, action, dateStart, dateEnd, (error, data) => {
          if(error){
              Bert.alert('Some input fields are not filled in.', 'danger', 'fixed-top', 'fa-frown-o');
          } else {
              Materialize.toast('Updated Successfully!', 4000)
          FlowRouter.go(`/challengesView`)

          }
      })

    }


  }

    render() {

        defaultEventValues = this.defaultEventValues()

        //dateStart JUST for display
        dateStart = moment(defaultEventValues.dateStart).format("DD-MM-YYYY")
        // console.log("DATE START (render): ", dateStart)

        if(!defaultEventValues)
            return <span>loading.. </span>

          {/* <input id="name" type="text" className="validate" ref="name" defaultValue={defaultEventValues.name}/> */}

          return (

                  <div className="row bottomGap grey-text text-darken-3">
                    <div className="col s12 m10 offset-m1 ">
                      <div className="card-panel">

                          <h2> Edit #BeBetter Challenge </h2>
                          <form onSubmit={this.handleSubmit.bind(this)} className="topGap">
                            <div className="topGap">
                              {/*<h4> What ? </h4>*/}
                              <div className="row">
                                  <div className="input-field col s12">
                                      <input id="action" type="text" className="validate" ref="action" defaultValue={defaultEventValues.action}/>
                                      <label htmlFor="action" className="active">Action</label>
                                  </div>
                              </div>

                          </div>

                          <div className="topGap">
                              <div className="row">
                                  <div className="input-field col m3">
                                      <input type="date" className="datepicker" id="dateStart" ref="dateStart" defaultValue={defaultEventValues.dateStart}/>
                                      <label htmlFor="dateStart">{dateStart}</label>
                                  </div>
                              </div>

                          </div>


                              <div className="topGap"></div>

                              <button className="btn waves-effect waves-light" type="submit" name="s">Submit
                                  <i className="material-icons right">send</i>
                              </button>

                          </form>

                      </div>
                    </div>
                  </div>

          )
    }
}
