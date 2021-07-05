import React, { useMemo } from 'react';
import { useTable } from 'react-table';

const ErrorsTable = ({ data }) => {
  debugger
  const values = useMemo(() => data, []);

  const columns = useMemo(() => ([
    {
      Header: 'Message',
      accessor: 'message',
    },
    {
      Header: 'Status Code',
      accessor: 'statusCode',
    },
    {
      Header: 'Timestamp',
      accessor: 'createdAt',
    },
    {
      Header: 'Severity',
      accessor: 'severity',
    },
    {
      Header: 'Recommended Actions',
      accessor: 'recommendedActions',
    },
    {
      Header: 'Pod ID',
      accessor: 'pod',
    },
  ]),[]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: 'solid 3px red',
                  background: 'aliceblue',
                  color: 'black',
                  fontWeight: 'bold',
                }}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '10px',
                      border: 'solid 1px gray',
                      background: 'papayawhip',
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
};

export default ErrorsTable;
