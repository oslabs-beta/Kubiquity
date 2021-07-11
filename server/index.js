const errorsController = require('./controllers/errorsController');
const metricsController = require('./controllers/errorsController');

const getLog = async () => {
  debugger
  await errorsController.clearErrors();
  debugger
  const errorLogs = await errorsController.queryErrors();
  debugger
  const formattedErrors = await errorsController.formatErrors(errorLogs);
  debugger
  await errorsController.saveErrors(formattedErrors);
  debugger
  return await errorsController.getErrors();
};

const getLogTest = async () => {
  debugger
  const errors = await errorsController.getErrors()
  debugger
  return errors;
}

const getMetrics = async () => (
  await metricsController.getMemory()
);

const testRoute = () => {
  console.log('made it in test route');
}

module.exports = {
  getLog,
  getLogTest,
  getMetrics,
  testRoute,
};
