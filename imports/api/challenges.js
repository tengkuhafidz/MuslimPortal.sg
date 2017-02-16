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
    if(!action || !dateStart || !dateEnd){
      throw new Meteor.Error('Some input fields are not filled in.');
    }
// Make sure the user is logged in before inserting a task
  if (! this.userId) {
    throw new Meteor.Error('not-authorized');
  }

    Challenges.insert({
      action,
      dateStart,
      dateEnd,
      createdBy: this.userId,
      createdAt: new Date(),
    });
  },
  joinChallenge(id){
    Challenges.update(
      {_id: id},
      { $inc: { "joined" : 1 } }
    )
  },
  deleteChallenge(challengeId){
    check(challengeId, String);
    Challenges.remove(challengeId);
  },
  updateChallenge(eventId, action, dateStart, dateEnd) {
    if(!action || !dateStart){
      throw new Meteor.Error('Some input fields are not filled in.');
    }
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Challenges.update({_id: eventId}, {
      $set: {
        action,
        dateStart,
        dateEnd,
      }
    });
},

});
