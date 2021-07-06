const { collectDefaultMetrics, register } = require('prom-client');

const metricsController = {};

metricsController.getMemory = async (req, res, next) => {
  try {
    register.clear();
    await collectDefaultMetrics({
      timeout: 10000,
      gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5], // These are the default buckets.
    });

    console.log('Metrics controller', register.metrics());
  } catch (err) {
    return next({
      log: `metricsController.getMemory: ERROR: ${err}`,
      message: {
        err: 'Error occurred while getting memory metric. Check server logs for more information.',
      },
    });
  }
};

module.exports = metricsController;
