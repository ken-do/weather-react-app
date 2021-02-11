import React, { memo } from 'react'

interface Props {
    heading: string
    subHeading: string
}

const EmptyStateMessage = ({ heading, subHeading }: Props) => {
    return (
        <div>
            <h1 className="mr-3 pr-3 align-top border-right inline-block align-content-center">
                {heading}
            </h1>
            <div className="inline-block align-middle">
                <h2 className="font-weight-normal lead" id="desc">
                    {subHeading}
                </h2>
            </div>
        </div>
    )
}

export default memo(EmptyStateMessage)
