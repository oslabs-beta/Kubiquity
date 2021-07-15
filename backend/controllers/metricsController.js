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

metricsController.getMemory = async () => {
  if (!isPromUp) await forwardPromPort();

  const currentDate = new Date().toISOString();
  const query = `query_range?query=sum(rate(container_memory_usage_bytes[2m])) by (pod) &start=${currentDate}&end=${currentDate}&step=1m`;

  try {
    const data = await fetch(PROM_URL + query);
    const results = await data.json();
    const memArr = results.data.result;

    // format results and change into bytes
    return memArr.reduce((pods, metrics) => {
      if (metrics.values[0][1] > 0 && metrics.metric.pod) {
        const memory = parseFloat(metrics.values[0][1]);

        const pod = {
          podId: metrics.metric.pod,
          memory,
        };

        pods.push(pod);
      }

      return pods;
    }, []).sort((a, b) => b.memory - a.memory);
  } catch (err) {
    // TODO: add proper error handling. 
    console.log(`metricsController.getMemory: ERROR: ${err}`);
  }
};

module.exports = metricsController;
