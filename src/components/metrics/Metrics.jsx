import React from 'react';

import MemoryBarChart from './MemoryBarChart';
import Loading from '../loading/Loading.jsx';



class Metrics extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     metrics: [],
  //   };
  // }

  // componentDidMount() {
  //   // MOCK METRICS WORK FOR TESTING AND DEVELOPMENT:
  //   this.setState({ metrics: MOCK_PODS });

  //   // TODO: uncomment for testing connection from FE to BE. 
  //   // fetch('http://localhost:3000/metrics')
  //   //   .then(res => res.json())
  //   //   .then(metrics => this.setState({ metrics }))
  //   //   .catch(err => console.log(err));
  // }

  render() {
    const { metrics } = this.props;
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
        {metrics.length ? (
          <MemoryBarChart
            data={memoryValues}
            categories={podLabels}
          />
        ) : (
          <Loading resource={'metrics'}/>
        )}
      </div>
    );
  }
}

export default Metrics;
