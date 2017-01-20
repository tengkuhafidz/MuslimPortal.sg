import React from 'react';

import LogoutBtn from '../components/LogoutBtn.jsx';

export default class AdminWidget extends React.Component {

  var isLogin = Meteor.userId() ? <LogoutBtn /> : ''
  render() {

  }
}
