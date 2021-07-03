import React from 'react';

const Pod = ({
  podId,
  name,
  currentMemoryUsage,
  parentNode,
}) => (
  <>
    <div>Pod</div>
    <div>ID: {podId}</div>
    <div>Name: {name}</div>
    <div>Current Memory Usage: {currentMemoryUsage}</div>
    <div>Parent Node ID: {parentNode}</div>
  </>
);

export default Pod;
