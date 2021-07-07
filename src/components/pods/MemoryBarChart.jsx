import React from 'react';
import ReactApexCharts from 'react-apexcharts';

// TODO: decide how we plan on setting height for this chart. 
// TODO: customize this component as needed. 
// TODO: test out given download functions. 
class MemoryBarChart extends React.Component {
  constructor(props) {
    super(props);
    const { data, categories } = props;

    this.state = {
      series: [{ data }],
      options: {
        fill: {
          colors: ['#0e2b5f']
        },
        chart: {
          type: 'bar',
          height: 350,
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
            animateGradually: {
                enabled: false,
            },
            dynamicAnimation: {
                enabled: true,
                speed: 350
            }
          }
        }, 
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
        dataLabels: { enabled: false },
        xaxis: { categories },
      },
    };
  }

  render() {
    const height = this.props.data.length > 30 ? 1500 : this.props.data.length * 50;

    return (
      <div>
        <ReactApexCharts
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={height}
        />
      </div>
    )
  }
}

export default MemoryBarChart;
