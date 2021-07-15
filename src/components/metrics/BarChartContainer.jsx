import React from 'react';
import PropTypes from 'prop-types';

import { Loading, BarChart } from '../';

const BarChartContainer = ({
  data,
  resource,
  xAxisFormatter,
  resourceKey,
}) => {
  const values = new Array(data.length);
  const labels = new Array(data.length);

  data.forEach((datum, i) => {
    labels[i] = datum.podId;
    values[i] = datum[resourceKey];
  });

  return (
    <>
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
  )
};

BarChartContainer.propTypes = {
  data: PropTypes.array.isRequired,
  resource: PropTypes.string.isRequired,
  xAxisFormatter: PropTypes.func.isRequired,
  resourceKey: PropTypes.string.isRequired,
};

export default BarChartContainer;
