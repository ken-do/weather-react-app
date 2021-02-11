import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

const LoadingIndicator = () => {
    return (
        <div role="status" aria-label="Loading" style={{ textAlign: 'center' }}>
            <Spinner className="m-1" animation="grow" variant="primary" />
            <Spinner className="m-1" animation="grow" variant="secondary" />
            <Spinner className="m-1" animation="grow" variant="success" />
            <Spinner className="m-1" animation="grow" variant="danger" />
            <Spinner className="m-1" animation="grow" variant="warning" />
            <Spinner className="m-1" animation="grow" variant="info" />
            <Spinner className="m-1" animation="grow" variant="dark" />
        </div>
    )
}

export default LoadingIndicator
