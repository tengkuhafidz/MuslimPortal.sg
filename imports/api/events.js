import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

const moment = require('moment');

export const Events = new Mongo.Collection('events');

if (Meteor.isServer) {

  var getAllEvents = () => {
    Events.remove({}); //RE-Populate

    currStrtotime = moment().format('YYYY-MM-DD');
    endUnixTime = moment().add(6, 'days').endOf('day').unix();

    const access_token = 'EAAaYA1tQ4gsBAPm9El3XXLE2ZCZBhLwz9y3yryWgLR3EjTNdepTjkercZBeUigEUgfD1P1p2h4ySvZAgjJuNYr3wYiMJ8CAd7KYJMPVtNFGtcfOYZBiOW8nO7e2s4LSp3tkp3zJDWgUOb7KLMB2hQbQiNDeSWWb4fdXWvDYZBUoAZDZD';

    //try using foreach to loop these
    eventPages = [
        'nusms',
        'PBUH.TheLightofLife.1438H',
        'nusms.ias',
        'projectlink2017',
        'valour2017',
        'rihlah1438H',
        'nusprojectasa',
        'freshmencamp',
        'BrothersOfNUS',
        'voksnus',
        'noteaminI',
    ]

    eventPages.forEach((eachPage) => {
      //move all codes to here
      var url = `https://graph.facebook.com/${eachPage}/events?fields=name,end_time,start_time&&access_token=${access_token}`;

      var response = HTTP.get(url, {});

      data = JSON.parse(response.content);
      var event = data.data;

      //empty them up for different page
      var displayEvents = [];
      var todayEvents = [];

      /* LOOP each event in array */
      for (var j = 0; j < event.length; j++) {

          if ((event[j].end_time) && (moment().isBefore(event[j].end_time))) {
              event[j].by = eachPage;
              // displayEvents.push(event[j]);
              if (moment().isSame(event[j].start_time, 'day')){
                //set a new column named 'today'
                event[j].today = true;
                // console.log('event j today:', event[j])
                // todayEvents.push(event[j]);

              }
              //add here
              event[j].createdAt = moment().format();
              Events.insert(event[j]);

            }
      }

      // displayEvents.forEach((event) => {
      //   Events.insert(event);
      // });
      //
      // todayEvents.forEach((event) => {
      //   Events.insert(event);
      // });

    })

  }


    Meteor.publish('allEvents', function eventsPublication() {

      return Events.find({}, {sort: { start_time: 1 } });

    });

    SyncedCron.add({
      name: 'update events collection',
      schedule: function(parser) {
        // parser is a later.parse object
        return parser.text('every 1 hour');
      },
      job: function(intendedAt) {
        getAllEvents();
        console.log('event col updated @: ', intendedAt)
      }
  });

  Meteor.startup(function () {
    // code to run on server at startup
    getAllEvents();
    SyncedCron.start();
    // Stop jobs after 15 seconds
    //Meteor.setTimeout(function() { SyncedCron.stop(); }, 15 * 1000);
  });

}


Meteor.methods({

  addEvent(name, dateStart, dateEnd, url){

    Events.insert({
      name,
      dateStart,
      dateEnd,
      url
    });
  },

  addEvents(name, dateStart, timeStart, dateEnd, timeEnd) {

    //dateStart
    properDateStart = dateStart;
    properDateStartFormat = dateStart.split("-");
    finalisedStart = properDateStartFormat[2] + "-" + properDateStartFormat[1] + "-" + properDateStartFormat[0] + "T" + timeStart + ":00"

    dateStart = new Date(finalisedStart)
    dateStart.setHours(dateStart.getHours() - 8)

    dateStart = dateStart.toISOString();

    //dateEnd
    properDateEnd = dateEnd;
    properFormat = dateEnd.split("-");
    finalised = properFormat[2] + "-" + properFormat[1] + "-" + properFormat[0] + "T" + timeEnd + ":00"

    dateEnd = new Date(finalised)
    dateEnd.setHours(dateEnd.getHours() - 8)

    dateEnd = dateEnd.toISOString();
    if (!tags)
      tags = ""
    else
      tags = tags.split(',');


    if(!name || !dateStart || !timeStart || !dateEnd || !timeEnd)
      throw new Meteor.Error('Some input fields are not filled in.');
    else if (dateEnd < dateStart)
      throw new Meteor.Error('Please End Date cannot be earlier than Start Date');

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Events.insert({
      name,
      dateStart,
      dateEnd,
      createdAt: new Date(), // current time
      adminId: Meteor.userId(),           // _id of logged in user
      mosqueName: Meteor.user().profile.name  // username of logged in user
    });
  },

  updateEvents(eventId, name, eventType, description, speaker, dateStart, timeStart, dateEnd, timeEnd, venue, address, direction, fee, tags) {
  //dateStart
  properDateStart = dateStart;
  properDateStartFormat = dateStart.split("-");
  finalisedStart = properDateStartFormat[2] + "-" + properDateStartFormat[1] + "-" + properDateStartFormat[0] + "T" + timeStart + ":00"

  dateStart = new Date(finalisedStart)
  dateStart.setHours(dateStart.getHours() - 8)

  dateStart = dateStart.toISOString();

  //dateEnd
  properDateEnd = dateEnd;
  properFormat = dateEnd.split("-");
  finalised = properFormat[2] + "-" + properFormat[1] + "-" + properFormat[0] + "T" + timeEnd + ":00"

  dateEnd = new Date(finalised)
  dateEnd.setHours(dateEnd.getHours() - 8)

  dateEnd = dateEnd.toISOString();

  console.log("UPDATE START/END " + dateStart + "   "  + dateEnd)
  if (!tags)
    tags = ""
  else
    tags = tags.split(',');

  if (speaker !== "")
    speaker = speaker.split(',');

  if(!name || !eventType || !description || !dateStart || !timeStart || !dateEnd || !timeEnd || !venue || !address)
    throw new Meteor.Error('Some input fields are not filled in.');
  else if (dateEnd < dateStart)
    throw new Meteor.Error('Please End Date cannot be earlier than Start Date');

    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Events.update({_id: eventId}, {
      $set: {
        name,
        eventType,
        description,
       speaker,
       dateStart,
       dateEnd,
       venue,
       address,
       direction,
       fee,
       tags,
       adminId: Meteor.userId(),
       updatedAt: new Date(), // current time
      }
    });

  },
  removeEvent(eventId){
    Events.remove(eventId)
  },
  eventImageUpload(eventId, imageUrl, uuid){
    //events id,
    Events.update({_id: eventId}, {
      $set: {
        imageUrl,
        uuid
      }
    })
  }
});
