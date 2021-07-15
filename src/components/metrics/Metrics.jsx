import React from 'react';
import PropTypes from 'prop-types';

import { Loading, BarChart } from '../';

const formatXAxisToBytes = val => `${val} B`;

const Metrics = ({ metrics }) => {
  const memoryValues = new Array(metrics.length);
  const podLabels = new Array(metrics.length);

  metrics.forEach(({ podId, memory }, i) => {
    memoryValues[i] = memory;
    podLabels[i] = podId;
  });

  return (
    <div>
      <div className="section-headers">
        MEMORY METRICS FOR ACTIVE PODS
      </div>
      <div className="sub-header">
        Prevent OOM (out of memory) kill errors by monitoring the memory usage of each node in your cluster.
      </div>
      {metrics.length ? (
        <BarChart
          data={memoryValues}
          categories={podLabels}
          xAxisFormatter={formatXAxisToBytes}
        />
      ) : (
        <div id="metrics-loading">
          <Loading resource={'metrics'} />
        </div>
      )}
    </div>
  );
};

Metrics.propTypes = {
  metrics: PropTypes.array.isRequired,
};

export default Metrics;
