const cmd = require('node-cmd');
const K8sError = require('../models/errorsModel');

const HEADERS = ['NAMESPACE', 'LAST SEEN', 'TYPE', 'REASON', 'OBJECT', 'MESSAGE'];

const getHeadersIndices = (array) => HEADERS.map((header) => array.indexOf(header));

const errorArrayConverter = (array) => {
  const headersIndices = getHeadersIndices(array[0]);

  return array.map((el, i) => {
    const error = [];

    for (let j = 0; j < headersIndices.length - 1; j++) {
      let idx1 = headersIndices[j];
      let idx2 = headersIndices[j + 1];
      let formattedErr = el.slice(idx1, idx2).trim();

      error.push(formattedErr);

      if (j === headersIndices.length - 2) {
        idx1 = idx2;
        idx2 = el.length;
        formattedErr = el.slice(idx1, idx2).trim();

        error.push(formattedErr);
      }
    }

    return error;
  });
};

const errorsController = {};

// TODO: app proper error handling

errorsController.queryErrors = () => {
  try {
    const errorList = cmd.runSync('kubectl get events --all-namespaces').data.split('\n');
    errorList.pop();
    return errorList;
  } catch (err) {
    console.log(err);
  }
};

errorsController.formatErrors = (errorList) => {
  try {
    return errorArrayConverter(errorList);
  } catch (err) {
    console.log(err);
  }
};

errorsController.saveErrors = async (errors) => {
  errors.shift();

  try {
    const errorPromises = errors.map((err) => {
      const [namespace, lastSeen, type, reason, object, message] = err;

      const newErr = {
        namespace,
        lastSeen,
        type,
        reason,
        object,
        message,
      };

      const errorPromise = K8sError.create(newErr);
      return errorPromise;
    });

    await Promise.all(errorPromises);
    return;
  } catch (err) {
    console.log(err);
  }
};

errorsController.getErrors = async () => {
  try {
    const errors = await K8sError.find({}).sort({ 'createdAt': -1 });
    return errors
  } catch (err) {
    console.log(err);
  }
};

errorsController.clearErrors = async () => {
  try {
    await K8sError.deleteMany({});
    return;
  } catch (err) {
    console.log(err);
  }
};

module.exports = errorsController;
