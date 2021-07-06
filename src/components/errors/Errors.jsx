import React from 'react';

// import PodError from './PodError';
import ErrorsTable from './ErrorsTable';

const MOCK_ERRORS = [
  {
    createdAt: new Date().toISOString(),
    namespace: 'Namespace',
    lastSeen: 'Last seen',
    type: 'Type',
    reason: 'Reason',
    object: 'Object',
    message: 'Message',
  }
];

class Errors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
    }
  }

  componentDidMount() {
    // MOCK ERROR WORK FOR TESTING AND DEVELOPMENT:
    this.setState({ errors: MOCK_ERRORS });

    // TODO: use GET request to /errors once route is written on backend.
    // fetch('/errors')
    //   .then(res => res.json())
    //   .then(errors => {
    //       this.setState({ errors })
    //   }).catch(err => console.log(err));
  }
  
  render() {
    if (!this.state.errors.length) {
      return (
        <>
          Loading errors, please wait . . . 
        </>
      )
    }

    // const errors = this.state.errors
    //   .map((err, i) => <PodError key={`error${ i }`} {...err} />);

    return (
      <div>
        Errors
        <ErrorsTable data={this.state.errors} />
        {/* {errors} */}
      </div>
    )
  }
}

export default Errors;
