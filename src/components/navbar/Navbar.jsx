import React from 'react';

import NavButton from './NavButton';

const HOME = 'Home';
const METRICS = 'Metrics';
const LOG = 'Log';
const ABOUT = 'About';

const NAV_OPTIONS = [
  HOME,
  METRICS,
  LOG,
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
    const { textContent } = e.target;
    const areAllShowing = textContent === 'Home';
    
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

  return (
    <ul>
      {buttons}
    </ul>
  )
};

export default Navbar;
