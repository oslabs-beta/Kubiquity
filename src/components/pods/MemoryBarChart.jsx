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
        chart: {
          type: 'bar',
          height: 350,
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
    return (
      <div>
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

export default MemoryBarChart;
