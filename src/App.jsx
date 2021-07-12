import React, { useState, useEffect } from 'react';

import {
  Log,
  Metrics,
  Splash,
  Navbar,
  About,
} from './components';

import './styles/app.scss';

// TODO: after MVP, try out Typescript.

const MOCK_PODS = [
  {
    podId: 0,
    memory: 1250,
  },
  {
    podId: 1,
    memory: 845,
  },
];

const App = () => {
  const [isSplashShowing, setIsSplashShowing] = useState(true);
  const [metrics, setMetrics] = useState([]);
  const [log, setLog] = useState([]);
  const [isLogShowing, setIsLogShowing] = useState(true);
  const [areMetricsShowing, setAreMetricsShowing] = useState(true);
  const [isAboutShowing, setIsAboutShowing] = useState(true);

  window.api.receive('gotLogTest', resp => {
    const newLog = JSON.parse(resp);
    setLog(newLog);
  });

  window.api.receive('gotLog', resp => {
    const newLog = JSON.parse(resp);
    setLog(newLog);
  });

  window.api.receive('gotMetrics', resp => {
    const newMetrics = JSON.parse(resp);
    setMetrics(newMetrics);
  });

  useEffect(() => {
    setTimeout(() => {
      setIsSplashShowing(false);
    }, 4850);

    // TODO: to test actual K8s cluster, uncomment 56 and comment out 55. 
    window.api.send('getLogTest');
    // window.api.send('getLog');

    // TODO: to test actual K8s cluster, comment out 59 and uncomment 60. 
    setMetrics(MOCK_PODS);
    // window.api.send('getMetrics');
  }, []);

  if (isSplashShowing) return (<Splash />);

  return (
    <div id="app">
      <div id="app-header">
        <h1>Kubiquity</h1>
        <p>An error logging and visualization tool for Kubernetes.</p>
      </div>
      <div id="navbar-and-app-container">
        <Navbar
          setIsLogShowing={setIsLogShowing}
          setAreMetricsShowing={setAreMetricsShowing}
          setIsAboutShowing={setIsAboutShowing}
        />
        <div id="app-container">
          {areMetricsShowing && (<Metrics metrics={metrics} />)}
          {isLogShowing && (<Log log={log} />)}
          {isAboutShowing && (<About />)}
        </div>
      </div>
    </div>
  )
};

export default App;
