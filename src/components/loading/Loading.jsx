import React from 'react';
import PropTypes from 'prop-types';

const SVG_WIDTH_HEIGHT = 200;
const PATH_PROPS = {
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  strokeMiterlimit: 10 ,
};

const Loading = ({ resource }) => (
  <div id="loading-container">
    Loading {resource}, please wait . . .
    <div id="loading">
      <svg
        width={SVG_WIDTH_HEIGHT}
        height={SVG_WIDTH_HEIGHT}
      >
        <path
          id="infinity-outline"
          {...PATH_PROPS}
          d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"
        />
        <path
          id="infinity-bg"
          {...PATH_PROPS}
          d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"
        />
      </svg>
    </div>
  </div>
);

Loading.propTypes = {
  resource: PropTypes.oneOf([
    'log',
    'metrics',
    'CPU use'
  ]).isRequired,
};

export default Loading;
