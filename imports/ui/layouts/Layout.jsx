import React from 'react';

import LogoutBtn from '../components/LogoutBtn.jsx'
import EventsWidget from '../Home/EventsWidget.jsx'
import QuotesWidget from '../Home/QuotesWidget.jsx'
import AnnouncementWidget from '../Widgets/AnnouncementWidget.jsx'

import HijrahWidget from '../pages/HijrahWidget.jsx'
import PrayerTimesWidget from '../pages/PrayerTimesWidget.jsx'

import AdminWidget from '../pages/AdminWidget.jsx';

//events
import EventAll from '../NUSEvents/EventAll.jsx'

export default class Layout extends React.Component {

    constructor() {
        super();

        this.state = {
            accessToken: '',
            play: true,
            hijrah: '',
            prayer: '',
            event: '',
            eventToday: '',
            currentPrayer: '',
            fasting: ''
        }
    }

    getAccessToken() {
        const url = 'https://graph.facebook.com/v2.8/oauth/access_token?grant_type=fb_exchange_token&client_id=1855990044615179&client_secret=37d5e38b8a80fc243ece45b575ef72ce&fb_exchange_token=EAAaYA1tQ4gsBAO5ZCJiYFEmADblMZAjFtzOojVXxkZAh10UQyDpZBQLeHF2WU3ksf0nXaYLjEdcaBLMtrJ3QZA8S7Rnkgsk4hieDNcYnHnodYFcBZCZCNJhErXjDRq8vZBqsbTokZCv8W8fnX1l7Vz7CKo5ZBDXSM8ZB9ex2dqWY2YcJQZDZD';
        that = this;
        HTTP.call('GET', url, {}, function(error, response) {

            if (error) {
                console.log(error);
            } else {

                data = JSON.parse(response.content)

                var access_token = data.access_token;
                // return access_token;
                console.log('IM GETTING THERE: ', access_token);
                var workingAccessToken = 'EAAaYA1tQ4gsBAI1RwZCO7cXHEvhE6HpowidmesemCrUL0YqflEvJ878NZCNBTT4JuFD5EbeNS3JPP6ygZAPqU2g7HegelZB7ZCJOxMDzQgShBgWkeXpWYP0nYhFlOLmv0eRSRMs97d1x3b3eKu05M9a5KhnrOpFYZD';

                if (access_token === workingAccessToken)
                    console.log("THEY MATCH!");
                else {
                    console.log("THEY DO NOT MATCH!")
                }

                that.setState({accessToken: access_token})
            }
        })
    }

    componentDidMount() {
        this.getAccessToken();
        this.getHijrahDate();
        this.getPrayerTime();
        this.getAllEvents();

        $('.materialboxed').materialbox();

        // $.getScript( "https://cdn.onesignal.com/sdks/OneSignalSDK.js" )
        var OneSignal = window.OneSignal || [];
        OneSignal.push([
            "init", {
                appId: "3ba1c92b-4e88-49cf-ac32-daf8996231aa",
                autoRegister: true,
                notifyButton: {
                    enable: false/* Set to false to hide */
                }
            }
        ]);

    }

