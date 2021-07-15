import React from 'react';
import PropTypes from 'prop-types';
import ReactApexCharts from 'react-apexcharts';

// TODO: test out given download functions. 

const ENABLED_FALSE = { enabled: false };
const FILL = { colors: ['#0e2b5f']};

const CHART = {
  height: 350,
  type: 'bar',
  animations: {
    enabled: true,
    easing: 'easeinout',
    speed: 800,
    animateGradually: ENABLED_FALSE,
    dynamicAnimation: {
      enabled: true,
      speed: 350
    },
  },
};

const PLOT_OPTIONS = {
  bar: {
    borderRadius: 4,
    horizontal: true,
  },
};

const X_AXIS_LABELS = {
  formatter: val => `${val} MB`,
};

const Y_AXIS = {
  labels: {
    formatter: val => `Pod ${val}`,
  },
};

const BarChart = ({ data, categories }) => {
  const height = data.length > 30 ? 1500 : data.length * 80;
  const series = [{ data }];

  const options = {
    fill: FILL,
    chart: CHART,
    plotOptions: PLOT_OPTIONS,
    dataLabels: ENABLED_FALSE,
    yaxis: Y_AXIS,
    xaxis: {
      categories,
      labels: X_AXIS_LABELS,
    },
  };

  return (
    <div id="chart-container">
      <ReactApexCharts
        options={options}
        series={series}
        type="bar"
        height={height}
      />
    </div>
  )
};

BarChart.propTypes = {
  data: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
};

export default BarChart;
