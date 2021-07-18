import React from 'react';

import logo from '../../assets/images/logo.png';

const Splash = () => (
  <div id="splash-container">
    <img src={logo}/>
    <div id="credits">
      Developed by k8sm8s, 2021
    </div>
    <div id="loading-splash">
      App is loading; please wait . . .
    </div>
  </div>
);

export default Splash;
