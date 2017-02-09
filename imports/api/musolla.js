import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Musolla = new Ground.Collection('musolla');

if (Meteor.isServer) {
  Meteor.publish('allMusolla', function musollaPublication() {
    return Musolla.find({}); //db.events.find({}, {name: 1, dateStart: 1, timeStart: 1}).sort({dateStart: -1})
  });

}

Meteor.methods({

});
