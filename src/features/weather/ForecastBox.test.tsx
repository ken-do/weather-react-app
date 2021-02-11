import { render } from 'src/utils/testUtils'
import React from 'react'
import { location as forecastList } from 'src/server/db.json'
import { ConsolidatedWeather } from 'src/types/data'
import { dateToFriendlyDate } from 'src/utils/formatters'
import ForecastBox from './ForecastBox'

const forecast = forecastList[0].consolidated_weather[0] as ConsolidatedWeather
const {
    applicable_date: applicableDate,
    min_temp: minTemp,
    max_temp: maxTemp,
} = forecast

describe('ForecastBox', () => {
    test('should render min and max temperature of a given date', () => {
        const { container } = render(<ForecastBox forecast={forecast} />)
        const weatherDate = dateToFriendlyDate(applicableDate)
        const weatherMaxTemp = Math.round(maxTemp).toString()
        const weatherMinTemp = Math.round(minTemp).toString()
        expect(container).toHaveTextContent(weatherDate)
        expect(container).toHaveTextContent(weatherMaxTemp)
        expect(container).toHaveTextContent(weatherMinTemp)
    })

    test('should match the most recent snapshot', () => {
        const { asFragment } = render(<ForecastBox forecast={forecast} />)
        expect(asFragment()).toMatchSnapshot()
    })
})
