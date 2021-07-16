import React from 'react';

import { Logo } from '../';

const Splash = () => (
  <div id="splash-container">
    <Logo />
    <div id="credits">
      Developed by k8sm8s, 2021
    </div>
    <div id="loading-splash">
      App is loading; please wait . . .
    </div>
  </div>
);

export default Splash;
