import React, { memo } from 'react'
import { Location } from 'types/data'
import LocationEntry from './LocationEntry'

interface Props {
    locations: Location[]
}

const LocationList = ({ locations }: Props) => {
    return (
        <div className="row">
            {locations.map((location) => (
                <LocationEntry key={location.woeid} location={location} />
            ))}
        </div>
    )
}

export default memo(LocationList)
