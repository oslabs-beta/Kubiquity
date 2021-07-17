export const BAR = 'bar';
export const CHART_CONTAINER_CLASS = 'chart-container';

export const ENABLED_FALSE = { enabled: false };
export const FILL = { colors: ['#0e2b5f'] };

export const CHART = {
  height: 350,
  type: BAR,
  toolbar: { show: false },
  animations: {
    enabled: true,
    easing: 'easeinout',
    speed: 800,
    animateGradually: ENABLED_FALSE,
    dynamicAnimation: {
      enabled: true,
      speed: 350,
    },
  },
};

export const PLOT_OPTIONS = {
  bar: {
    borderRadius: 4,
    horizontal: true,
  },
};
