import React from 'react';
import {Meteor} from 'meteor/meteor';

const MainNav = React.createClass({
  componentDidMount: function(){
    $('.dropdown-button').dropdown({
      hover: true, // Activate on hover
      belowOrigin: true // Displays dropdown below the button
    });

    $('.button-collapse').sideNav({
      menuWidth: 240, // Default is 240
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });
  },

  handleLogout: function(){
    if(confirm("Are you sure you want to logout?")){
      Meteor.logout(function(){
        FlowRouter.go("home")
      })
    }
  },
  render(){
    console.log(Meteor.user())
    return(
      <div className="navbar-fixed">
      <nav className="blue darken-2">
        <div className="nav-wrapper gradient-navbar container">
          <a href={FlowRouter.path("index")} className="brand-logo">GoMosque Events</a>
        </div>
      </nav>
      </div>
    )
  }
});

export default MainNav;
