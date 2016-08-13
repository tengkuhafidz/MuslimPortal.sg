import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// initialise a collection here. mongo collection name should be the file name.
export const Users = new Mongo.Collection('users');

if (Meteor.isServer) {

  	Meteor.publish("allUsers", function () {
    	return Meteor.users.find({});
	});

}
