import React from 'react';
import PropTypes from 'prop-types';

import { Loading, BarChart } from '../';

import { MEMORY, CPU_USE, CPU_USAGE } from '../utils';

const BarChartContainer = ({
  data,
  resource,
  xAxisFormatter,
  resourceKey,
  title,
}) => {
  const values = new Array(data.length);
  const labels = new Array(data.length);

  data.forEach((datum, i) => {
    labels[i] = datum.podId;
    values[i] = datum[resourceKey];
  });

  return (
    <>
      <div className="chart-title">{title}</div>
      {data.length ? (
        <BarChart
          data={values}
          categories={labels}
          xAxisFormatter={xAxisFormatter}
        />
      ) : (
        <div>
          <Loading resource={resource} />
        </div>
      )}
    </>
  );
};

BarChartContainer.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      podId: PropTypes.string.isRequired,
      memory: PropTypes.number,
      cpuUsage: PropTypes.number,
    }),
  ).isRequired,
  resource: PropTypes.oneOf([MEMORY, CPU_USE]).isRequired,
  xAxisFormatter: PropTypes.func.isRequired,
  resourceKey: PropTypes.oneOf([MEMORY, CPU_USAGE]).isRequired,
  title: PropTypes.string.isRequired,
};

export default BarChartContainer;
