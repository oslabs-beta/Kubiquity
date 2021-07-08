import React, { useState, useEffect } from 'react';

import Logs from './components/k8sLogs/Logs';
import Metrics from './components/metrics/Metrics';
import Splash from './components/splash/Splash';

import './styles/app.css';

// TODO: after MVP, convert React Class Components to Hooks.
// TODO: after MVP, try out Typescript.

const App = () => {
  const [isSplashShowing, setIsSplashShowing] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsSplashShowing(false);
    }, 4850);
  }, []);

  if (isSplashShowing) return (<Splash />);

  return (
    <div id="app">
      <div id="app-header">
        <h1>Kubiquity</h1>
        <p>An error logging and visualization tool for Kubernetes.</p>
      </div>
      <div id="app-container">
        <Metrics />
        <Logs />
      </div>
    </div>
  )
};

export default App;
