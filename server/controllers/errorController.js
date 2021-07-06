const cmd = require('node-cmd');
const Error = require('../models/errorsModel')

const HEADERS = [
  'NAMESPACE',
  'LAST SEEN',
  'TYPE',
  'REASON',
  'OBJECT',
  'MESSAGE'
];

const errorController = {};

//GOAL: Get output from kubectl command, possibly send to another middleware for formatting and processing data, store in mongodb
// --field-selector type=Failure
//Get output from kubectl command and store in a array with each row being contained in each index
errorController.queryErrors = async (req, res, next) => {
  try {
    const errorList = cmd.runSync('kubectl get events --all-namespaces').data.split('\n');
    console.log(errorList[0].length, errorList[1].length, errorList[2].length)
    //Pop the last row since it is empty
    errorList.pop();
    //Shift the first row since it is the headers
    res.locals.errorList = errorList;
    return next();
  } catch (err) {
    return next({
      log: `errorController.queryErrors: ERROR: ${err}`,
      message: {
        err: 'Error occurred while querying errors. Check server logs for more information.',
      }
    })
  }
};

//Store an array of the index of where each header in HEADERS array begins as well as the array length
function headersIndex(array) {
  let arr = [];
  for (let i = 0; i < HEADERS.length; i++) {
    arr.push(array.indexOf(HEADERS[i]));
  }
  //arr.push(array.length);
  console.log('headersIndex', arr);
  return arr;
}

//Converts ErrorList array of strings to nested array
function errorArrayConverter(array) {
  let arr = [];
  let headersIndexArray = headersIndex(array[0])
  for (let i = 0; i < array.length; i++) {
    let subArray = [];
    for (let j = 0; j < headersIndexArray.length - 1; j++) {
      subArray.push(array[i].slice(headersIndexArray[j], headersIndexArray[j + 1]).trim())
      if (j === headersIndexArray.length - 2) {
        subArray.push(array[i].slice(headersIndexArray[j + 1], array[i].length).trim())
      }
    }
    arr.push(subArray);
  }
  return arr;
}

errorController.formatErrors = async (req, res, next) => {
  try {
    let headersIndexArray = headersIndex(res.locals.errorList[0])
    let formattedError = errorArrayConverter(res.locals.errorList);
    //const { errorList } = req.locals;
    //const formattedErrors = [];
    res.locals.formattedError = formattedError;
    return next();
  } catch (err) {
    return next({
      log: `errorController.formatErrors: ERROR: ${err}`,
      message: {
        err: 'Error occurred while formatting errors. Check server logs for more information.',
      }
    })
  }
};


/*

error = {
  namespace,
  lastSeen,
  type,
  reason,
  object,
}

*/

errorController.saveErrors = async (req, res, next) => {
  try {
    let formattedError = res.locals.formattedError;
    // 1. Iterate through all our errors
    // 2. save each instance of error; this will by async work
    // 3. once all errors are saved, we want to find and return up all errors
    // 4. save those errors to res.locals
    // 5. hit that next piece of sweet sweet middleware
    for (let i = 0; i < formattedError.length; i++) {
      const obj = {
        namespace: formattedError[i][0],
        lastSeen: formattedError[i][1],
        type: formattedError[i][2],
        reason: formattedError[i][3],
        object: formattedError[i][4],
        message: formattedError[i][5],
      }
      Error.create(obj)
    }
    //res.locals.error

    // const errors = Errors.findBy({});
    // console.log(errors);
    return next();
  } catch (err) {
    return next({
      log: `errorController.saveErrors: ERROR: ${err}`,
      message: {
        err: 'Error occurred while saving errors. Check server logs for more information.',
      }
    })
  }
};

errorController.getErrors = async (req, res, next) => {
  try {
    res.locals.errors = await Error.find({});
    //console.log('geterrors' + res.locals.errors);
    return next();
  } catch (err) {
    return next({
      log: `errorController.getErrors: ERROR: ${err}`,
      message: {
        err: 'Error occurred while retrieving errors. Check server logs for more information.',
      }
    })
  }
}
errorController.clearErrors = async (req, res, next) => {
  try {
    await Error.deleteMany();
    //console.log('geterrors' + res.locals.errors);
    return next();
  } catch (err) {
    return next({
      log: `errorController.clearErrors: ERROR: ${err}`,
      message: {
        err: 'Error occurred while clearing errors. Check server logs for more information.',
      }
    })
  }
}

// get from mongoDB

//Get everything from the command above and process it to add docs in schema. Split up namespace, type, etc to store in schema
//getError to get from mongoDB





module.exports = errorController;
