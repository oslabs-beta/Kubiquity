import React from 'react';

import Pod from './Pod';
import MemoryBarChart from './MemoryBarChart';
import Loading from '../loading/Loading.jsx';

const MOCK_PODS = [
  {
    podId: 100,
    name: 'David Z',
    currentMemoryUse: 100,
    parentNode: 5,
  },
  {
    podId: 101,
    name: 'David Z',
    currentMemoryUse: 200,
    parentNode: 5,
  },
  {
    podId: 102,
    name: 'David Z',
    currentMemoryUse: 180,
    parentNode: 5,
  },
  {
    podId: 103,
    name: 'David Z',
    currentMemoryUse: 150,
    parentNode: 5,
  },
  {
    podId: 104,
    name: 'hcma',
    currentMemoryUse: 120,
    parentNode: 5,
  },
  {
    podId: 105,
    name: 'sn',
    currentMemoryUse: 220,
    parentNode: 5,
  },
];

class Pods extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pods: [],
    };
  }

  componentDidMount() {
    // MOCK POD WORK FOR TESTING AND DEVELOPMENT:
    this.setState({ pods: MOCK_PODS });

    // TODO: use GET request to /pods once route is written on backend.
    //fetch('/pods')
    //     .then(res => res.json())
    //     .then(data => {
    //         // Once FE is connected to BE, we will have some data.
    //         // That data will include the pods we want to save to state.
    //         const newState = { pods: data };
    //         this.setState(newState)
    //     })
    //     .catch(err => console.log(err));
  }

  render() {
    const memoryValues = new Array(this.state.pods.length);
    const podLabels = new Array(this.state.pods.length);
    const reactPods = new Array(this.state.pods.length);

    this.state.pods.forEach((pod, i) => {
      memoryValues[i] = pod.currentMemoryUse;
      podLabels[i] = `${ pod.name } (${ pod.podId })`;
      reactPods[i] = (<Pod key={`pod${i}`} {...pod} />);
    });

    return (
      <div>
        <div className="section-headers">
          PODS AND MEMORY
        </div>
        {this.state.pods.length ? (
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

export default Pods;
