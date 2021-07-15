import React from 'react';
import PropTypes from 'prop-types';
import { useTable, useSortBy } from 'react-table';

// TODO: potentially incorporate filtering: https://codesandbox.io/s/github/tannerlinsley/react-table/tree/master/examples/filtering

const RED_BACKGROUND_STYLE = {
  backgroundColor: '#de8989',
  fontWeight: 'bold',
  color: '#f8f8f8',
};

const DOWN_ARROW = (<div>&#128317;</div>);
const UP_ARROW = (<div>&#128316;</div>);

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
            {column.render('Header')}
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
    const rowStyles = type === 'Normal' ? null : RED_BACKGROUND_STYLE;

    return (
      <tr
        {...row.getRowProps()}
        style={rowStyles}
      >
        {row.cells.map(cell => {
          const cellProps = cell.getCellProps();

          return (
            <td {...cellProps}>
              {cell.render('Cell')}
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
  data: PropTypes.array.isRequired,
  headers: PropTypes.array.isRequired,
};

export default Table;
