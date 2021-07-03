import React from 'react';

const PodError = ({
  message,
  statusCode,
  createdAt,
  severity,
  recommendedActions,
  pod,
}) => (
  <>
    <div>Error</div>
    <div>Error message: {message}</div>
    <div>Status code: {statusCode}</div>
    <div>Time of error: {createdAt}</div>
    <div>Level of severity: {severity}</div>
    <div>Recommended actions: {recommendedActions}</div>
    <div>Pod: {pod}</div>
  </>
);

export default PodError;
