import React from 'react';
import {Session} from 'meteor/session'

const Login = React.createClass({
  getInitialState: function(){
    return {email: '', password: ''};
  },

  handleEmailChange: function(e){
    this.setState({email: e.target.value});
  },

  handlePasswordChange: function(e){
    this.setState({password: e.target.value});
  },

  handleSubmit: function(e){
    e.preventDefault();
    var email = this.state.email;
    var password = this.state.password;

    if(!email || !password){
      return;
    }

    Meteor.loginWithPassword(email, password, function(err){
      if(err){
      } else {
        var back = Session.get("back")
        if(back == undefined || back == ""){
          FlowRouter.go("challengeForm")
        } else {
          FlowRouter.go(Session.get("back"))
          Session.set("back", "");
        }

      }
    });
    this.setState({email: '', password: ''})
  },
  render(){
    return (
      <div className="row">
        <div className="col m4 offset-m4 s12 center">
          <h2 className="header">Admin Login</h2>

          <form onSubmit={this.handleSubmit}>

            <div className="row">
              <div className="input-field col m12 s12 ">
                <input id="email" type="email" className="validate" onChange={this.handleEmailChange} />
                <label htmlFor="email" data-error="Error!">Email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col m12 s12 ">
                <input id="password" type="password" className="validate" onChange={this.handlePasswordChange}/>
                <label htmlFor="password">Password</label>
              </div>
            </div>

            <div className="row">
              <button className="btn waves-effect waves-light grey darken-2" type="submit" name="action">Login
                <i className="material-icons right">send</i>
              </button>
            </div>
          </form>

        </div>
      </div>
    )
  }
});

export default Login;
