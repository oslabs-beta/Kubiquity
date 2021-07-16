const { getMemory, getCPU } = require('./controllers/metricsController');
const {
  clearLog,
  queryLog,
  formatLog,
  saveLog,
  getLog: fetchLog,
} = require('./controllers/logController');

const getLogTest = async () => await fetchLog();

const getMetrics = async () =>  await getMemory();

const getCpuUse = async () =>  await getCPU();

const getLog = async () => {
  let log = await queryLog();
  log = formatLog(log);
  await saveLog(log);
  return await fetchLog();
};

module.exports = {
  getLog,
  getLogTest,
  getMetrics,
  getCpuUse,
};
