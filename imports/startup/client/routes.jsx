import React from 'react';
import {mount} from 'react-mounter';
import {FlowRouter} from 'meteor/kadira:flow-router-ssr';

import Layout from '/imports/ui/layouts/Layout.jsx';
import Home from '/imports/ui/pages/Home.jsx';

import EventDetails from '/imports/ui/pages/EventDetails.jsx';
import EventsView from '/imports/ui/pages/EventsView.jsx';
import EventForm from '/imports/ui/pages/EventForm.jsx';

import MosqueEventForm from '/imports/ui/pages/MosqueEventForm.jsx';
import MosqueLogin from '/imports/ui/pages/MosqueLogin.jsx';
import MosqueRegister from '/imports/ui/pages/MosqueRegister.jsx';

import MosqueEventUpdate from '/imports/ui/pages/MosqueEventUpdate.jsx';
import MusollaView from '/imports/ui/pages/MusollaView.jsx';

import MusollaDetails from '/imports/ui/pages/MusollaDetails.jsx';

//home
FlowRouter.route('/', {
  action: function(){
    mount(Layout, {
      content: () => <Home />
  })
},
name: "home"
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

FlowRouter.route('/mosqueEventForm', {
  action: function() {
    mount(Layout, {
      content: () => <MosqueEventForm />,
  });
},
name: "mosqueEventForm"
});

FlowRouter.route('/eventForm', {
  action: function() {
    mount(Layout, {
      content: () => <EventForm />,
  });
},
name: "eventForm"
});

FlowRouter.route('/MosqueEventUpdate/:eventId', {
  action: function(params) {
    mount(Layout, {
      content: () => <MosqueEventUpdate  eventId={params.eventId}/>,
  });
},

name: "mosqueEventUpdate"
});

//admin account
FlowRouter.route('/administratorRegister_1324', {
  action: function() {
    mount(Layout, {
      content: () => <MosqueRegister />,
  });
},
name: "mosqueRegister"
});

FlowRouter.route('/administratorLogin', {
  action: function() {
    mount(Layout, {
      content: () => <MosqueLogin />,
  });
},
name: "mosqueLogin"
});


FlowRouter.route('/mosqueEventDetails/:eventId', {
  action: function(params) {
    mount(Layout, {
      content: () => <MosqueEventDetails eventId={params.eventId}/>,
  });
},
name: "mosqueEventDetails"
});