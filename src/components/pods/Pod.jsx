import React from 'react';

// Pod might have:
// pod ID
// pod name
// memory usage
// the pod's associated node

class Pod extends React.Component {
  render() {
    const {
      podId,
      name,
      currentMemoryUsage,
      parentNode,
    } = this.props;
    
    return (
      <>
        <div>Pod</div>
        <div>ID: {podId}</div>
        <div>name: {name}</div>
        <div>current memory useage: { currentMemoryUsage}</div>
        <div>Parent Node ID: {parentNode}</div>
      </>
    )
  }
}

export default Pod;