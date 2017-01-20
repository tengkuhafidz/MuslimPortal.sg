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
        var totalCount = 31;
        var num = Math.ceil( Math.random() * totalCount );
        document.body.style.background = "linear-gradient(rgba(15,109,102, 0.8), rgba(15,109,102, 0.8)), url('/bg/" + num + ".jpg') no-repeat center center fixed" ;
        document.body.style.backgroundSize = "cover";

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
