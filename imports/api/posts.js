import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

const moment = require('moment');

export const Posts = new Mongo.Collection('posts');

if (Meteor.isServer) {

  var getAllFeeds = () => {
    Posts.remove({}); //RE-Populate
    eventPages = Meteor.call('getAllPages');
    //fb../nusms
    var singaporeFullTZ = moment.tz(new Date, "Asia/Brunei"); //date in Asia/Brunei full TZ format
    var yesterday = singaporeFullTZ.add(-1, 'days').startOf('day').unix();

    const access_token = 'EAAaYA1tQ4gsBAPm9El3XXLE2ZCZBhLwz9y3yryWgLR3EjTNdepTjkercZBeUigEUgfD1P1p2h4ySvZAgjJuNYr3wYiMJ8CAd7KYJMPVtNFGtcfOYZBiOW8nO7e2s4LSp3tkp3zJDWgUOb7KLMB2hQbQiNDeSWWb4fdXWvDYZBUoAZDZD';

    for (var key in eventPages){
      displayPosts = []; //empty up for each new page
      var url = `https://graph.facebook.com/${eventPages[key]}/feed?since=${yesterday}&access_token=${access_token}`;

      var response = HTTP.get(url, {});
      data = JSON.parse(response.content);
      var event = data.data;
      for (var j = 0; j < event.length; j++) {
        // Posts.insert(event[j]);
        displayPosts.push(event[j])

      }

      tempData = {by: eventPages[key], name: key, posts: displayPosts}
      Posts.insert(tempData);

    }

  }

    Meteor.publish('allPosts', function eventsPublication() {

      return Posts.find({}, {sort: { created_time: 1 } });

    });

    SyncedCron.add({
      name: 'update posts collection',
      schedule: function(parser) {
        // parser is a later.parse object
        return parser.text('every 1 hour');
      },
      job: function(intendedAt) {
        getAllFeeds();
        console.log('posts col updated @: ', intendedAt)
      }
  });

  Meteor.startup(function () {
    // code to run on server at startup
    getAllFeeds();
    // SyncedCron.start();
  });

}

Meteor.methods({

});
