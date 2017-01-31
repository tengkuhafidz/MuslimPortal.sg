import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react'

import {Challenges} from '../../api/challenges.js'

export default class ChallengesUpdate extends TrackerReact(React.Component) {
    constructor(props) {
        super(props)
        this.state = {
            subscription: {
                challenges: Meteor.subscribe("allChallenges")
            }
        }
    }

    componentDidMount() {
        document.title = "#Challenge | Edit"
        //load jQuery for datePicker
        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15, // Creates a dropdown of 15 years to control year
            format: 'yyyy-mm-dd'
        });
    }

    defaultEventValues() {
        return Challenges.findOne({_id: this.props.challengeId})
    }

    isEventExist(dateStart) {
        return Challenges.findOne({"dateStart": dateStart})
    }

    handleSubmit(e) {

        e.preventDefault()

        var action = (this.refs.action.value.trim()) ? this.refs.action.value.trim() : this.defaultEventValues().action;
        var dateStart = (this.refs.dateStart.value.trim()) ? moment(this.refs.dateStart.value.trim()).format() : this.defaultEventValues().dateStart;

            // dateStart = moment(dateStart).format() // 2017-01-31T00:00:00+08:00
        dayOfWeek = moment(dateStart).day() //1 = Monday, 2 =Tuesday etc

            if (dayOfWeek == 1) {

                if (this.isEventExist(dateStart)) {
                    if (dateStart == this.defaultEventValues().dateStart) { //if date is the same
                        console.log('HELLO I ')
                        //success
                        //compute end_date
                        dateEnd = moment(dateStart).add(6, 'days').endOf('day').format();

                        Meteor.call('updateChallenge', this.props.challengeId, action, dateStart, dateEnd, (error, data) => {
                            if (error) {
                                Bert.alert(error.error, 'danger', 'fixed-top', 'fa-frown-o');
                            } else {
                                Materialize.toast('Updated Successfully!', 4000)
                                FlowRouter.go("/challengesView")
                            }
                        })

                    } else { //duplicate data!
                        Bert.alert("Date Existed - Duplication detected", 'danger', 'fixed-top', 'fa-frown-o');

                    }
                } else { //add as per normal
                    //compute end_date
                    dateEnd = moment(dateStart).add(6, 'days').endOf('day').format();

                    Meteor.call('updateChallenge', this.props.challengeId, action, dateStart, dateEnd, (error, data) => {
                        if (error) {
                            Bert.alert(error.error, 'danger', 'fixed-top', 'fa-frown-o');
                        } else {
                            Materialize.toast('Updated Successfully!', 4000)
                            FlowRouter.go("/challengesView")
                        }
                    })
                }

            } else { //if NOT monday, straightaway forget about it
                Bert.alert("Start Date must be on Monday", 'danger', 'fixed-top', 'fa-frown-o');
            }

    }

    render() {

        defaultEventValues = this.defaultEventValues()

        //dateStart JUST for display
        dateStart = moment(defaultEventValues.dateStart).format("YYYY-MM-DD")
        // console.log("DATE START (render): ", dateStart)

        if (!defaultEventValues)
            return <span>loading..
            </span>


        {/* <input id="name" type="text" className="validate" ref="name" defaultValue={defaultEventValues.name}/> */
        }

        return (

            <div className="row bottomGap grey-text text-darken-3">
                <div className="col s12 m10 offset-m1 ">
                    <div className="card-panel">

                        <h2>
                            Edit #BeBetter Challenge
                        </h2>
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
