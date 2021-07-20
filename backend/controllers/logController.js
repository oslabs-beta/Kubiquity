const cmd = require('node-cmd');
const storage = require('electron-json-storage');

const LOGS = 'logs';

const HEADERS = [
  'NAMESPACE',
  'LAST SEEN',
  'TYPE',
  'REASON',
  'OBJECT',
  'MESSAGE',
];

const logController = {};

logController.queryLog = () => {
  try {
    // runs a terminal command that gets the event logs from cluster
    const logList = cmd
      .runSync('kubectl get events --all-namespaces')
      .data.split('\n');

    // pops off last element in logList because it is an empty string
    logList.pop();

    return logList;
  } catch (err) {
    console.log('Error in queryLog: ', err);
    throw err;
  }
};

logController.formatLog = (array) => {
  // Stores indices of the beginning of the columns because indeterminate white space between columns
  const headersIndices = HEADERS.map((header) => array[0].indexOf(header));

  return array.map((el) => {
    const log = [];

    for (let j = 0; j < headersIndices.length - 1; j++) {
      // trims white space of elements
      let idx1 = headersIndices[j];
      let idx2 = headersIndices[j + 1];
      let formattedLog = el.slice(idx1, idx2).trim();

      log.push(formattedLog);

      // provides ending index of each row and formats the element
      if (j === headersIndices.length - 2) {
        idx1 = idx2;
        idx2 = el.length;
        formattedLog = el.slice(idx1, idx2).trim();

        log.push(formattedLog);
      }
    }

    return log;
  });
};

logController.saveLog = async (log) => {
  // Shift out first element of array because it is the header row
  log.shift();

  try {
    const allLogs = log.map(
      ([namespace, lastSeen, type, reason, object, message]) => {
        const createdAt = new Date().toISOString();

        return {
          namespace,
          lastSeen,
          type,
          reason,
          object,
          message,
          createdAt,
        };
      },
    );

    storage.set(LOGS, { data: allLogs }, (err) => {
      if (err) {
        console.log('Error in saveLog: ', err);
        throw err;
      }
    });

    return;
  } catch (err) {
    console.log('Error in saveLog: ', err);
    throw err;
  }
};

logController.getLog = async () => {
  try {
    const logs = await storage.getSync(LOGS);
    return logs.data;
  } catch (err) {
    console.log('Error in getLog: ', err);
    throw err;
  }
};

module.exports = logController;
