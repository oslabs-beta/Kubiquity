import React from 'react';

import NavButton from './NavButton';

const HOME = 'Home';
const LOG = 'Log';
const METRICS = 'Metrics';
const ABOUT = 'About';

const NAV_OPTIONS = [
  HOME,
  LOG,
  METRICS,
  ABOUT
];

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

  const handleClick = e => {
    const { id } = e.target;
    const areAllShowing = id === 'Home';

    for (let i = 1; i < NAV_OPTIONS.length; i++) {
      const navOption = NAV_OPTIONS[i];
      const stateUpdater = navOptionToStateUpdater[navOption];

      stateUpdater(areAllShowing || id === navOption);
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

  return (
    <ul>
      {buttons}
    </ul>
  )
};

export default Navbar;
