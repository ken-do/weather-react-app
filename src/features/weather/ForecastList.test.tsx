import { render } from 'utils/testUtils'
import React from 'react'
import { location } from 'server/db.json'
import { LocationDetails } from 'types/data'
import { MAX_FORECASTS } from 'utils/constants'
import { UTCStringToHours } from 'utils/formatters'
import ForecastList from './ForecastList'

const locationDetails = location[0] as LocationDetails

describe('ForecastList', () => {
    test('should render a location name and the local time', () => {
        const { container } = render(
            <ForecastList locationDetails={locationDetails} />
        )
        const localTime = UTCStringToHours(locationDetails.time)
        expect(container).toHaveTextContent(locationDetails.title)
        expect(container).toHaveTextContent(localTime)
    })

    test('should render a list of forecasts up to some defined maximum', () => {
        const { queryAllByRole } = render(
            <ForecastList locationDetails={locationDetails} />
        )
        const forecastList = queryAllByRole('article')
        expect(forecastList).toHaveLength(MAX_FORECASTS)
    })

    test('should match the most recent snapshot', () => {
        const { asFragment } = render(
            <ForecastList locationDetails={locationDetails} />
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
