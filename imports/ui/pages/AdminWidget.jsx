import React from 'react';

import LogoutBtn from '../components/LogoutBtn.jsx';

export default class AdminWidget extends React.Component {

  render() {

    return (
      <div>
        <LogoutBtn />
        <ul>
          <li>
            <a href="/challengeForm" className="centreLeft formalFont white-text mainLink">
            <i className="material-icons iconAlign">location_on</i>Add Challenge</a>

          </li>
        </ul>
      </div>
    )


  }
}
