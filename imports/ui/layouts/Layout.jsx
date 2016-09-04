import React from 'react';

import LogoutBtn from '../components/LogoutBtn.jsx'
import EventsView from '../pages/EventsView.jsx'


export default class Layout extends React.Component{

    componentDidMount(){

       // $.getScript( "https://cdn.onesignal.com/sdks/OneSignalSDK.js" )
        var OneSignal = window.OneSignal || [];
        OneSignal.push(["init", {
          appId: "3ba1c92b-4e88-49cf-ac32-daf8996231aa",
          autoRegister: true,
          notifyButton: {
            enable: false /* Set to false to hide */
          }
        }]);

    }

    render(){


        return(
         <div className="fullHeight white-text noTopGap">
           <link rel="manifest" href="/manifest.json" />
            <a href="/" className="topLeft formalFont white-text brand">NUSMS Portal <span className="betaFont">Beta</span></a>

              <div className="topRight">
                <EventsView />
              </div>
              <LogoutBtn />


            <div className="contentDiv container">
                {this.props.content()}
            </div>

            <a href="/musollaView" className="bottomLeft formalFont white-text mainLink"><i className="material-icons iconAlign">location_on</i>NUS Musolla</a>
            <a href="/eventsView" className="bottomRight formalFont white-text mainLink"><i className="material-icons iconAlign">today</i>NUSMS Events</a>

        </div>
        )
  }

}
