import React from 'react';
import PropTypes from 'prop-types';

import BarChartContainer from './BarChartContainer';

import { MEMORY, CPU_USE, CPU_USAGE } from '../utils';

const METRICS_TEXT =
  'Prevent OOM (out of memory) kill errors by monitoring the memory and CPU usage of each node in your cluster.';

const roundNumToOneDecimal = (num) => Math.round(num * 10) / 10;
const formatXAxisToPercent = (val) => `${roundNumToOneDecimal(val)}%`;
const formatXAxisToBytes = (val) =>
  `${roundNumToOneDecimal(val).toLocaleString()} B`;

const Metrics = ({ memory, cpuUse }) => (
  <div>
    <div className="section-headers">MEMORY METRICS FOR ACTIVE PODS</div>
    <div className="sub-header">{METRICS_TEXT}</div>
    <BarChartContainer
      data={memory}
      resource={MEMORY}
      resourceKey={MEMORY}
      xAxisFormatter={formatXAxisToBytes}
      title="Memory use in Bytes per Pod"
    />
    <BarChartContainer
      data={cpuUse}
      resource={CPU_USE}
      resourceKey={CPU_USAGE}
      xAxisFormatter={formatXAxisToPercent}
      title="Percentage of CPU use per Pod"
    />
  </div>
);

Metrics.propTypes = {
  memory: PropTypes.arrayOf(
    PropTypes.shape({
      podId: PropTypes.string.isRequired,
      memory: PropTypes.number.isRequired,
    }),
  ).isRequired,
  cpuUse: PropTypes.arrayOf(
    PropTypes.shape({
      podId: PropTypes.string.isRequired,
      cpuUsage: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default Metrics;
