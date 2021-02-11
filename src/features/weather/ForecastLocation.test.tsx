import { render } from 'src/utils/testUtils'
import React from 'react'
import { location as weatherList } from 'src/server/db.json'
import { LocationDetails } from 'src/types/data'
import { UTCStringToHours } from 'src/utils/formatters'
import ForecastLocation from './ForecastLocation'

const locationDetails = weatherList[0] as LocationDetails

describe('ForecastLocation', () => {
    test('should render a location name and the local time', () => {
        const { container } = render(
            <ForecastLocation locationDetails={locationDetails} />
        )
        const localTime = UTCStringToHours(locationDetails.time)
        expect(container).toHaveTextContent(locationDetails.title)
        expect(container).toHaveTextContent(localTime)
    })

    test('should match the most recent snapshot', () => {
        const { asFragment } = render(
            <ForecastLocation locationDetails={locationDetails} />
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
