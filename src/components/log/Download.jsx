import React from 'react';

const DATA_TYPE = "data:text/csv;charset=utf-8,";
const HEADERS = "Timestamp,Namespace,Type,Reason,Object,Message,Last seen,\n";

const Download = ({ data }) => {
  const handleDownload = e => {
    e.preventDefault();

    let formattedData = DATA_TYPE + HEADERS;
    formattedData += data.map(datum => Object.values(datum).join(',')).join('\n');
    const encodedUri = encodeURI(formattedData);
    debugger
    window.open(encodedUri);
  };

  return (<button onClick={handleDownload}>Download</button>)
}

export default Download;
