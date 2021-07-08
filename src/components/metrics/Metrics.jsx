import React from 'react';

import MemoryBarChart from './MemoryBarChart';
import Loading from '../loading/Loading.jsx';

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
        <MemoryBarChart
          data={memoryValues}
          categories={podLabels}
        />
      ) : (
        <div id="metrics-loading">
          <Loading resource={'metrics'}/>
        </div>
      )}
    </div>
  );
};

export default Metrics;
