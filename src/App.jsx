import React, { useState, useEffect } from 'react';

import Errors from './components/errors/Errors';
import Pods from './components/pods/Pods';
import About from './components/about/About';
import Splash from './components/splash/Splash';

import './styles/app.css';

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
    }, 4850);
  }, []);

  if (isSplashShowing) {
    return (
      <Splash />
    )
  }

  return (
    <div id="app-container">
      <h1>Kubiquity</h1>
      <Errors />
      <Pods />
      <About />
    </div>
  )
};

export default App;
