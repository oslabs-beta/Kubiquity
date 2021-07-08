import React from 'react';

import MemoryBarChart from './MemoryBarChart';

const MOCK_PODS = [
  {
    podId: 0,
    memory: 1250,
  },
  {
    podId: 1,
    memory: 845,
  },
];

class Metrics extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      metrics: [],
    };
  }

  componentDidMount() {
    // MOCK METRICS WORK FOR TESTING AND DEVELOPMENT:
    this.setState({ metrics: MOCK_PODS });

    // TODO: uncomment for testing connection from FE to BE. 
    // fetch('http://localhost:3000/metrics')
    //   .then(res => res.json())
    //   .then(metrics => this.setState({ metrics }))
    //   .catch(err => console.log(err));
  }

  render() {
    const { metrics } = this.state;

    if (!metrics.length) return (<>Loading metrics, please wait . . . </>);

    const memoryValues = new Array(metrics.length);
    const podLabels = new Array(metrics.length);

    metrics.forEach(({ podId, memory }, i) => {
      memoryValues[i] = memory;
      podLabels[i] = podId;
    });

    return (
      <div>
        <div className="section-headers">
          MEMORY METRICS FOR ACTIVE PODS
        </div>
        <div className="sub-header">
          Prevent OOM (out of memory) kill errors by monitoring the memory usage of each node in your cluster.
        </div>
        <MemoryBarChart
          data={memoryValues}
          categories={podLabels}
        />
      </div>
    );
  }
}

export default Metrics;
