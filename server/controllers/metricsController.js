const { spawn } = require('child_process');
const { collectDefaultMetrics, register } = require('prom-client');

const metricsController = {};

const PROM_URL = 'http://127.0.0.1:9090/api/v1/';
const isPrometheusRunning = false;
const portForwardProm = () => {
  try {
    const process = spawn('kubectl', [
      '--namespace=default',
      'port-forward',
      'deploy/prometheus-server',
      '9090',
    ]);

    process.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    process.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

    process.on('close', (code) => {
      if (code === 1) console.log('PROMETHEUS ALREADY IN USE NUM NUM');
      console.log(`child process exited with code ${code}`);
    });

    return next();
  } catch (err) {
    return next(err);
  }
};

async function getClusterFreeMemory(startDateTime, endDateTime, step) {
  const promStatus = await portForwardProm();
  if (!promStatus) return console.log('Prometheus unable to run, check config');
  let query = `query_range?query=sum(rate(node_memory_MemFree_bytes[2m]))`;
  query += `&start=${startDateTime}&end=${endDateTime}&step=${step}`;
  const data = await fetch(query).then(({ data }) => data.result);

  return formatResponseObject(data);
}

function formatResponseObject(data) {
  try {
    const res = {
      timestamps: [],
      seriesLabels: [],
      seriesValues: [],
    };

    //helper function to convert the Prometheus MS timestamp to HH:MM
    const timeFilter = /[0-9][0-9]:[0-9][0-9]/;
    const msToTimestamp = (ms) => new Date(1000 * ms).toISOString().match(timeFilter)[0];

    //pop the last series off the query response to extract timestamp and groupBy label
    const initialSet = data.pop();
    const groupByLabel = Object.keys(initialSet.metric)[0];

    // add this last series to the response object arrays
    res.timestamps = initialSet.values.map((vals) => msToTimestamp(vals[0]));
    res.seriesLabels.push(initialSet.metric[groupByLabel] || 'Cluster');
    res.seriesValues.push(initialSet.values.map((vals) => vals[1]));

    // for each remaining dataset, push the series label and array of datapoints onto the res object
    data.forEach((dataset) => {
      res.seriesLabels.push(dataset.metric[groupByLabel]); // add a new dataseries label to our res
      res.seriesValues.push(dataset.values.map((vals) => vals[1])); // add the dataseries to our res
    });

    //return the constructed response
    return res;
  } catch (err) {
    console.log(err);
  }
}

metricsController.getMemory = async (req, res, next) => {};

module.exports = metricsController;
