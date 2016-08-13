import React from 'react';

const Layout = ({content}) => (
    <div className="fullHeight grey-text text-darken-2 noTopGap">
    	<a href="/" className="topLeft formalFont brand">SG Muslim Portal <span className="betaFont">Beta</span></a>
    	
    	<div className="contentDiv container">
    		{content()}
    	</div>
    	
    	<a href="/musollaView" className="bottomLeft formalFont grey-text mainLink"><i className="material-icons">location_on</i>NUS Musolla</a>
    	<a href="/eventsView" className="bottomRight formalFont grey-text mainLink"><i className="material-icons">today</i>NUSMS Events</a>

    </div>
);

export default Layout;
