import React from 'react';
import BarChart from 'react-bar-chart';

const MARGIN = {
  top: 20,
  right: 20,
  bottom: 30,
  left: 40,
};

// TODO: Some amount of this component may need to be altered
// once the app is closer to production ready. Points of interest:
// state; componentDidMount; margin; add x axis; change bar color;
// add title to chart.

class MemoryBarChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 500,
    };
  }

  // TODO: decide if we want to keep dynamic sizing here. 
  componentDidMount() {
    window.onresize = () => {
      this.setState({ width: this.refs.root.offsetWidth }); 
    };
  }

  render() {
    const { data } = this.props;

    return (
      <>
        <BarChart
          ylabel='Memory used (GB)'
          width={this.state.width}
          height={500}
          margin={MARGIN}
          data={data}
        />
      </>
    );
  }
};

export default MemoryBarChart;
