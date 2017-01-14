import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react'

const request = require('request');
const moment = require('moment');

export default class HijrahPrayer extends React.Component{
  constructor() {
    super();

    this.state = {
      hijrah: ''
    }
  }

  componentWillMount() {

  }

  render() {
    that = this

    HTTP.call( 'GET', 'https://raw.githubusercontent.com/ruqqq/prayertimes-database/master/hijri/2017/SG-1.json', {}, function( error, response ) {

   if (error) {
     console.log(error);
   } else {

     const HIJRI_MONTHS = {
       'Muharram': 1,
       'Safar': 2,
       'Rabiul-awwal': 3,
       'Rabiul-akhir': 4,
       'Jamadil-awwal': 5,
       'Jamadil-akhir': 6,
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

    var hDate = `${hijriDate} ${hijriMonthName} ${hijriYear}`;

     that.setState({
       hijrah: hDate
     })

   }
 })

 return (
   <div>
     <span>{this.state.hijrah}</span>
   </div>
 )

  }

}
