const cmd = require('node-cmd');
const K8sError = require('../models/errorsModel');

const HEADERS = [
  'NAMESPACE',
  'LAST SEEN',
  'TYPE',
  'REASON',
  'OBJECT',
  'MESSAGE'
];

const getHeadersIndices = array => (
  HEADERS.map((header) => array.indexOf(header))
);

const logArrayConverter = array => {
  const headersIndices = getHeadersIndices(array[0]);

  return array.map((el, i) => {
    const log = [];

    for (let j = 0; j < headersIndices.length - 1; j++) {
      let idx1 = headersIndices[j];
      let idx2 = headersIndices[j + 1];
      let formattedLog = el.slice(idx1, idx2).trim();

      log.push(formattedLog);

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

const logController = {};

// TODO: app proper error handling

logController.queryLog = () => {
  try {
    const logList = cmd.runSync('kubectl get events --all-namespaces').data.split('\n');
    logList.pop();

    return logList;
  } catch (err) {
    console.log(err);
  }
};

logController.formatLog = logList => (
  logArrayConverter(logList)
);

logController.saveLog = async (log) => {
  log.shift();

  try {
    const logPromises = log.map(([
      namespace,
      lastSeen,
      type,
      reason,
      object,
      message
    ]) => {
      const newEntry = {
        namespace,
        lastSeen,
        type,
        reason,
        object,
        message,
      };

      const entryPromise = K8sError.create(newEntry);
      return entryPromise;
    });

    await Promise.all(logPromises);
    return;
  } catch (err) {
    console.log(err);
  }
};

logController.getLog = async () => {
  try {
    const log = await K8sError.find({}).sort({ 'createdAt': -1 });
    return log
  } catch (err) {
    console.log(err);
  }
};

logController.clearLog = async () => {
  try {
    await K8sError.deleteMany({});
    return;
  } catch (err) {
    console.log(err);
  }
};

module.exports = logController;
