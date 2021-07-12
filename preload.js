const { contextBridge, ipcRenderer } = require('electron');

const  {
  GET_LOG,
  GET_METRICS,
  GET_LOG_TEST,
  GOT_LOG,
  GOT_METRICS,
  GOT_LOG_TEST,
} = require('./utils');

const VALID_CHANNELS = [
  GET_LOG,
  GET_METRICS,
  GET_LOG_TEST,
  GOT_LOG,
  GOT_METRICS,
  GOT_LOG_TEST
];

contextBridge.exposeInMainWorld(
  'api', {
    send: (channel, data) => {
      if (VALID_CHANNELS.includes(channel)) {
        ipcRenderer.send(channel, data);
      }
    },
    receive: (channel, func) => {
      if (VALID_CHANNELS.includes(channel)) {
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    }
  }
);
