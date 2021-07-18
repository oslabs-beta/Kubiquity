import React from 'react';
import PropTypes from 'prop-types';

import BarChartContainer from './BarChartContainer';

import { MEMORY, CPU_USE, CPU_USAGE } from '../utils';

const roundNumToOneDecimal = num => Math.round(num * 10) / 10;
const formatXAxisToBytes = val => `${roundNumToOneDecimal(val).toLocaleString()} B`;
const formatXAxisToPercent = val => `${roundNumToOneDecimal(val)}%`;

const Metrics = ({ metrics, cpuUse }) => (
  <div>
    <div className="section-headers">
      MEMORY METRICS FOR ACTIVE PODS
    </div>
    <div className="sub-header">
      Prevent OOM (out of memory) kill errors by monitoring the memory and CPU usage of each node in your cluster.
    </div>
    <BarChartContainer
      data={metrics}
      resource={MEMORY}
      resourceKey={MEMORY}
      xAxisFormatter={formatXAxisToBytes}
    />
    <BarChartContainer
      data={cpuUse}
      resource={CPU_USE}
      resourceKey={CPU_USAGE}
      xAxisFormatter={formatXAxisToPercent}
    />
  </div>
);

Metrics.propTypes = {
  metrics: PropTypes.arrayOf(
    PropTypes.shape({
      podId: PropTypes.string.isRequired,
      memory: PropTypes.number.isRequired,
    })
  ).isRequired,
  cpuUse: PropTypes.arrayOf(
    PropTypes.shape({
      podId: PropTypes.string.isRequired,
      cpuUsage: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Metrics;
