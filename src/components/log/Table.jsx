import React from 'react';
import PropTypes from 'prop-types';
import { useTable, useSortBy } from 'react-table';

import {
  HEADER,
  CELL,
  NORMAL,
  ROW_RED_BACKGROUND_STYLE,
  DOWN_ARROW,
  UP_ARROW,
} from './logConstants';

const Table = ({ data, headers }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns: headers,
    data,
  }, useSortBy);

  const tableProps = getTableProps();
  const tableBodyProps = getTableBodyProps();

  const headerComponents = headerGroups.map(headerGroup => {
    const headerProps = headerGroup.getHeaderGroupProps();

    return (
      <tr {...headerProps}>
        {headerGroup.headers.map(column => (
          <th
            {...column.getHeaderProps(column.getSortByToggleProps())}
          >
            {column.render(HEADER)}
            <span>
              {column.isSorted ?
                (column.isSortedDesc ? UP_ARROW : DOWN_ARROW)
              : ''}
            </span>
          </th>
        ))}
      </tr>
    )
  });

  const rowsComponents = rows.map(row => {
    prepareRow(row);
    const { type } = row.original;
    const rowStyles = type === NORMAL ? null : ROW_RED_BACKGROUND_STYLE;

    return (
      <tr
        {...row.getRowProps()}
        style={rowStyles}
      >
        {row.cells.map(cell => {
          const cellProps = cell.getCellProps();

          return (
            <td {...cellProps}>
              {cell.render(CELL)}
            </td>
          )
        })}
      </tr>
    )
  });

  return (
    <div id="table-container">
      <table {...tableProps}>
        <thead>
          {headerComponents}
        </thead>
        <tbody {...tableBodyProps}>
          {rowsComponents}
        </tbody>
      </table>
    </div>
  )
};

Table.propTypes = {
  data: PropTypes.arrayOf(
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
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
      sortType: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string,
      ]),
      disableSortBy: PropTypes.bool,
    })
  ).isRequired,
};

export default Table;
