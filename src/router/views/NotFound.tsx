import React from 'react'
import { EmptyStateMessage } from 'components'

const NotFound = () => (
    <EmptyStateMessage
        heading="404"
        subHeading="The page you requested was not found."
    />
)

export default NotFound
