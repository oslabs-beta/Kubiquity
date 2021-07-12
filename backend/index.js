const errorsController = require('./controllers/errorsController');
const metricsController = require('./controllers/metricsController');

const getLog = async () => {
  await errorsController.clearErrors();
  const errorLogs = await errorsController.queryErrors();
  const formattedErrors = await errorsController.formatErrors(errorLogs);
  await errorsController.saveErrors(formattedErrors);
  return await errorsController.getErrors();
};

const getLogTest = async () => {
  const errors = await errorsController.getErrors()
  return errors;
}

const getMetrics = async () => {
  const metrics = await metricsController.getMemory();
  return metrics;
}

module.exports = {
  getLog,
  getLogTest,
  getMetrics,
};
