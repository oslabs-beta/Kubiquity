import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CsvDownloader from 'react-csv-downloader';

import { CSV_COLUMNS, DOWNLOADED_STYLE } from './logConstants';

const Download = ({ data }) => {
  const [hasDownloaded, setHasDownloaded] = useState(false);

  const handleClick = () => {
    setHasDownloaded(true);
    setTimeout(() => setHasDownloaded(false), 3000);
  };

  return (
    <CsvDownloader
      filename="kubernetes-event-logs"
      datas={data}
      columns={CSV_COLUMNS}
    >
      <button
        id="download-button"
        style={hasDownloaded ? DOWNLOADED_STYLE : null}
        onClick={handleClick}
      >
        Download{hasDownloaded ? 'ed!' : ''}
      </button>
    </CsvDownloader>
  )
}

Download.propTypes = {
  data: PropTypes.array.isRequired,
}

export default Download;
