import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// initialise a collection here. mongo collection name should be the file name.
export const PrayerTimes = new Mongo.Collection('prayertimes');

if (Meteor.isServer) {
  var getPrayerTimes = () => {
    PrayerTimes.remove({});

    const url = 'https://raw.githubusercontent.com/ruqqq/prayertimes-database/master/data/SG/1/2018.json';
    response = HTTP.get(url, {});
    var data = JSON.parse(response.content);

    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[i].length; j++) {
        PrayerTimes.insert(data[i][j]);
      }
    }
  }

  //declare all publish relating to the collection here
  //EXAMPLE: Tasks.find({}, { sort: { createdAt: -1 } });
  Meteor.publish('allPrayerTimes', function prayerTimesPublication() {
    return PrayerTimes.find({});
  });

  SyncedCron.add({
    name: 'update prayer times collection',
    schedule: function(parser) {
      // parser is a later.parse object
      return parser.text('every 1 day');
    },
    job: function(intendedAt) {
      getPrayerTimes();
      console.log('prayer times updated @: ', intendedAt)
    }
  });

  Meteor.startup(function () {
    // code to run on server at startup
    getPrayerTimes();

    // Stop jobs after 15 seconds
    //Meteor.setTimeout(function() { SyncedCron.stop(); }, 15 * 1000);
  });

}

Meteor.methods({
});
