import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react'

import {Challenges} from '../../api/challenges.js'

import Greeting from '../HomeWidget/Greeting.jsx'
import Challenge from '../HomeWidget/Challenge.jsx'

export default class Home extends TrackerReact(React.Component) {

    constructor() {
        super();

        this.state = {
            subscription: {
                challenges: Meteor.subscribe("allChallenges")
            },
            showChallenge: false
        }
    }

    componentDidMount() {
        showChallenge : localStorage.getItem("showChallenge")
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

    render() {

        var challenge = this.getChallenge();

        if (!challenge)
            return <span>&nbsp;</span>

        showChallenge = JSON.parse(localStorage.getItem("showChallenge"))

        if (showChallenge === null || showChallenge)
            mainWidget = <Challenge/>
        else
            mainWidget = <Greeting/>

        switchScreenArea = challenge
            ? <a className="betaFont halfSee white-text switch smallFont" onClick={this.handleClick.bind(this)}>[Switch View]</a>
            : ""

        return (
            <div className="center mainArea animated fadeIn">

                {mainWidget}
                {switchScreenArea}
            </div>
        )
    }
}
