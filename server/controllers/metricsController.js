const fetch = require('node-fetch');

const metricsController = {};

const PROM_URL = 'http://127.0.0.1:9090/api/v1/';

metricsController.getMemory = async (req, res, next) => {
  try {
    // create query at current time
    const currentDate = new Date().toISOString();
    let query = `/query_range?query=sum(rate(node_memory_MemFree_bytes[2m]))`;
    query += `&start=${currentDate}&end=${currentDate}&step=1m`;
    let memArr;
    // send query to prometheus for node memory usage
    const data = await fetch(PROM_URL + query);
    const results = await data.json();
    // format results and change into megabytes
    memArr = results.data.result[0].values[0];
    memArr.forEach((el, ind) => {
      if (typeof el === 'string') el = parseFloat(el);
      mbMemory = el / 1048576;
      memArr[ind] = Math.floor(mbMemory);
    });
    
    // convert array into object to send to front end
    const memObj = Object.assign({}, memArr);
    const formattedData = Object.entries(memObj).map(([podId, memory]) => ({
      podId, 
      memory
    }));

    res.locals.memory = formattedData;
    return next();
  } catch (err) {
    return next({
      log: `metricsController.getMemory: ERROR: ${err}`,
      message: {
        err: 'Error occurred while querying metrics. Check server logs for more information.',
      },
    });
  }
};

module.exports = metricsController;
