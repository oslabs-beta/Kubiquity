import React from 'react';
import PropTypes from 'prop-types';

import BarChartContainer from './BarChartContainer';

const formatXAxisToBytes = val => `${val} B`;
const formatXAxisToPercent = val => `${val}%`;

const Metrics = ({ metrics, cpuUse }) => {
  debugger
  return (
    <div>
      <div className="section-headers">
        MEMORY METRICS FOR ACTIVE PODS
      </div>
      <div className="sub-header">
        Prevent OOM (out of memory) kill errors by monitoring the memory and CPU usage of each node in your cluster.
      </div>
      <BarChartContainer
        data={metrics}
        resource="metrics"
        resourceKey="memory"
        xAxisFormatter={formatXAxisToBytes}
      />
      <BarChartContainer
        data={cpuUse}
        resource="CPU use"
        resourceKey="cpuUsage"
        xAxisFormatter={formatXAxisToPercent}
      />
    </div>
  );
};

Metrics.propTypes = {
  metrics: PropTypes.array.isRequired,
  cpuUse: PropTypes.array.isRequired,
};

export default Metrics;
