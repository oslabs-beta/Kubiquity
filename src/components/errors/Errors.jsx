import React from 'react';

import Error from './Error';

const MOCK_ERRORS = [
    {
        message: 'OOM error',
        statusCode: 500,
        createdAt: 'June 16 1934',
        severity: 'Bad',
        recommendedActions: 'Get more memory',
        pod: 10000,
    },
    {
        message: 'OOM error',
        statusCode: 404,
        createdAt: 'June 16 1934',
        severity: 'Bad',
        recommendedActions: 'Get more memory',
        pod: 10000,
    },
    {
        message: 'OOM error 2',
        statusCode: 500,
        createdAt: 'June 16 1934',
        severity: 'Bad',
        recommendedActions: 'Get more memory',
        pod: 10000,
    },
    {
        message: 'OOM error 3',
        statusCode: 500,
        createdAt: 'June 16 1934',
        severity: 'Bad',
        recommendedActions: 'Get more memory',
        pod: 10000,
    },
    {
        message: 'OOM error 4',
        statusCode: 500,
        createdAt: 'June 16 1934',
        severity: 'Bad',
        recommendedActions: 'Get more memory',
        pod: 10000,
    },
];

class Errors extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: []
        }
    }

    componentDidMount() {
        // MOCK ERROR WORK FOR TESTING AND DEVELOPMENT:
        this.setState({ errors: MOCK_ERRORS });

        // getting errors via fetch
        // GET request to /errors

        // TODO: use GET request to /errors once route is written on backend.
        // fetch('/errors')
        //     .then(res => res.json())
        //     .then(data => {
        //         // Once FE is connected to BE, we will have some data.
        //         // That data will include the errors we want to save to state.
        //         const newState = { errors: data };
        //         this.setState(newState)
        //     })
        //     .catch(err => console.log(err));
    }
    
    render() {
        // Goal: render each error by passing each error's information to an Error component. 
        // Errors are in this.state.errors => this.state.errors is an array. 
        // Iterate through our array and create a new array of Error components. 
        const newErrors = [];

        for (let i = 0; i < this.state.errors.length; i++) {
            // if this.state.errors is an array of objects, then currentError is one error object.
            const currentError = this.state.errors[i];

            newErrors.push(
                <Error
                    key={`error${ i }`}
                    {...currentError}
                />
            )
        }

        // After for loop, newErrors will be an array of Error React Components. 

        return (
            <div>
                Errors
                {newErrors}
            </div>
        )
    }
}

export default Errors;