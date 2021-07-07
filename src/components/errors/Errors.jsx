import React from 'react';

import Table from '../table/Table.jsx';

const ERROR_HEADERS = [
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

class Errors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: [],
    };
  }

  componentDidMount() {
    // TODO: update to not use a localhost path
    fetch('http://localhost:3000/errors/test')
      .then(res => res.json())
      .then(errors => this.setState({ errors }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <div className="section-headers">
          KUBERNETES ERRORS
        </div>
        {this.state.errors.length ? (
          <Table
            data={this.state.errors}
            headers={ERROR_HEADERS}
          />
        ) : (
          <>Loading errors, please wait . . . </>)
        }
      </div>
    )
  }
}

export default Errors;
