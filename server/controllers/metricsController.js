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
      let query = `/query_range?query=sum(rate(container_memory_usage_bytes[2m])) by (pod) &start=${currentDate}&end=${currentDate}&step=1m`;
      // send query to prometheus for node memory usage
      const data = await fetch(PROM_URL + query);
      const results = await data.json();
      const memArr = results.data.result;
      // format results and change into megabytes
      const mappedData = memArr.filter(metrics => {
        if (metrics.values[0][1] != 0 || !metrics.metric.pod){
          const memory = parseFloat(metrics.values[0][1]);

          return {podId: metrics.metric.pod, memory}
        }
      });
      
      res.locals.memory = mappedData;
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

metricsController.getCPU = async (req, res, next) => {
  try {
    // create query at current time
    const currentDate = new Date().toISOString();
    let query = `query_range?query=sum(rate(container_cpu_usage_seconds_total{image!=""}[2m])) by (pod)`;
    query += `&start=${currentDate}&end=${currentDate}&step=1m`;
    let cpuArr;
    // send query to prometheus for pod cpu usage
    const data = await fetch(PROM_URL + query);
    const results = await data.json();
    // format results
    cpuArr = results.data.result;
    cpuArr.forEach((el, ind) => {
      let podID = el.metric.pod
      let cpuPercent = el.values[0][1];
      cpuArr[ind] = {[podID]: cpuPercent}
    });
    console.log(cpuArr);
    res.locals.cpu = cpuArr;
    return next();
  } catch (err) {
    return next({
      log: `metricsController.getCPU: ERROR: ${err}`,
      message: {
        err: 'Error occurred while querying metrics. Check server logs for more information.',
      },
    });
  }
};

module.exports = metricsController;
