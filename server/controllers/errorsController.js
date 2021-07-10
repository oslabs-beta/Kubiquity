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

errorsController.queryErrors = (req, res, next) => {
  try {
    const errorList = cmd.runSync('kubectl get events --all-namespaces').data.split('\n');
    errorList.pop();
    res.locals.errorList = errorList;

    return next();
  } catch (err) {
    return next({
      log: `errorController.queryErrors: ERROR: ${err}`,
      message: {
        err: 'Error occurred while querying errors. Check server logs for more information.',
      },
    });
  }
};

errorsController.formatErrors = (req, res, next) => {
  try {
    const errors = errorArrayConverter(res.locals.errorList);
    res.locals.errors = errors;

    return next();
  } catch (err) {
    return next({
      log: `errorController.formatErrors: ERROR: ${err}`,
      message: {
        err: 'Error occurred while formatting errors. Check server logs for more information.',
      },
    });
  }
};

errorsController.saveErrors = async (req, res, next) => {
  const { errors } = res.locals;
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
    return next();
  } catch (err) {
    return next({
      log: `errorController.saveErrors: ERROR: ${err}`,
      message: {
        err: 'Error occurred while saving errors. Check server logs for more information.',
      },
    });
  }
};

errorsController.getErrors = async (req, res, next) => {
  try {
    res.locals.errors = await K8sError.find({}).sort({ 'createdAt': -1 });
    return next();
  } catch (err) {
    return next({
      log: `errorController.getErrors: ERROR: ${err}`,
      message: {
        err: 'Error occurred while retrieving errors. Check server logs for more information.',
      },
    });
  }
};

errorsController.clearErrors = async (req, res, next) => {
  try {
    await K8sError.deleteMany({});
    return next();
  } catch (err) {
    return next({
      log: `errorController.clearErrors: ERROR: ${err}`,
      message: {
        err: 'Error occurred while clearing errors. Check server logs for more information.',
      },
    });
  }
};

module.exports = errorsController;
