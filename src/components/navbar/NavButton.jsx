import React from 'react';
import PropTypes from 'prop-types';

import { NAV_OPTIONS } from './navbarConstants';

const NavButton = ({ navOption, handleClick }) => (
  <li>
    <button onClick={handleClick}>
      {navOption}
    </button>
  </li>
);

NavButton.propTypes = {
  navOption: PropTypes.oneOf(NAV_OPTIONS).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default NavButton;
