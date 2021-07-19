const { BrowserWindow, app, ipcMain } = require('electron');
const path = require('path');
const electronReload = require('electron-reload');

const { getLog, getMetrics, getCpuUse } = require('./backend');

const  {
  GET_LOG,
  GET_METRICS,
  GET_CPU_USE,
  GOT_LOG,
  GOT_METRICS,
  GOT_CPU_USE,
} = require('./utils');

const ELECTRON_MODULE_PATH = path.join(
  __dirname,
  'node_modules',
  '.bin',
  'electron'
);

const ELECTRON_RELOAD_OPTIONS = {
  electron: ELECTRON_MODULE_PATH,
};

const BROWSER_WINDOW_SETTINGS = {
  width: 1200,
  height: 800,
  backgroundColor: 'white',
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false,
    enableRemoteModule: true,
    worldSafeExecuteJavaScript: true,
  },
};

const createWindow = () => {
  new BrowserWindow(BROWSER_WINDOW_SETTINGS)
    .loadFile('index.html');
};

electronReload(__dirname, ELECTRON_RELOAD_OPTIONS);

app
  .whenReady()
  .then(createWindow)
  .catch(err => {
    throw Error(`Error while launching app: ${ err }`);
  });

ipcMain.on(GET_LOG, async (event, data) => {
  const log = await getLog();
  event.sender.send(GOT_LOG, JSON.stringify(log));
});

ipcMain.on(GET_METRICS, async (event, data) => {
  const metrics = await getMetrics();
  event.sender.send(GOT_METRICS, JSON.stringify(metrics));
});

ipcMain.on(GET_CPU_USE, async (event, data) => {
  const cpuUse = await getCpuUse();
  event.sender.send(GOT_CPU_USE, JSON.stringify(cpuUse));
});
