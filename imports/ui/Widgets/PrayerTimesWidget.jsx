import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react'

const request = require('request');
const moment = require('moment');

export default class PrayerTimesWidget extends React.Component{

  render() {

    var prayerTimes = this.props.prayer;
    var currentPrayer = this.props.currentPrayer;

    var prayerTimesArea = [];
    for (var i = 0; i < prayerTimes.length; i++) {
      if(currentPrayer === i)
        prayerTimesArea.push(<span className="currentPrayer prayerTimes">{prayerTimes[i]}</span>);
      else
        prayerTimesArea.push(<span className="prayerTimes">{prayerTimes[i]}</span>)
    }


     return (
       <div className="betaFont smallFont">
          {prayerTimesArea}
       </div>
     )

  }

}
