import React, { useState, useEffect } from 'react';

import Errors from './components/errors/Errors';
import Pods from './components/pods/Pods';
import Splash from './components/splash/Splash';

// TODO: after MVP, convert React Class Components to Hooks.
// TODO: after MVP, try out Typescript.

const App = () => {
  const [
    isSplashShowing,
    setIsSplashShowing
  ] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsSplashShowing(false);
    }, 800);
  }, []);

  if (isSplashShowing) {
    return (
      <Splash />
    )
  }

  return (
    <div>
      <h1>Kubiquity</h1>
      <Errors />
      <Pods />
    </div>
  )
};

export default App;
