const { BrowserWindow, app, ipcMain } = require('electron');
const storage = require('electron-json-storage');
const path = require('path');
const electronReload = require('electron-reload');
const { getLog, getMetrics, getLogTest } = require('./backend/index');
require('dotenv').config();

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
  event.reply('getLog', log);
  // const log = await getLogTest();
  // console.log(log);
  // const dataObj = [{ data }];
  // storage.set('testData', dataObj, (error) => {
  //   console.log(storage.getAll((a, b) => {
  //     console.log(a);
  //     console.log(b);
  //   }));
  //   console.log('hit line 44');
  // });
});

ipcMain.on('getMetrics', async (event, data) => {
  const metrics = await getMetrics();
  // const log = await getLogTest();
  // console.log(log);
  // const dataObj = [{ data }];
  // storage.set('testData', dataObj, (error) => {
  //   console.log(storage.getAll((a, b) => {
  //     console.log(a);
  //     console.log(b);
  //   }));
  //   console.log('hit line 44');
  // });
});

ipcMain.on('getLogTest', async (event, data) => {
  // console.log(event);
  console.log('in test')
  event.sender.send('gotLogTest', 'check if this works');
  // event.reply('getLogTestResp', 'time to see if this works');
  // const log = await getLogTest();
  // console.log(log);
  // const dataObj = [{ data }];
  // storage.set('testData', dataObj, (error) => {
  //   console.log(storage.getAll((a, b) => {
  //     console.log(a);
  //     console.log(b);
  //   }));
  //   console.log('hit line 44');
  // });
});
