import React from 'react';

const Nav = React.createClass({
  componentDidMount: function(){
    $('.button-collapse').sideNav({
      menuWidth: 240, // Default is 240
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });
  },
  render(){
    return(
      <div className="navbar-fixed">
      <nav className="blue darken-2">
        <div className="container">
          <div className="nav-wrapper gradient-navbar">
            <a href={FlowRouter.path("index")} className="brand-logo">GoMosque Events</a>
            <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
            <ul className="right hide-on-med-and-down">
              <li><a href={FlowRouter.path("login")}>Login</a></li>
              <li><a href={FlowRouter.path("register")}>Register</a></li>
            </ul>
            <ul className="side-nav" id="mobile-demo">
              <li><a href={FlowRouter.path("login")}>Login</a></li>
              <li><a href={FlowRouter.path("register")}>Register</a></li>
            </ul>
          </div>
        </div>
      </nav>
      </div>
    )
  }

});

export default Nav;
