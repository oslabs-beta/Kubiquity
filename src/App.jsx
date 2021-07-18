import React, { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';

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
  GOT_LOG,
  GOT_METRICS,
  GOT_CPU_USE,
} from '../utils';

import logo from './assets/images/logo.png';
import './assets/stylesheets/app.scss';

const App = () => {
  const [isSplashShowing, setIsSplashShowing] = useState(true);
  const [metrics, setMetrics] = useState([]);
  const [cpuUse, setCpuUse] = useState([]);
  const [log, setLog] = useState([]);
  const [isLogShowing, setIsLogShowing] = useState(true);
  const [areMetricsShowing, setAreMetricsShowing] = useState(true);
  const [isAboutShowing, setIsAboutShowing] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsSplashShowing(false);
    }, 4850);
    
    ipcRenderer.send(GET_LOG);
    ipcRenderer.send(GET_METRICS);
    ipcRenderer.send(GET_CPU_USE);

    setInterval(() => {
      ipcRenderer.once(GOT_LOG, (_, data) => {
        const newLog = JSON.parse(data);
        setLog(newLog);
      });
    
      ipcRenderer.once(GOT_METRICS, (_, data) => {
        const newMetrics = JSON.parse(data);
        setMetrics(newMetrics);
      });
    
      ipcRenderer.once(GOT_CPU_USE, (_, data) => {
        const newCpuUse = JSON.parse(data);
        setCpuUse(newCpuUse);
      });

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
        <img src={logo}/>
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
