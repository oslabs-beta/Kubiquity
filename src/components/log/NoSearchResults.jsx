import React from 'react';
import PropTypes from 'prop-types';

const NoSearchResults = ({ searchTerm }) => (
  <div>
    No results found matching "{searchTerm}"—please refine your search and try again. 
  </div>
);

export default NoSearchResults;
