const { contextBridge, ipcRenderer } = require("electron");

const VALID_CHANNELS = ['check'];

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  'api', {
    send: (channel, data) => {
      // whitelist channels

      if (VALID_CHANNELS.includes(channel)) {
        ipcRenderer.send(channel, data);
      }
    },
    receive: (channel, func) => {
      if (VALID_CHANNELS.includes(channel)) {
        // Deliberately strip event as it includes `sender` 
        ipcRenderer.on(channel, (event, ...args) => fn(...args));
      }
    }
  }
);
