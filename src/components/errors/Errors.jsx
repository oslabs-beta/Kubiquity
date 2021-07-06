import React from 'react';

import ErrorsTable from './ErrorsTable';

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
    if (!this.state.errors.length) {
      return (
        <>Loading errors, please wait . . . </>
      )
    }

    return (
      <div>
        Errors
        <ErrorsTable data={this.state.errors} />
      </div>
    )
  }
}

export default Errors;
