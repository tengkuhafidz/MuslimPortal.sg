import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react'

import {Events} from '../../api/events.js'
import {Posts} from '../../api/posts.js';
import {PrayerTimes} from '../../api/prayertimes.js';
import {Hijris} from '../../api/hijris.js';

/* import Widgets... */
import EventsWidget from '../Widgets/EventsWidget.jsx'
import PagesWidget from '../Widgets/PagesWidget.jsx'
import QuotesWidget from '../Widgets/QuotesWidget.jsx'
import AnnouncementWidget from '../Widgets/AnnouncementWidget.jsx'
import HijrahWidget from '../Widgets/HijrahWidget.jsx'
import PrayerTimesWidget from '../Widgets/PrayerTimesWidget.jsx'
import AdminWidget from '../Widgets/AdminWidget.jsx';
import ColorModeWidget from '../Widgets/ColorModeWidget.jsx';

import EventAll from '../NUSEvents/EventAll.jsx'
import LogoutBtn from '../components/LogoutBtn.jsx'

const moment = require('moment-timezone');

const PRAYER = {
  'Subuh': 0,
  'Syuruk': 1,
  'Zuhur': 2,
  'Asar': 3,
  'Maghrib': 4,
  'Isyak': 5
}

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
  'Zulhijjah': 12
};

export default class Layout extends TrackerReact(React.Component) {

    constructor() {
        super();
        Tracker.autorun(function(){
           Meteor.subscribe("allEvents");
           Meteor.subscribe("allPosts");
           Meteor.subscribe("allPrayerTimes");
           Meteor.subscribe("allHijris");
        });

        this.state = {
            accessToken: '',
            play: true,
            hijrah: '',
            fasting: '',
        }
    }
    componentDidMount() {
        // this.getDayDateMonth();

        $('.materialboxed').materialbox();

        this.refs.colorMode.setBgColor()


    }

    getDayDateMonth() {

      var singaporeFullTZ = moment.tz(new Date, "Asia/Brunei").format(); //date in Asia/Brunei full TZ format
      var fullDateSG = singaporeFullTZ.split('T')

      var today = moment(fullDateSG[0]).day(); //return weekdays e.g. Monday, 1 Tuesday, 2 ...
      var dateSG = (fullDateSG[0].split('-')[2][0] == 0) ? fullDateSG[0].split('-')[2][1] : fullDateSG[0].split('-')[2]; //return JUST the date e.g. 1, 12, 31 ...

      if (fullDateSG[0].split('-')[1][0] == 0){ //if first integer is 0
        currMonth = fullDateSG[0].split('-')[1][1]; //get ONLY the last integer
      } else {
        currMonth = fullDateSG[0].split('-')[1]; //10 onwards
      }
      return {dateSG, today, currMonth}
    }

    getHijrahDate() {
      var today = new Date();
      var query = {date: today.getDate(), month: today.getMonth() + 1, year: 2017};
      hijris = Hijris.find(query).fetch();
      if (hijris.length == 0) {
        return {
          hijrah: '',
          fasting: '',
        };
      }
      var hijri = hijris[0];

      //get current month, day, year (hijri)
      var currHijriMonth = hijri.hijriMonth;
      var hijriMonthName = Object.keys(HIJRI_MONTHS)[currHijriMonth - 1];

      var hijriDate = hijri.hijriDate;
      var hijriYear = hijri.hijriYear;

      /* list can be expand */
      const sunnahToFastDate = [13, 14, 15]; //date in Hijri
      const sunnahToFastDay = [1, 4]; //day of week 1 = Monday, 2 = Tues ...

      var tmr = ((sunnahToFastDate.indexOf(hijriDate + 1) !== -1) || (sunnahToFastDay.indexOf(today.getDay() + 1) !== -1));
      var today = ((sunnahToFastDate.indexOf(hijriDate) !== -1) || (sunnahToFastDay.indexOf(today.getDay()) !== -1));

      var fasting = '';

      if (hijriMonthName !== 'Ramadhan') {

        if (today && tmr)// TODAY
          var fasting = 'today & tomorrow';
        else if (tmr) // Tomorrow
          var fasting = 'tomorrow';
        else if (today) //both
          var fasting = 'today';
      }

      var hDate = `${hijriDate} ${hijriMonthName} ${hijriYear}`;

      return {
        hijrah: hDate,
        fasting: fasting,
      };
    }

    getAllEvents() {
      events = Events.find({}, {sort: { start_time: 1 } }).fetch();
      return events;
    }

    getAllPosts() {
      posts = Posts.find({}).fetch();
      return posts;
    }

