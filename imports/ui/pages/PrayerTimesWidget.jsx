import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react'

const request = require('request');
const moment = require('moment');

export default class PrayerTimesWidget extends React.Component{
  // constructor() {
  //   super();

  //   this.state = {
  //     prayer: ''
  //   }
  // }

  // componentDidMount() {
  //   this.getPrayerTime();
  // }

  // getPrayerTime() {
  //   that = this
  //   HTTP.call('GET', 'https://raw.githubusercontent.com/ruqqq/prayertimes-database/master/data/SG/1/2017.json', {}, function( error, response ) {

  //  if (error) {
  //    console.log("prayer err", error);
  //  } else {

  //    const PRAYER = {
  //      'Subuh': 0,
  //      'Syuruk': 1,
  //      'Zuhur': 2,
  //      'Asar': 3,
  //      'Maghrib': 4,
  //      'Isyak': 5
  //    }

  //      var currDate = moment().date();
  //      var currMonth = moment().month();

  //      data = JSON.parse(response.content)
  //      var timeArray = data[currMonth][currDate-1].times;

  //       var displayPrayer = [];

  //      for (var i=0; i < 6; i++){
  //        var time = moment(timeArray[i]).format('HH:mm');
  //        displayPrayer.push(`${Object.keys(PRAYER)[i]}: ${time}`);
  //      }

  //    that.setState({
  //      prayer: displayPrayer
  //    })
  //  }
  //   })

  // }

  render() {

    console.log('PRAYER: ')
     return (
       <div >
          <span className="betaFont smallFont">{this.props.prayer[0]} &nbsp; {this.props.prayer[1]} &nbsp; {this.props.prayer[2]} &nbsp; {this.props.prayer[3]} &nbsp; {this.props.prayer[4]} &nbsp; {this.props.prayer[5]} &nbsp; {this.props.prayer[6]}</span>
       </div>
     )

  }

}
