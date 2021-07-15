import React, { useState, useEffect } from 'react';

import {
  Log,
  Metrics,
  Splash,
  Navbar,
  About,
} from './components';

import {
  GET_LOG,
  GET_METRICS,
  GET_CPU_USE,
  GET_LOG_TEST,
  GOT_LOG,
  GOT_METRICS,
  GOT_CPU_USE,
  GOT_LOG_TEST,
} from '../utils';

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
  const [cpuUse, setCpuUse] = useState([]);
  const [log, setLog] = useState([]);
  const [isLogShowing, setIsLogShowing] = useState(true);
  const [areMetricsShowing, setAreMetricsShowing] = useState(true);
  const [isAboutShowing, setIsAboutShowing] = useState(true);

  window.api.receive(GOT_LOG_TEST, resp => {
    const newLog = JSON.parse(resp);
    setLog(newLog);
  });

  window.api.receive(GOT_LOG, resp => {
    const newLog = JSON.parse(resp);
    setLog(newLog);
  });

  window.api.receive(GOT_METRICS, resp => {
    const newMetrics = JSON.parse(resp);
    setMetrics(newMetrics);
  });

  window.api.receive(GOT_CPU_USE, resp => {
    const newCpuUse = JSON.parse(resp);
    setCpuUse(newCpuUse);
  });

  useEffect(() => {
    setTimeout(() => {
      setIsSplashShowing(false);
    }, 4850);

    // window.api.send(GET_LOG_TEST);
    // setMetrics(MOCK_PODS);
    
    window.api.send(GET_LOG);
    window.api.send(GET_METRICS);
    window.api.send(GET_CPU_USE);
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
          {isLogShowing && (<Log log={log} />)}
          {areMetricsShowing && (
            <Metrics
              metrics={metrics}
              cpuUse={cpuUse}
            />
          )}
          {isAboutShowing && (<About />)}
        </div>
      </div>
    </div>
  )
};

export default App;
