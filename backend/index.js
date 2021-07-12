const { getMemory } = require('./controllers/metricsController');
const {
  clearLog,
  queryLog,
  formatLog,
  saveLog,
  getLog: fetchLog,
} = require('./controllers/logController');

const getLog = async () => {
  await clearLog();
  let log = await queryLog();
  log = formatLog(log);
  await saveLog(log);
  return await fetchLog();
};

const getLogTest = async () => {
  const log = await fetchLog()
  return log;
}

const getMetrics = async () => {
  const metrics = await getMemory();
  return metrics;
}

module.exports = {
  getLog,
  getLogTest,
  getMetrics,
};
