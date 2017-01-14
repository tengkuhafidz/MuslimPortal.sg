import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react'

const request = require('request');
const moment = require('moment');

export default class HijrahPrayer extends React.Component{
  constructor() {
    super();

    this.state = {
      hijrah: '',
      prayer: ''
    }
  }

  componentDidMount() {
    this.getHijrahDate();
    this.getPrayerTime();
  }

  getHijrahDate() {

    that = this
    HTTP.call('GET', 'https://raw.githubusercontent.com/ruqqq/prayertimes-database/master/hijri/2017/SG-1.json', {}, function( error, response ) {

   if (error) {
     console.log(error);
   } else {

     const HIJRI_MONTHS = {
       'Muharram': 1,
       'Safar': 2,
       'Rabiulawal': 3,
       'Rabiulakhir': 4,
       'Jamadilawal': 5,
       'Jamadilakhir': 6,
       'Rejab': 7,
       'Syaaban': 8,
       'Ramadhan': 9,
       'Syawal': 10,
       'Zulkaedah': 11,
       'Zulhijjah': 12,
     };

       var currDate = moment().date();
       var currMonth = moment().month();

      data = JSON.parse(response.content)
      // keys = Object.keys(data)

      //get current month, day, year (hijri)
      var currHijriMonth = data[0][currDate-1].hijriMonth;
      var hijriMonthName = Object.keys(HIJRI_MONTHS)[currHijriMonth-1];

      var hijriDate = data[0][currDate-1].hijriDate;
      var hijriYear = data[0][currDate-1].hijriYear;

      var hDate = `Today is ${hijriDate}, ${hijriMonthName} ${hijriYear}`;

     that.setState({
       hijrah: hDate
     })
   }
    })

  }

  getPrayerTime() {
    that = this
    HTTP.call('GET', 'https://raw.githubusercontent.com/ruqqq/prayertimes-database/master/data/SG/1/2017.json', {}, function( error, response ) {

   if (error) {
     console.log(error);
   } else {

     const PRAYER = {
       'Subuh': 0,
       'Syuruk': 1,
       'Zuhur': 2,
       'Asar': 3,
       'Maghrib': 4,
       'Isyak': 5
     }

       var currDate = moment().date();
       var currMonth = moment().month();

       data = JSON.parse(response.content)
       var timeArray = data[currMonth][currDate-1].times;

       var displayPrayer = '';

       for (var i=0; i < 6; i++){
         var time = moment(timeArray[i]).format('HH:mm');
         displayPrayer += `${Object.keys(PRAYER)[i]}: ${time}`
       }

     that.setState({
       prayer: displayPrayer
     })
   }
    })

    // const PRAYER = {
    //   'Subuh': 0,
    //   'Syuruk': 1,
    //   'Zuhur': 2,
    //   'Asar': 3,
    //   'Maghrib': 4,
    //   'Isyak': 5
    // }
    // request({
    //   url: `https://raw.githubusercontent.com/ruqqq/prayertimes-database/master/data/SG/1/2017.json`,
    //   json: true
    // }, (error, response, body) => {
    //
    //   if (!error && response.statusCode === 200){
    //     var timeArray = body[currMonth][currDate-1].times;
    //
    //     for (var i=0; i < 6; i++){
    //       var time = moment(timeArray[i]).format('HH:mm');
    //       console.log(`${Object.keys(PRAYER)[i]}: ${time}`)
    //     }
    //
    //   } else {
    //     console.log('Error!');
    //   }
    // });
  }

  render() {

   return (
     <div>
       {/* <h1>{this.state.hijrah}</h1> */}
       <h1>{this.state.prayer}</h1>
     </div>
   )

  }

}
