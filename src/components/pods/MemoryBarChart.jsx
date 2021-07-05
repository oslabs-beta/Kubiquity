import React from 'react';
import ReactApexCharts from 'react-apexcharts';

class ApexChart extends React.Component {
  constructor(props) {
    super(props);
    const { data, categories } = props;
    debugger
    this.state = {
      series: [{
        data,
      }],
      options: {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories,
        }
      },
    };
  }

  render() {
    debugger
    return (
      <div id="chart">
        hello
        <ReactApexCharts
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={350}
        />
      </div>
    )
  }
}

export default ApexChart;
