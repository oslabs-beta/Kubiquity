import React from 'react';
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

const Download = ({ data }) => {
  return (
    <CsvDownloader filename="kubernetes-event-logs" datas={data} columns={COLUMNS} />
  )
}

export default Download;
