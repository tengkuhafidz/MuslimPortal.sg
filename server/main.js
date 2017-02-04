import { Meteor } from 'meteor/meteor';
//import all collections from api here
import '../imports/api/events.js';
import '../imports/api/musolla.js';
import '../imports/api/challenges.js';
import '../imports/api/posts.js';


Meteor.startup(() => {
  // code to run on server at startup
  SyncedCron.start();
});
