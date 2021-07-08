import React, { useState, useEffect } from 'react';

import Logs from './components/k8sLogs/Logs';
import Metrics from './components/metrics/Metrics';
import Splash from './components/splash/Splash';

import './styles/app.css';

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
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setIsSplashShowing(false);
    }, 4850);

    // TODO: to test actual K8s cluster, uncomment 33 and comment out 34. 
    // fetch('http://localhost:3000/errors/')
    fetch('http://localhost:3000/errors/test')
      .then(res => res.json())
      .then(newLogs => setLogs(newLogs))
      .catch(err => console.log(err));
    
    // TODO: to test actual K8s cluster, comment out 40 and comment in 43-46. 
    setMetrics(MOCK_PODS);

    // fetch('http://localhost:3000/metrics')
    //   .then(res => res.json())
    //   .then(newMetrics => setMetrics(newMetrics))
    //   .catch(err => console.log(err));
  }, []);

  if (isSplashShowing) return (<Splash />);

  return (
    <div id="app">
      <div id="app-header">
        <h1>Kubiquity</h1>
        <p>An error logging and visualization tool for Kubernetes.</p>
      </div>
      <div id="app-container">
        <Metrics metrics={metrics}/>
        <Logs logs={logs}/>
      </div>
    </div>
  )
};

export default App;
