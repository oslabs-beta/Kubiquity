import React from 'react';

const TIMESTAMP = 'Timestamp';
const NAMESPACE = 'Namespace';
const TYPE = 'Type';
const OBJECT = 'Object';
const MESSAGE = 'Message';
const LAST_SEEN = 'Last seen';
const REASON = 'Reason';

const CREATED_AT_CAMEL_CASE = 'createdAt';
const NAMESPACE_CAMEL_CASE = 'namespace';
const TYPE_CAMEL_CASE = 'type';
const OBJECT_CAMEL_CASE = 'object';
const MESSAGE_CAMEL_CASE = 'message';
const LAST_SEEN_CAMEL_CASE = 'lastSeen';
const REASON_CAMEL_CASE = 'reason';

const BASIC_SORT = 'basic';

const sortByTimestamp = (a, b) => (
  new Date(b.original.createdAt) - new Date(a.original.createdAt)
);

export const LOG_HEADERS = [
  {
    Header: TIMESTAMP,
    accessor: CREATED_AT_CAMEL_CASE,
    sortType: sortByTimestamp,
  },
  {
    Header: NAMESPACE,
    accessor: NAMESPACE_CAMEL_CASE,
    sortType: BASIC_SORT,
  },
  {
    Header: TYPE,
    accessor: TYPE_CAMEL_CASE,
    sortType: BASIC_SORT,
  },
  {
    Header: REASON,
    accessor: REASON_CAMEL_CASE,
    sortType: BASIC_SORT,
  },
  {
    Header: OBJECT,
    accessor: OBJECT_CAMEL_CASE,
    sortType: BASIC_SORT,
  },
  {
    Header: MESSAGE,
    accessor: MESSAGE_CAMEL_CASE,
    sortType: BASIC_SORT,
  },
  {
    Header: LAST_SEEN,
    accessor: LAST_SEEN_CAMEL_CASE,
    disableSortBy: true,
  },
];

export const CSV_COLUMNS = [
  {
    displayName: TIMESTAMP,
    id: CREATED_AT_CAMEL_CASE,
  },
  {
    displayName: NAMESPACE,
    id: NAMESPACE_CAMEL_CASE,
  },
  {
    displayName: TYPE,
    id: TYPE_CAMEL_CASE,
  },
  {
    displayName: REASON,
    id: REASON_CAMEL_CASE,
  },
  {
    displayName: OBJECT,
    id: OBJECT_CAMEL_CASE,
  },
  {
    displayName: MESSAGE,
    id: MESSAGE_CAMEL_CASE,
  },
  {
    displayName: LAST_SEEN,
    id: LAST_SEEN_CAMEL_CASE,
  },
];

const FIVE_PX = '5px';

export const DOWNLOADED_STYLE = {
  background: '#5aa25a',
  color: 'white',
  transition: '300ms all',
  borderRadius: FIVE_PX,
  padding: FIVE_PX,
};

export const HEADER = 'Header';
export const NORMAL = 'Normal';
export const CELL = 'Cell';

export const ROW_RED_BACKGROUND_STYLE = {
  backgroundColor: '#de8989',
  fontWeight: 'bold',
  color: '#f8f8f8',
};

export const DOWN_ARROW = (<div>&#128317;</div>);
export const UP_ARROW = (<div>&#128316;</div>);
