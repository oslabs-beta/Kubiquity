import React from 'react';
import PropTypes from 'prop-types';

const NoSearchResults = ({ searchTerm }) => (
  <div id="no-search-results">
    No results found matching "{searchTerm}"—please refine your search and try again. 
  </div>
);

NoSearchResults.propTypes = {
  searchTerm: PropTypes.string.isRequired,
}

export default NoSearchResults;
