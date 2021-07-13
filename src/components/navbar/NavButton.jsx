import React from 'react';
import PropTypes from 'prop-types';

const NavButton = ({ navOption, handleClick }) => (
  <li>
    <button onClick={handleClick}>
      {navOption}
    </button>
  </li>
);

NavButton.propTypes = {
  navOption: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default NavButton;
