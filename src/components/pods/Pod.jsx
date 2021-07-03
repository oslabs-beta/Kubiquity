import React from 'react';

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
        <div>Name: {name}</div>
        <div>Current Memory Useage: {currentMemoryUsage}</div>
        <div>Parent Node ID: {parentNode}</div>
      </>
    );
  }
}

export default Pod;