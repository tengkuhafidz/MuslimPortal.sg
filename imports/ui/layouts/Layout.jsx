import React from 'react';

import LogoutBtn from '../components/LogoutBtn.jsx'

export default class Layout extends React.Component{

    componentDidMount(){
        
        $.getScript( "https://cdn.onesignal.com/sdks/OneSignalSDK.js" )
        console.log("one signal start")
        var OneSignal = window.OneSignal || [];
        OneSignal.push(["init", {
          appId: "3ba1c92b-4e88-49cf-ac32-daf8996231aa",
          autoRegister: true,
          notifyButton: {
            enable: true /* Set to false to hide */
          }
        }]);
        console.log("one signal done")



    }

    render(){


        return(
         <div className="fullHeight grey-text text-darken-2 noTopGap">
           <link rel="manifest" href="/manifest.json" /> 
            <a href="/" className="topLeft formalFont brand">SG Muslim Portal <span className="betaFont">Beta</span></a>
            <LogoutBtn />
                

            <div className="contentDiv container">
                {this.props.content()}
            </div>
            
            <a href="/musollaView" className="bottomLeft formalFont grey-text mainLink"><i className="material-icons iconAlign">location_on</i>NUS Musolla</a>
            <a href="/eventsView" className="bottomRight formalFont grey-text mainLink"><i className="material-icons iconAlign">today</i>NUSMS Events</a>

        </div>
        )
  }

}
