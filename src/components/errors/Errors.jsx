import React from 'react';

import ErrorsTable from './ErrorsTable';
import Loading from '../loading/Loading.jsx';

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
          <ErrorsTable data={this.state.errors} />
        ) : (
          <Loading resource={'logs'}/>
        )}
      </div>
    )
  }
}

export default Errors;
