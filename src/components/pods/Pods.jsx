import React from 'react';

import Pod from './Pod';

const MOCK_PODS = [
    {
        podId: 100,
        name: 'David Z',
        currentMemoryUse: '100 gb',
        parentNode: 5,
    },
    {
        podId: 101,
        name: 'David Z',
        currentMemoryUse: '100 gb',
        parentNode: 5,
    },
    {
        podId: 102,
        name: 'David Z',
        currentMemoryUse: '100 gb',
        parentNode: 5,
    },
    {
        podId: 103,
        name: 'David Z',
        currentMemoryUse: '100 gb',
        parentNode: 5,
    },
    {
        podId: 104,
        name: 'hcma',
        currentMemoryUse: '100 gb',
        parentNode: 5,
    },
    {
        podId: 105,
        name: 'sn',
        currentMemoryUse: '100 gb',
        parentNode: 5,
    },
];

class Pods extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pods: []
        }
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

        const newPods = []

        for (let i = 0; i < this.state.pods.length; i++) {
            const currentPod = this.state.pods[i]

            newPods.push(
                <Pod
                    key={`pod${i}`}
                    {...currentPod}
                />
            )
        }
        return (
            <div>
                Pods
                {newPods}
            </div>
        )
    }
}

export default Pods;