import React from 'react';
import PropTypes from 'prop-types';
import ReactApexCharts from 'react-apexcharts';

import {
  BAR,
  CHART_CONTAINER_CLASS,
  ENABLED_FALSE,
  FILL,
  CHART,
  PLOT_OPTIONS,
} from './barChartConstants';

const BarChart = ({
  data,
  categories,
  xAxisFormatter,
}) => {
  const height = data.length > 30 ? 1500 : data.length * 80;
  const series = [{ data }];

  const options = {
    fill: FILL,
    chart: CHART,
    plotOptions: PLOT_OPTIONS,
    dataLabels: ENABLED_FALSE,
    xaxis: {
      categories,
      labels: {
        formatter: xAxisFormatter,
      },
    },
  };

  return (
    <div className={CHART_CONTAINER_CLASS}>
      <ReactApexCharts
        options={options}
        series={series}
        type={BAR}
        height={height}
      />
    </div>
  );
};

BarChart.propTypes = {
  data: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
};

export default BarChart;
