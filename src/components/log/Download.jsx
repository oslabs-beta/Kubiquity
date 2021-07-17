import React, { useState } from 'react';
import CsvDownloader from 'react-csv-downloader';

const COLUMNS = [
  {
    id: 'createdAt',
    displayName: 'Timestamp',
  },
  {
    displayName: 'Namespace',
    id: 'namespace',
  },
  {
    displayName: 'Type',
    id: 'type',
  },
  {
    displayName: 'Reason',
    id: 'reason',
  },
  {
    displayName: 'Object',
    id: 'object',
  },
  {
    displayName: 'Message',
    id: 'message',
  },
  {
    displayName: 'Last seen',
    id: 'lastSeen',
  },
];

const DOWNLOADED_STYLE = {
  background: '#5aa25a',
  color: 'white',
  transition: '300ms all',
  borderRadius: '5px',
  padding: '5px',
};

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
      columns={COLUMNS}
    >
      <button
        id="download-button"
        style={hasDownloaded ? DOWNLOADED_STYLE : null}
        onClick={handleClick}
      >Download{hasDownloaded ? 'ed!' : ''}</button>
    </CsvDownloader>
  )
}

export default Download;
