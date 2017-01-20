import React from 'react';
import {mount} from 'react-mounter';
import {FlowRouter} from 'meteor/kadira:flow-router-ssr';

import Layout from '/imports/ui/layouts/Layout.jsx';
import Home from '/imports/ui/pages/Home.jsx';
import BeBetter from '/imports/ui/pages/BeBetter.jsx';
import ChallengeForm from '/imports/ui/pages/ChallengeForm.jsx';
import ChallengesUpdate from '/imports/ui/pages/ChallengesUpdate.jsx';

import EventDetails from '/imports/ui/pages/EventDetails.jsx';
import EventsView from '/imports/ui/pages/EventsView.jsx';
import EventForm from '/imports/ui/pages/EventForm.jsx';

import Login from '/imports/ui/pages/Login.jsx';
import Register from '/imports/ui/pages/Register.jsx';

import MusollaView from '/imports/ui/pages/MusollaView.jsx';
import ChallengesView from '/imports/ui/pages/ChallengesView.jsx';

import MusollaDetails from '/imports/ui/pages/MusollaDetails.jsx';

function isAuthenticated(context, redirect){
  if(!Meteor.userId()){
    Session.set("back", context.path)
    redirect("login")
  }
}

FlowRouter.triggers.enter([isAuthenticated], {only: ["challengeForm"]});

//home
FlowRouter.route('/', {
  action: function(){
    mount(Layout, {
      content: () => <Home />
  })
},
name: "home"
});

//home
FlowRouter.route('/beBetter', {
  action: function(){
    mount(Layout, {
      content: () => <BeBetter />
  })
},
name: "beBetter"
});

FlowRouter.route('/challengeForm', {
  action: function(){
    mount(Layout, {
      content: () => <ChallengeForm />
  })
},
name: "challengeForm"
});

//musolla
FlowRouter.route('/musollaView', {
  action: function(){
    mount(Layout, {
      content: () => <MusollaView />
  })
},
name: "musollaView"
});

FlowRouter.route('/musollaDetails/:musollaId', {
  action: function(params) {
    mount(Layout, {
      content: () => <MusollaDetails musollaId={params.musollaId}/>,
  });
},
name: "musollaDetails"
});

//events
FlowRouter.route('/eventDetails/:eventId', {
  action: function(params) {
    mount(Layout, {
      content: () => <EventDetails eventId={params.eventId}/>,
  });
},
name: "eventDetails"
});

FlowRouter.route('/eventsView', {
  action: function() {
    mount(Layout, {
      content: () => <EventsView />,
  });
},
name: "eventsView"
});

FlowRouter.route('/eventForm', {
  action: function() {
    mount(Layout, {
      content: () => <EventForm />,
  });
},
name: "eventForm"
});

//admin account
FlowRouter.route('/administratorRegister_1324', {
  action: function() {
    mount(Layout, {
      content: () => <Register />,
  });
},
name: "register"
});

FlowRouter.route('/adminLogin', {
  action: function() {
    mount(Layout, {
      content: () => <Login />,
  });
},
name: "login"
});

//challenge
FlowRouter.route('/challengesView', {
  action: function(){
    mount(Layout, {
      content: () => <ChallengesView />
  })
},
name: "challengesView"
});

FlowRouter.route('/challengesUpdate/:challengeId', {
  action: function(params) {
    mount(Layout, {
      content: () => <ChallengesUpdate challengeId={params.challengeId}/>,
  });
},
name: "challengesUpdate"
});
