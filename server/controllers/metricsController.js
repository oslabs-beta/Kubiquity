const fetch = require('node-fetch');
const cmd = require('node-cmd');
const { spawn } = require('child_process');

const PROM_URL = 'http://127.0.0.1:9090/api/v1/';

const metricsController = {};

let isPromUp = false;

const forwardPromPort = () => (
  new Promise((resolve, reject) => {
    const promPodName = cmd
      .runSync(
        'export POD_NAME=$(kubectl get pods --all-namespaces -l "app=prometheus,component=server" -o jsonpath="{.items[0].metadata.name}") && echo $POD_NAME',
      )
      .data
      .split('\n');
      
    const portForward = spawn('kubectl', [
      '--namespace=prometheus',
      'port-forward',
      `${promPodName[0]}`,
      '9090',
    ]);

    portForward.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
      isPromUp = true;
      resolve();
    });

    portForward.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

    portForward.on('close', (code) => {
      if (code === 1) console.log('Prometheus is already running...');
      isPromUp = true;
      resolve();
    });
  })
);

metricsController.getMemory = async (req, res, next) => {
  try {
    // check if prometheus is port forwarded. if false, forwards it to 9090.
    if (!isPromUp) await forwardPromPort();
    // create query at current time
    if (isPromUp) {
      const currentDate = new Date().toISOString();
      let query = `/query_range?query=rate(container_memory_usage_bytes[2m])&start=${currentDate}&end=${currentDate}&step=1m`;
      let memArr;
      // send query to prometheus for node memory usage
      const data = await fetch(PROM_URL + query);
      const results = await data.json();
      // format results and change into megabytes
      memArr = results.data.result;
      const formattedData = memArr.map(metric => {
        console.log(metric.values[0]);
        if(metric.metric.pod && metric.values[0][1] != 0) {
          const mbMemory = Math.floor(parseFloat(metric.value[0][1])/1048576);
          return {podId: metric.metric.pod, memory: mbMemory};
        }
      })
      console.log(formattedData);
      res.locals.memory = formattedData;
    }
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
