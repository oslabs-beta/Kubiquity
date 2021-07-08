import React from 'react';

import Table from '../table/Table.jsx';

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

class Logs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logs: [],
    };
  }

  componentDidMount() {
    // TODO: update to not use a localhost path
    fetch('http://localhost:3000/errors/test')
      .then(res => res.json())
      .then(logs => this.setState({ logs }))
      .catch(err => console.log(err));
  }

  render() {
    return (
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
        {this.state.logs.length ? (
          <Table
            data={this.state.logs}
            headers={LOG_HEADERS}
          />
        ) : (
          <>Loading logs, please wait . . . </>)
        }
      </div>
    )
  }
}

export default Logs;
