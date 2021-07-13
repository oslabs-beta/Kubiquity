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

  useEffect(() => {
    setTimeout(() => {
      setIsSplashShowing(false);
    }, 4850);

    // TODO: to test actual K8s cluster, uncomment 33 and comment out 34. 
     fetch('http://localhost:3000/errors/')
    // fetch('http://localhost:3000/errors/test')
       .then(res => res.json())
       .then(newLog => setLog(newLog))
       .catch(err => console.log(err));

    // TODO: to test actual K8s cluster, comment out 40 and comment in 43-46. 
    setMetrics(MOCK_PODS);

    fetch('http://localhost:3000/metrics')
      .then(res => res.json())
      .then(newMetrics => setMetrics(newMetrics))
      .catch(err => console.log(err));
  }, []);

  // if (isSplashShowing) return (<Splash />);

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
