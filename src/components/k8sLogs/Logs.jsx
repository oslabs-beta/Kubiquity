import React from 'react';

import Table from './Table.jsx';
import Loading from '../loading/Loading.jsx';

const LOG_HEADERS = [
  {
    Header: 'Timestamp',
    accessor: 'createdAt',
    sortType: 'basic',
  },
  {
    Header: 'Namespace',
    accessor: 'namespace',
    sortType: 'basic',
  },
  {
    Header: 'Type',
    accessor: 'type',
    sortType: 'basic',
  },
  {
    Header: 'Reason',
    accessor: 'reason',
    sortType: 'basic',
  },
  {
    Header: 'Object',
    accessor: 'object',
    sortType: 'basic',
  },
  {
    Header: 'Message',
    accessor: 'message',
    sortType: 'basic',
  },
  {
    Header: 'Last seen',
    accessor: 'lastSeen',
    sortType: 'basic',
  },
];

const Logs = ({ logs }) => (
  <div>
    <div className="section-headers">
      KUBERNETES LOGS
    </div>
    <div
      className="sub-header"
      id="log-sub-header"
    >
      Use the Kubiquity logs to find and resolve errors. 
    </div>
    {logs.length ? (
      <Table
        data={logs}
        headers={LOG_HEADERS}
      />
    ) : (
      <Loading resource={'logs'} />
    )}
  </div>
);

export default Logs;
