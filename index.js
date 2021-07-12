const { BrowserWindow, app, ipcMain } = require('electron');
const storage = require('electron-json-storage');
const path = require('path');
const electronReload = require('electron-reload');
const { getLog, getMetrics, getLogTest } = require('./backend/index');
require('dotenv').config();
const errorsController = require('./backend/controllers/errorsController')

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
    nodeIntegration: false,
    worldSafeExecuteJavaScript: true,
    contextIsolation: true,
    preload: path.join(
      __dirname,
      'preload.js'
    ),
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

ipcMain.on('getLog', async (event, data) => {
  const log = await getLog();
  event.sender.send('gotLog', JSON.stringify(log));
});

ipcMain.on('getMetrics', async (event, data) => {
  const metrics = await getMetrics();
  console.log(metrics);
  event.sender.send('gotMetrics', JSON.stringify(metrics));
});

ipcMain.on('getLogTest', async (event, data) => {
  console.log('in test')
  const errors = await getLogTest();
  // console.log(errors);
  event.sender.send('gotLogTest', JSON.stringify(errors));
});
