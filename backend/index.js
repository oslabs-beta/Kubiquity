const { getMemory: fetchMemory, getCPU } = require('./controllers/metricsController');
const {
  queryLog,
  formatLog,
  saveLog,
  getLog: fetchLog,
} = require('./controllers/logController');

const getMemory = async () => await fetchMemory();

const getCpuUse = async () => await getCPU();

const getLog = async () => {
  let log = await queryLog();
  log = formatLog(log);
  await saveLog(log);
  return await fetchLog();
};

module.exports = { getLog, getMemory, getCpuUse };
