import React from 'react';

export default class LogoutBtn extends React.Component{

  handleLogout(){
     swal({
      title: "Bye?",
      text: "Are you sure you want to logout?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, logout now!",
      closeOnConfirm: true,
      html: false
    }, function(){
      Meteor.logout(function(){
        if (FlowRouter.getRouteName() === 'home')
          location.reload();
        else
          FlowRouter.go("home")

      })
    });
  }

  render(){

    var logoutBtn = Meteor.userId() ? <a onClick={this.handleLogout.bind(this)} className="formalFont grey-text logoutLink"><i className="material-icons iconAlign">power_settings_new</i> Logout</a> : "";

    return(
      <div className="belowBrand">
        {logoutBtn}
      </div>
    )
  }
}
