import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Loading } from '../';
import Table from './Table';
import NoSearchResults from './NoSearchResults';
import Download from './Download';

import { LOG_HEADERS } from './logConstants';

const Log = ({ log }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLog, setFilteredLog] = useState(log);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredLog(log);
    } else {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();

      const newFilteredLog = log.filter(entry => {
        const values = Object.values(entry);

        for (const value of values) {
          if (typeof value === 'string' &&
            value.toLowerCase().includes(lowerCaseSearchTerm)
          ) {
            return true;
          }
        }

        return false;
      });

      setFilteredLog(newFilteredLog);
    }

    return () => setFilteredLog(log);
  }, [searchTerm, log]);

  const handleInput = e => {
    const { value } = e.target;
    setSearchTerm(value);
  };

  const resetSearch = () => setSearchTerm('');

  let displayComponent;

  if (!log.length) {
    displayComponent = (
      <Loading resource={'log'} />
    );
  } else if (!filteredLog.length) {
    displayComponent = (
      <NoSearchResults searchTerm={searchTerm} />
    );
  } else {
    displayComponent = (
      <Table
        data={filteredLog}
        headers={LOG_HEADERS}
      />
    );
  }

  return (
    <div>
      <div className="section-headers">
        EVENT LOG
      </div>
      <div
        className="sub-header"
        id="log-sub-header"
      >
        Use the Kubiquity event log to find and resolve errors. 
      </div>
      <div id="input-buttons-container">
        <div>
          <input
            onChange={handleInput}
            value={searchTerm}
            placeholder={'Search the event logs'}
          ></input>
          <button onClick={resetSearch}>Reset</button>
        </div>
        <Download data={filteredLog}/>
      </div>
      {displayComponent}
    </div>
  )
}

Log.propTypes = {
  log: PropTypes.arrayOf(
    PropTypes.shape({
      createdAt: PropTypes.string.isRequired,
      namespace: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      reason: PropTypes.string.isRequired,
      object: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      lastSeen: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Log;
