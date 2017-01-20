import React from 'react';

import LogoutBtn from '../components/LogoutBtn.jsx';

export default class AdminWidget extends React.Component {

  render() {

    return (
      <div className="adminPanel">
        <i className="fa fa-user-secret fa-2x iconAlign" aria-hidden="true"></i>
        <div className="adminMenu" >
          <LogoutBtn />
          <ul>
            <li>
              <a href="/challengeForm" className=" formalFont white-text mainLink">
              <i className="material-icons iconAlign">location_on</i>Add Challenge</a>

            </li>
          </ul>
        </div>
      </div>
    )


  }
}
