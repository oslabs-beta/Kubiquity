const fetch = require('node-fetch');
const cmd = require('node-cmd');
const { spawn } = require('child_process');

const PROM_URL = 'http://127.0.0.1:9090/api/v1/';

const metricsController = {};

let isPromUp = false;

const forwardPromPort = async () => {
  // Run command to get pod name for prometheus instance and save to variable
  const [promPodName] = cmd
    .runSync(
      'export POD_NAME=$(kubectl get pods --all-namespaces -l "app=prometheus,component=server" -o jsonpath="{.items[0].metadata.name}") && echo $POD_NAME',
    )
    .data.split('\n');
      console.log('this is the console log I am looking for', promPodName);
  // Spawns a new persistent process to forward the port 9090 to 9090 in the prometheus pod
  const portForward = await spawn('kubectl', [
    '--namespace=prometheus',
    'port-forward',
    promPodName,
    '9090',
  ]);

  // if the process is successful, resolve the promise
  await portForward.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
    isPromUp = true;
  });

  // if the process fails, reject the promise
  await portForward.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  // if prometheus is already running, resolve the promise
  await portForward.on('close', (code) => {
    if (code === 1) console.log('Prometheus is already running...');
    isPromUp = true;
  });
};

metricsController.getMemory = async () => {
  if (!isPromUp) await forwardPromPort();

  const currentDate = new Date().toISOString();
  // Sums the memory usage rate of all containers and splitting them by pod name
  const query = `query_range?query=sum(rate(container_memory_usage_bytes[2m])) by (pod) &start=${currentDate}&end=${currentDate}&step=1m`;

  try {
    const data = await fetch(PROM_URL + query);
    const results = await data.json();
    const memArr = results.data.result;

    // Parses the memory usage and formats it into an array of objects with podId and memory usage
    return memArr
      .reduce((pods, { values, metric: { pod: podId } }) => {
        if (values[0][1] > 0 && podId) {
          const memory = parseFloat(values[0][1]);

          const pod = {
            podId,
            memory,
          };

          pods.push(pod);
        }

        return pods;
      }, [])
      .sort((a, b) => b.memory - a.memory);
  } catch (err) {
    console.log('Error in getMemory: ', err);
    throw err;
  }
};

metricsController.getCPU = async () => {
  if (!isPromUp) await forwardPromPort();

  const currentDate = new Date().toISOString();
  // Sums the CPU usage rate of all containers with an image and splitting them by pod name
  const query = `query_range?query=sum(rate(container_cpu_usage_seconds_total{image!=""}[2m])) by (pod)&start=${currentDate}&end=${currentDate}&step=1m`;

  try {
    const data = await fetch(PROM_URL + query);
    const results = await data.json();
    const cpuArr = results.data.result;

    // Formats the cpuArr into an array of objects with podname and cpu usage as properties
    return cpuArr
      .map(({ metric: { pod: podId }, values }) => {
        const cpuUsage = values[0][1] * 100;

        return {
          podId,
          cpuUsage,
        };
      })
      .sort((a, b) => b.cpuUsage - a.cpuUsage);
  } catch (err) {
    console.log('Error in getCPU: ', err);
    throw err;
  }
};

module.exports = metricsController;
