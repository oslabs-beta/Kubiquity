import React from 'react';
import ReactApexCharts from 'react-apexcharts';

// TODO: test out given download functions. 

const DARK_BLUE = '#0e2b5f';
const BAR = 'bar';
const EASE_IN_OUT = 'easeinout';

const COLORS = [DARK_BLUE];

const ENABLED_FALSE = { enabled: false };
const DATA_LABELS = ENABLED_FALSE;
const ANIMATE_GRADUALLY = ENABLED_FALSE;
const FILL = { colors: COLORS };

const DYNAMIC_ANIMATION = {
  enabled: true,
  speed: 350
};

const BAR_OBJ = {
  borderRadius: 4,
  horizontal: true,
};

const ANIMATIONS = {
  enabled: true,
  easing: EASE_IN_OUT,
  speed: 800,
  animateGradually: ANIMATE_GRADUALLY,
  dynamicAnimation: DYNAMIC_ANIMATION,
};

const CHART = {
  type: BAR,
  height: 350,
  animations: ANIMATIONS
};

const PLOT_OPTIONS = { bar: BAR_OBJ };

const MemoryBarChart = ({ data, categories }) => {
  const height = data.length > 30 ? 1500 : data.length * 80;
  const series = [{ data }];

  const options = {
    fill: FILL,
    chart: CHART,
    plotOptions: PLOT_OPTIONS,
    dataLabels: DATA_LABELS,
    xaxis: { categories },
  };

  return (
    <ReactApexCharts
      options={options}
      series={series}
      type="bar"
      height={height}
    />
  )
};

export default MemoryBarChart;
