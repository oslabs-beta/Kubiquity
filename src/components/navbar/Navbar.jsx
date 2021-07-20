import React from 'react';
import PropTypes from 'prop-types';

import NavButton from './NavButton';

import { HOME, LOG, METRICS, ABOUT, NAV_OPTIONS } from './navbarConstants';

const Navbar = ({
  setIsLogShowing,
  setAreMetricsShowing,
  setIsAboutShowing,
}) => {
  const navOptionToStateUpdater = {
    [LOG]: setIsLogShowing,
    [METRICS]: setAreMetricsShowing,
    [ABOUT]: setIsAboutShowing,
  };

  const handleClick = (e) => {
    const { textContent } = e.target;
    const areAllShowing = textContent === HOME;

    for (let i = 1; i < NAV_OPTIONS.length; i++) {
      const navOption = NAV_OPTIONS[i];
      const stateUpdater = navOptionToStateUpdater[navOption];
      const shouldDisplay = areAllShowing || textContent === navOption;

      stateUpdater(shouldDisplay);
    }
  };

  const buttons = NAV_OPTIONS.map((navOption, i) => (
    <NavButton
      key={`navOption-${navOption}-${i}`}
      id={navOption}
      navOption={navOption}
      handleClick={handleClick}
    />
  ));

  return <ul>{buttons}</ul>;
};

Navbar.propTypes = {
  setIsLogShowing: PropTypes.func.isRequired,
  setAreMetricsShowing: PropTypes.func.isRequired,
  setIsAboutShowing: PropTypes.func.isRequired,
};

export default Navbar;
