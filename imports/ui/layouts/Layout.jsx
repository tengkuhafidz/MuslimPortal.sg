import React from 'react';

import LogoutBtn from '../components/LogoutBtn.jsx'
import EventsWidget from '../Home/EventsWidget.jsx'
import QuotesWidget from '../Home/QuotesWidget.jsx'


import HijrahWidget from '../pages/HijrahWidget.jsx'
import PrayerTimesWidget from '../pages/PrayerTimesWidget.jsx'


export default class Layout extends React.Component{

    constructor() {
    super();

    this.state = {
      play: true,
      hijrah: '',
      prayer: ''
    }
  }

  componentDidMount() {
    this.getHijrahDate();
    this.getPrayerTime();

    $('.materialboxed').materialbox();

       // $.getScript( "https://cdn.onesignal.com/sdks/OneSignalSDK.js" )
        var OneSignal = window.OneSignal || [];
        OneSignal.push(["init", {
          appId: "3ba1c92b-4e88-49cf-ac32-daf8996231aa",
          autoRegister: true,
          notifyButton: {
            enable: false /* Set to false to hide */
          }
        }]);

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

      var hDate = `${hijriDate} ${hijriMonthName} ${hijriYear}`;

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

       var displayPrayer = [];

       for (var i=0; i < 6; i++){
         var time = moment(timeArray[i]).format('HH:mm');
         displayPrayer.push(`${Object.keys(PRAYER)[i]}: ${time}`);
       }

     that.setState({
       prayer: displayPrayer
     })
   }
    })

  }

  handleSongEnd(){

  }

  handleClick(e){

    e.preventDefault();

    if (this.state.play)
      document.getElementById('audio').play()
    else 
      document.getElementById('audio').pause()
    this.setState({play: !this.state.play})

  }

    render(){


        audioBtn = this.state.play? <a className="material-icons iconAlign white-text large brand" onClick={this.handleClick.bind(this)}>volume_mute</a> : <a className="material-icons iconAlign white-text large brand" onClick={this.handleClick.bind(this)}>volume_up</a>  


        return(
         <div className="white-text">
           <link rel="manifest" href="/manifest.json" />
           
            <div className="topLeft">
              <audio id="audio" loop>
                  <source src="dzikr_mix.mp3" type="audio/mpeg" />
              </audio>
                <a href="/" className=" white-text brand">MyNUSMS <span className="betaFont smallFont">Beta</span></a>

                  &nbsp; {audioBtn}

                <p className="smallerFont betaFont noTopGap halfSee white-text">Tech by MSociety</p>
              
            </div>
              

              <div className="topMiddle center">
                <PrayerTimesWidget prayer={this.state.prayer}  />
              </div>

              <div className="topRight">
                <HijrahWidget hijrah={this.state.hijrah} />
              </div>



            <div className="contentDiv container">
              {this.props.content()}
            </div>
            <a href="/musollaView" className="bottomLeft formalFont white-text mainLink"><i className="material-icons iconAlign">location_on</i>NUS Musolla</a>
            {/*<img className="materialboxed bottomRight" width="50" src="coe.jpg"  data-caption="Calendar of Events for AY 2016/2017" /> */}

            <div className="bottomMiddle">
              <QuotesWidget />
            </div>

            <div className="bottomRight">
              <EventsWidget />
            </div>

        </div>
        )
  }

}
