import React from 'react';

const NavButton = ({ navOption, handleClick }) => (
  <li>
    <button onClick={handleClick}>
      {navOption}
    </button>
  </li>
);

export default NavButton;
