import React from 'react';
import Nav from './Navigation/Nav.jsx';

const Layout = ({content}) => (
  <div className="blue lighten-5 fullHeight">
    <Nav />

    <div className="container bottomGap">
    	{content()}
    </div>
  </div>
);

export default Layout;
