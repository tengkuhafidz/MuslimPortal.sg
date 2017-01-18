import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
//import { Future } from 'fibers/future';

//Future = Npm.require('fibers/future');
// initialise a collection here. mongo collection name should be the file name.
export const Challenges = new Mongo.Collection('challenges');

if (Meteor.isServer) {
  //declare all publish relating to the collection here
  //EXAMPLE: Tasks.find({}, { sort: { createdAt: -1 } });
  Meteor.publish('allChallenges', function challengesPublication() {
    return Challenges.find({}); //db.events.find({}, {name: 1, dateStart: 1, timeStart: 1}).sort({dateStart: -1})
  });

}

Meteor.methods({

  addChallenge(action, dateStart, dateEnd){

    Challenges.insert({
      action,
      dateStart,
      dateEnd
    });
  },
  joinChallenge(){
    Challenges.update(
      {dateEnd: {$gte: new Date().toISOString()}, dateStart: {$lte: new Date().toISOString()}},
      { $inc: { "joined" : 1 } }
    )
  }

});
