const fetch = require('node-fetch');

const PROM_URL = 'http://127.0.0.1:9090/api/v1/';

const metricsController = {};

metricsController.getMemory = async () => {
  const currentDate = new Date().toISOString();
  let query = `query_range?query=sum(rate(node_memory_MemFree_bytes[2m]))`;
  query += `&start=${currentDate}&end=${currentDate}&step=1m`;

  try {
    const data = await fetch(PROM_URL + query);
    const results = await data.json();
    const memArr = results.data.result[0].values[0];

    memArr.forEach((el, ind) => {
      if (typeof el === 'string') el = parseFloat(el);
      mbMemory = el / 1048576;
      memArr[ind] = Math.floor(mbMemory);
    });
    
    const memObj = Object.assign({}, memArr);
    return  Object
      .entries(memObj)
      .map(([podId, memory]) => ({
        podId, 
        memory
      }));
  } catch (err) {
    // TODO: add proper error handling. 
    console.log(err);
  }
};

module.exports = metricsController;