    getTodayEvents() {
      events = Events.find({'today': {$exists: true}}).fetch();
      return events;
    }

    getPrayerTime() {
      var today = new Date();
      var query = {date: today.getDate(), month: today.getMonth() + 1, year: 2017};
      prayertimes = PrayerTimes.find(query).fetch();
      if (prayertimes.length == 0) {
        return {
            prayer: '',
            currentPrayer: ''
        }
      }

      var timeArray = prayertimes[0].times;
      var displayPrayer = [];
      var currTime = moment().tz("Asia/Brunei").format(); //raw time
      var currPrayer;

      for (var i = 0; i < 6; i++) {
        rawTime = moment(timeArray[i]).tz("Asia/Brunei").format();
        formattedTime = moment(timeArray[i]).tz("Asia/Brunei").format('HH:mm');
        if (moment(rawTime).isBefore(currTime))
            currPrayer = i;

        displayPrayer.push(`${Object.keys(PRAYER)[i]}: ${formattedTime}`);
      }

      return {
        prayer: displayPrayer,
        currentPrayer: currPrayer,
      };
    }

    getBgImage(){
        var totalCount = 39;
        var image = Math.ceil(Math.random() * totalCount);
        return image;
    }

    handleClick(e) {

        e.preventDefault();

        if (this.state.play)
            document.getElementById('audio').play()
        else
            document.getElementById('audio').pause()
        this.setState({
            play: !this.state.play
        })

    }

    render() {

        var events = this.getAllEvents(); //should be reactive cuz i'm using TrackerReact
        var todayEvents = this.getTodayEvents();
        var posts = this.getAllPosts();
        var prayer = this.getPrayerTime();
        var hijri = this.getHijrahDate();

        var image = this.getBgImage();

        audioBtn = this.state.play
            ? <a className="material-icons iconAlign white-text large brand" onClick={this.handleClick.bind(this)}>volume_mute</a>
            : <a className="material-icons iconAlign white-text large brand" onClick={this.handleClick.bind(this)}>volume_up</a>

        return (
            <div className="white-text">
                <link rel="manifest" href="/manifest.json"/>

                <div className="topLeft">
                    <audio id="audio" loop>
                        <source src="dzikr_mix2.mp3" type="audio/mpeg"/>
                    </audio>
                    <a href="/" className=" white-text brand">MyNUSMS
                        <span className="betaFont smallFont">Beta</span>
                    </a>

                    &nbsp; {audioBtn}
                    <div className="usefulLinks">
                        <a href="http://facebook.com/nusms" target="_blank" className="socialLink">
                            <i className="fa fa-facebook  " aria-hidden="true"></i>
                        </a>
                        <a href="http://instagram.com/nusms" target="_blank" className="socialLink">
                            <i className="fa fa-instagram " aria-hidden="true"></i>
                        </a>
                        <a href="http://twitter.com/nusms" target="_blank" className="socialLink">
                            <i className="fa fa-twitter  " aria-hidden="true"></i>
                        </a>
                        {/*<p className="smallerFont betaFont noTopGap halfSee white-text">Tech by MSociety</p> */}
                    </div>
                </div>

                <div className="topMiddle center">
                    <PrayerTimesWidget prayer={prayer.prayer} currentPrayer={prayer.currentPrayer}/>
                </div>

                <div className="topAnnouncement center">
                    <AnnouncementWidget events={events}/>
                </div>

                <div className="topRight">
                    <HijrahWidget hijrah={hijri.hijrah} fast={hijri.fasting}/> {/* <HijrahWidget hijrah={this.state.event[0]} /> */}
                    {/* <EventAll event={events}/> */}
                </div>

                <div className="contentDiv container mainContent">
                    {this.props.content()}
                </div>

                <div className="bottomLeft">
                    <PagesWidget posts={posts}/>
                </div>

                {/*<a href="/musollaView" className="bottomLeft formalFont white-text mainLink">
                    <i className="material-icons iconAlign">location_on</i>NUS Musolla
                </a>*/}

                {/*<img className="materialboxed bottomRight" width="50" src="coe.jpg"  data-caption="Calendar of Events for AY 2016/2017" /> */}

                <div className="bottomCenter">
                    <QuotesWidget/>
                </div>

                <div className="middleLeft formalFont white-text mainLink">
                    {Meteor.userId()
                        ? <AdminWidget/>
                        : ''
                    }
                </div>

                <div className="middleRight formalFont white-text mainLink">
                  <ColorModeWidget ref="colorMode" image={image}/>
                </div>

                <div className="bottomRight">
                   <EventsWidget events={events} todayEvents={todayEvents}/>
                </div>

            </div>
        )
    }
}
