import React, { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';

import {
  Log,
  Metrics,
  Splash,
  Navbar,
  About,
  Logo,
} from './components';

import {
  GET_LOG,
  GET_METRICS,
  GET_CPU_USE,
  GOT_LOG,
  GOT_METRICS,
  GOT_CPU_USE,
} from '../utils';

import './assets/stylesheets/app.scss';

// TODO: after MVP, try out Typescript.

const App = () => {
  const [isSplashShowing, setIsSplashShowing] = useState(true);
  const [metrics, setMetrics] = useState([]);
  const [cpuUse, setCpuUse] = useState([]);
  const [log, setLog] = useState([]);
  const [isLogShowing, setIsLogShowing] = useState(true);
  const [areMetricsShowing, setAreMetricsShowing] = useState(true);
  const [isAboutShowing, setIsAboutShowing] = useState(true);

  ipcRenderer.on(GOT_LOG, (event, data) => {
    console.log('got logs');
    const newLog = JSON.parse(data);
    setLog(newLog);
  });

  ipcRenderer.on(GOT_METRICS, (_, data) => {
    console.log('got metrics');
    const newMetrics = JSON.parse(data);
    setMetrics(newMetrics);
  });

  ipcRenderer.on(GOT_CPU_USE, (_, data) => {
    console.log('got cpu');
    const newCpuUse = JSON.parse(data);
    setCpuUse(newCpuUse);
  });

  useEffect(() => {
    setTimeout(() => {
      setIsSplashShowing(false);
    }, 4850);
    
    ipcRenderer.send(GET_LOG);
    ipcRenderer.send(GET_METRICS);
    ipcRenderer.send(GET_CPU_USE);

    // ipcRenderer.removeAllListeners(GET_LOG);
    // ipcRenderer.removeAllListeners(GET_METRICS);
    // ipcRenderer.removeAllListeners(GET_CPU_USE);



    setInterval(() => {
      ipcRenderer.off();
      ipcRenderer.send(GET_LOG);
      ipcRenderer.send(GET_METRICS);
      ipcRenderer.send(GET_CPU_USE);
    }, 10000);

    return () => ipcRenderer.off();
  }, []);

  if (isSplashShowing) return (<Splash />);

  return (
    <div id="app">
      <div id="app-header">
        <Logo />
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
