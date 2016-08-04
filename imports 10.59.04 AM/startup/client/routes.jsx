import React from 'react';
import {mount} from 'react-mounter';
import {FlowRouter} from 'meteor/kadira:flow-router-ssr';

import Layout from '/imports/ui/layouts/Layout.jsx';
import MainLayout from '/imports/ui/layouts/MainLayout.jsx';
import MosqueLayout from '/imports/ui/layouts/MosqueLayout.jsx';
import MosqueMainLayout from '/imports/ui/layouts/MosqueMainLayout.jsx';

import Register from '/imports/ui/pages/Register.jsx';
import Login from '/imports/ui/pages/Login.jsx';
import Home from '/imports/ui/pages/Home.jsx';
import Dashboard from '/imports/ui/pages/Dashboard.jsx';

import EventDetails from '/imports/ui/pages/EventDetails.jsx';
import EventsView from '/imports/ui/pages/EventsView.jsx';
import History from '/imports/ui/pages/History.jsx';
import MosqueDashboard from '/imports/ui/pages/MosqueDashboard.jsx';
import MosqueEventForm from '/imports/ui/pages/MosqueEventForm.jsx';
import MosqueEventDetails from '/imports/ui/pages/MosqueEventDetails.jsx';
import MosqueLogin from '/imports/ui/pages/MosqueLogin.jsx';
import MosqueRegister from '/imports/ui/pages/MosqueRegister.jsx';
import MosqueHistory from '/imports/ui/pages/MosqueHistory.jsx';
import MosqueEventUpdate from '/imports/ui/pages/MosqueEventUpdate.jsx';

function isAuthenticated(context, redirect){
  if(!Meteor.userId()){
    Session.set("back", context.path)
    redirect("eventsView")
  }
}

function becauseAuthenticated(context, redirect){
  if(Meteor.userId()){
    redirect("eventsView");
  }
}

// FlowRouter.triggers.enter([isAuthenticated], {except: ["home", "login", "register", "mosqueLogin", "mosqueRegister"]});
// FlowRouter.triggers.enter([becauseAuthenticated], {only: ["home", "login", "register", "mosqueLogin", "mosqueRegister"]})

FlowRouter.route('/', {
  action: function(){
    mount(Layout, {
      content: () => <EventsView />
  })
},
name: "eventsView"
});

FlowRouter.route('/register', {
  action: function() {
    mount(Layout, {
      content: () => <Register />,
  });
},
name: "register"
});

FlowRouter.route('/login', {
  action: function() {
    mount(Layout, {
      content: () => <Login />,
  });
},
name: "login"
});

FlowRouter.route("/dashboard", {
  action: function(){
    mount(MainLayout, {
      content: () => <Dashboard />
  })
},
name: "dashboard"
});


//here
FlowRouter.route('/eventDetails/:eventId', {
  action: function(params) {
    mount(MainLayout, {
      content: () => <EventDetails eventId={params.eventId}/>,
  });
},
name: "eventDetails"
});

FlowRouter.route('/eventsView', {
  action: function() {
    mount(MainLayout, {
      content: () => <EventsView />,
  });
},
name: "eventsView"
});

FlowRouter.route('/history', {
  action: function() {
    mount(MainLayout, {
      content: () => <History />,
  });
},
name: "history"
});

FlowRouter.route('/mosqueDashboard', {
  action: function() {
    mount(MosqueMainLayout, {
      content: () => <MosqueDashboard />,
  });
},
name: "mosqueDashboard"
});

FlowRouter.route('/mosqueEventForm', {
  action: function() {
    mount(MosqueMainLayout, {
      content: () => <MosqueEventForm />,
  });
},
name: "mosqueEventForm"
});

FlowRouter.route('/MosqueEventUpdate/:eventId', {
  action: function(params) {
    mount(MosqueMainLayout, {
      content: () => <MosqueEventUpdate  eventId={params.eventId}/>,
  });
},

name: "mosqueEventForm"
});

FlowRouter.route('/mosqueEventDetails/:eventId', {
  action: function(params) {
    mount(MosqueMainLayout, {
      content: () => <MosqueEventDetails eventId={params.eventId}/>,
  });
},
name: "mosqueEventDetails"
});

FlowRouter.route('/mosqueHistory', {
  action: function() {
    mount(MosqueMainLayout, {
      content: () => <MosqueHistory />,
  });
},
name: "mosqueHistory"
});

FlowRouter.route('/mosqueLogin', {
  action: function() {
    mount(MosqueLayout, {
      content: () => <MosqueLogin />,
  });
},
name: "mosqueLogin"
});


FlowRouter.route('/mosqueRegister', {
  action: function() {
    mount(MosqueLayout, {
      content: () => <MosqueRegister />,
  });
},
name: "mosqueRegister"
});



//import layout
//EXAMPLE:
// import {MainLayout} from './layouts/MainLayout.jsx';

//import component the route should call
//EXAMPLE:
// import MainComponent from '../imports/ui/components/MainComponent.jsx';

//decalre flow routers
//EXAMPLE:
// FlowRouter.route('/', {
// 	action(){
// 		mount(MainLayout, {
// 			content: (<MainComponent />)
// 		})
// 	}
// });

//EXAMPLE of flow router with props
// FlowRouter.route('/resolution/:id', {
// 	action(params){
// 		mount(MainLayout, {
// 			content: (<ResolutionDetails id={params.id}/>)
// 		})
// 	}
// });
