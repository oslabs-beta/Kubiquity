import React from 'react';

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

const Sidebar = ({
  setIsLogsShowing,
  setIsMetricsShowing,
  setIsAboutShowing,
}) => {
  const navOptionToStateUpdater = {
    [LOG]: setIsLogsShowing,
    [METRICS]: setIsMetricsShowing,
    [ABOUT]: setIsAboutShowing,
  };

  const handleClick = e => {
    const { value } = e.target;
    const areAllShowing = value === 'Home';

    for (let i = 1; i < NAV_OPTIONS.length; i++) {
      const navOption = NAV_OPTIONS[i];
      const stateUpdater = navOptionToStateUpdater[navOption];

      stateUpdater(areAllShowing || value === navOption);
    }
  };

  const buttons = NAV_OPTIONS.map((navOption, i) => (
    <li key={`navOption-${navOption}-${i}`}>
      <button onClick={handleClick}>
        {navOption}
      </button>
    </li>
  ));

  return (
    <ul>
      {buttons}
    </ul>
  )
};

export default Sidebar;
