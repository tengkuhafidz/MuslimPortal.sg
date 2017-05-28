import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react'

import {Challenges} from '../../api/challenges.js'

import Greeting from '../HomeWidget/Greeting.jsx'
import Challenge from '../HomeWidget/Challenge.jsx'
import RamadhanHopes from '../HomeWidget/RamadhanHopes.jsx'


export default class Home extends TrackerReact(React.Component) {

    constructor() {
        super();

        this.state = {
            subscription: {
                challenges: Meteor.subscribe("allChallenges")
            },
            showChallenge: true
        }
    }

    componentWillMount() {

        // showChallenge = localStorage.getItem("showChallenge") == null
        if (localStorage.getItem("showChallenge") == null )
          this.setState({showChallenge: true})
        else
          this.setState({showChallenge: localStorage.getItem("showChallenge")})
    }

    getChallenge() {

        nowDate = new Date().toISOString();

        challenge = Challenges.findOne({
            dateEnd: {
                $gte: nowDate
            },
            dateStart: {
                $lte: nowDate
            }
        });

        return challenge;

    }


    handleClick() {
        if (localStorage.getItem("showChallenge"))
            localStorage.setItem("showChallenge", !JSON.parse(localStorage.getItem("showChallenge")))
        else
            localStorage.setItem("showChallenge", false)

        this.setState({
            showChallenge: !this.state.showChallenge
        })

    }


    getRamadhanHopes() {

        

    }

    render() {

        {/* var challenge = this.getChallenge();
        showChallenge = JSON.parse(localStorage.getItem("showChallenge")) //true if want to show challenge

        if (showChallenge == null)
          showChallenge = true;

        if (challenge && showChallenge) //can switch view but NOT auto
            mainWidget = <Challenge/>
        else
            mainWidget = <Greeting/> */}



        {/* mainWidget = <Greeting />

        switchScreenArea = "";
         switchScreenArea = challenge
            ? <a className="betaFont halfSee white-text switch smallFont" onClick={this.handleClick.bind(this)}>[Switch View]</a>
            : "" */}


        var mainWidget = <RamadhanHopes />

        return (
            <div className="center mainArea ">

                {mainWidget}
                {/* switchScreenArea */}
            </div>
        )
    }
}
