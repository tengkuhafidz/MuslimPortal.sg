import React from 'react';
import {Accounts} from 'meteor/accounts-base'

const Register = React.createClass({
  getInitialState: function(){
    return {name: '', email: '', password: ''};
  },

  componentDidMount: function(){
    document.title = "Mosque Events | Register";
    $(document).ready(function() {
      $('select').material_select();
    });
  },

  handleWhoChange: function(e){
    // this.setState({who: e.target.value});
    this.setState({who: e.target.value})
  },

  handleNameChange: function(e){
    this.setState({name: e.target.value});
  },

  handleEmailChange: function(e){
    this.setState({email: e.target.value});
  },

  handlePasswordChange: function(e){
    this.setState({password: e.target.value});
  },

  handleSubmit: function(e){
    e.preventDefault();
    var who = this.state.who;
    var name = this.state.name;
    var email = this.state.email;
    var password = this.state.password;

    if(!email || !password){
      return;
    }

    var options = {
      email: email,
      password: password,

      profile: {
        who: 'users',
        name: name,
        gender: e.target.elements.gender.value,
      }
    }
    //send request to server
    Accounts.createUser(options, function(err){
      if(err){
        console.log("Register error")
      } else {
        console.log("Register Success")
        FlowRouter.go("eventsView")
      }
    })
    this.setState({name: '', email: '', password: ''});
  },

  render(){
    return (
      <div className="row">
        <div className="col m4 offset-m4 s12 center">
          <h2 className="header ">Register</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="input-field-user col m12 s12">
                <input id="name" type="text" className="validate" onChange={this.handleNameChange} value={this.state.name} />
                <label htmlFor="name">Names</label>
              </div>
            </div>
            <div className="row">

              <div className="input-field-user col s12">
                <input name="gender" type="radio" id="m" value="m" ref="gender"/>
                <label htmlFor="m">Male</label>
                <input name="gender" type="radio" id="f" value="f" ref="gender"/>
                <label htmlFor="f">Female</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field-user col m12 s12">

                <input id="email" type="email" className="validate" value={this.state.email} onChange={this.handleEmailChange} />
                <label htmlFor="email" data-error="Error!">Email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field-user col m12 s12">
                <input id="password" type="password" className="validate" value={this.state.password} onChange={this.handlePasswordChange}/>
                <label htmlFor="password">Password</label>
              </div>
            </div>

            <div className="row">
              <button className="btn waves-effect waves-light blue darken-2" type="submit" name="action">Sign Up
                <i className="material-icons right">send</i>
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
});

export default Register;