    getHijrahDate() {

        that = this
        HTTP.call('GET', 'https://raw.githubusercontent.com/ruqqq/prayertimes-database/master/hijri/2017/SG-1.json', {}, function(error, response) {

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
                    'Zulhijjah': 12
                };

                var currDate = moment().date();
                var currMonth = moment().month();

                data = JSON.parse(response.content)

                //get current month, day, year (hijri)
                var currHijriMonth = data[0][currDate - 1].hijriMonth;
                var hijriMonthName = Object.keys(HIJRI_MONTHS)[currHijriMonth - 1];

                var hijriDate = data[0][currDate - 1].hijriDate;
                var hijriYear = data[0][currDate - 1].hijriYear;

                /* list can be expand */
                const sunnahToFastDate = [13, 14, 15];
                const sunnahToFastDay = [1, 4];

                if (hijriMonthName !== 'Ramadhan') {
                    var today = moment().weekday() + 1; //returns 1 (Monday), 2 (Tuesday)...

                    if (sunnahToFastDate.includes(hijriDate + 1) || sunnahToFastDay.includes(today)) { // TOMORROW
                        that.setState({fasting: 'tomorrow'})

                    } else if (sunnahToFastDate.includes(hijriDate) || sunnahToFastDay.includes(today - 1)) { //TODAY
                        that.setState({fasting: 'today'})
                    }
                }

                var hDate = `${hijriDate} ${hijriMonthName} ${hijriYear}`;

                that.setState({hijrah: hDate})
            }
        })
    }

    getAllEvents() {
        that = this

        var displayEvents = [];
        var todayEvents = [];

        eventPages = [
            'nusms',
            'PBUH.TheLightofLife.1438H',
            'nusms.ias',
            'projectlink2017',
            'valour2016',
            'rihlah1438H',
            'nusprojectasa',
            'freshmencamp',
            'BrothersOfNUS',
            'nusnisaa',
            'voksnus'
        ]

        for (var i = 0; i < eventPages.length; i++) {

            currUnixTime = moment().unix();
            endUnixTime = moment().add(6, 'days').endOf('day').unix();

            var access_token = 'EAAaYA1tQ4gsBAPm9El3XXLE2ZCZBhLwz9y3yryWgLR3EjTNdepTjkercZBeUigEUgfD1P1p2h4ySvZAgjJuNYr3wYiMJ8CAd7KYJMPVtNFGtcfOYZBiOW8nO7e2s4LSp3tkp3zJDWgUOb7KLMB2hQbQiNDeSWWb4fdXWvDYZBUoAZDZD';
            const url = `https://graph.facebook.com/${eventPages[i]}/events?fields=name,end_time,start_time&since=${currUnixTime}&until=${endUnixTime}&&access_token=${access_token}`;

            HTTP.call('GET', url, {}, function(error, response) {

                if (error) {
                    console.log(error);
                } else {
                    data = JSON.parse(response.content);

                    var event = data.data; //returns an array of 25 event objects

                    for (var i = 0; i < event.length; i++) {
                        displayEvents.push(event[i]);
                        if (moment().isSame(event[i].start_time, 'day'))
                            todayEvents.push(event[i]);
                        }

                    //sort by start_time
                    displayEvents.sort(function(left, right) {
                        return moment.utc(left.start_time).diff(moment.utc(right.start_time))
                    });

                    that.setState({event: displayEvents, eventToday: todayEvents})
                    return displayEvents;

                }
            })
        }
    }

    getPrayerTime() {
        that = this
        HTTP.call('GET', 'https://raw.githubusercontent.com/ruqqq/prayertimes-database/master/data/SG/1/2017.json', {}, function(error, response) {

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
                var timeArray = data[currMonth][currDate - 1].times;

                var displayPrayer = [];
                var currTime = new Date;
                console.log('currTime', currTime);
                var currPayer;

                for (var i = 0; i < 6; i++) {
                    var time = moment(timeArray[i]).format('HH:mm');
                    console.log('prayer time', i, moment(timeArray[i]).isBefore())

                    if (moment(timeArray[i]).isBefore(currTime))
                        currPayer = i;

                    displayPrayer.push(`${Object.keys(PRAYER)[i]}: ${time}`);
                }

                that.setState({prayer: displayPrayer, currentPrayer: currPayer})
            }
        })
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

        var events = this.state.event;
        var todayEvents = this.state.eventToday;

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
                    <PrayerTimesWidget prayer={this.state.prayer} currentPrayer={this.state.currentPrayer}/>
                </div>

                <div className="topAnnouncement center">
                    <AnnouncementWidget events={this.state.eventToday}/>
                </div>

                <div className="topRight">
                    <HijrahWidget hijrah={this.state.hijrah} fast={this.state.fasting}/> {/* <HijrahWidget hijrah={this.state.event[0]} /> */}
                    {/* <EventAll event={events}/> */}
                </div>

                <div className="contentDiv container mainContent">
                    {this.props.content()}
                </div>
                <a href="/musollaView" className="bottomLeft formalFont white-text mainLink">
                    <i className="material-icons iconAlign">location_on</i>NUS Musolla</a>
                {/*<img className="materialboxed bottomRight" width="50" src="coe.jpg"  data-caption="Calendar of Events for AY 2016/2017" /> */}

                <div className="bottomMiddle">
                    <QuotesWidget/>
                </div>

                <div className="middleLeft formalFont white-text mainLink">
                  {
                    Meteor.userId() ?
                    <AdminWidget /> : ''
                  }
                </div>

                <div className="bottomRight">
                    <EventsWidget events={events} todayEvents={todayEvents}/>
                </div>

            </div>
        )
    }
}
