import React from 'react';

class Error extends React.Component {
    render() {
        const {
            message,
            statusCode,
            createdAt,
            severity,
            recommendedActions,
            pod,
        } = this.props;

        return (
            <>
                <div>Error</div>
                <div>Error message: {message}</div>
                <div>Status code: {statusCode}</div>
                <div>Time of error: {createdAt}</div>
                <div>Level of severity: {severity}</div>
                <div>Recommended actions: {recommendedActions}</div>
                <div>Pod: {pod}</div>
            </>
        )
    }
}

export default Error;