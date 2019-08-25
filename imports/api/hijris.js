import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// initialise a collection here. mongo collection name should be the file name.
export const Hijris = new Mongo.Collection('hijris');

if (Meteor.isServer) {
  var getHijris = () => {
    Hijris.remove({});

    const url = `https://raw.githubusercontent.com/ruqqq/prayertimes-database/master/hijri/${new Date().getFullYear()}/SG-1.json`;
    response = HTTP.get(url, {});
    var data = JSON.parse(response.content);

    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[i].length; j++) {
        Hijris.insert(data[i][j]);
      }
    }
  }

  //declare all publish relating to the collection here
  //EXAMPLE: Tasks.find({}, { sort: { createdAt: -1 } });
  Meteor.publish('allHijris', function hijrisPublication() {
    return Hijris.find({});
  });

  SyncedCron.add({
    name: 'update hijris collection',
    schedule: function(parser) {
      // parser is a later.parse object
      return parser.text('every 1 day');
    },
    job: function(intendedAt) {
      getHijris();
      console.log('hijris updated @: ', intendedAt)
    }
  });

  Meteor.startup(function () {
    // code to run on server at startup
    getHijris();

    // Stop jobs after 15 seconds
    //Meteor.setTimeout(function() { SyncedCron.stop(); }, 15 * 1000);
  });

}

Meteor.methods({
});
