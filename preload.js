const { contextBridge, ipcRenderer } = require("electron");

const VALID_CHANNELS = [
  'getLog',
  'getMetrics',
  'getLogTest',
  'gotLogTest',
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
