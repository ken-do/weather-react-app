import React from 'react'
import { render, waitFor } from 'src/utils/testUtils'
import store from 'src/store'
import {
    getDetailsSuccess,
    getDetailsFailure,
    resetDetails,
    getDetailsStart,
} from 'src/features/weather/detailsSlice'
import { location as detailsList } from 'src/server/db.json'
import * as slice from 'src/features/weather/detailsSlice'
import { MAX_FORECASTS, PATH } from 'src/utils/constants'
import Weather from './Weather'

const details = detailsList[0]

describe('Weather view', () => {
    afterEach(() => {
        store.dispatch(resetDetails())
    })

    test('should render a loading indicator when weather data is being fetched', () => {
        store.dispatch(getDetailsStart())
        const { queryByRole, asFragment } = render(<Weather />)
        const loadingIndicator = queryByRole('status')
        expect(loadingIndicator).toBeInTheDocument()
        expect(asFragment()).toMatchSnapshot()
    })

    test('should show a list of weather forecasts when forecast has been fetcheds successfully', () => {
        store.dispatch(getDetailsSuccess(details))
        const { queryAllByRole, asFragment } = render(<Weather />)
        const forecastList = queryAllByRole('article')
        expect(forecastList).toHaveLength(MAX_FORECASTS)
        expect(asFragment()).toMatchSnapshot()
    })

    test('should show a message saying there is not data available by default or if the request failed to return any data', () => {
        const { getByText, rerender, asFragment } = render(<Weather />)
        const noResultsMessage = getByText(/not available/i)
        expect(noResultsMessage).toBeInTheDocument()
        store.dispatch(getDetailsSuccess(null))
        rerender(<Weather />)
        const stillNoResultsMessage = getByText(/not available/i)
        expect(stillNoResultsMessage).toBeInTheDocument()
        store.dispatch(getDetailsFailure(new Error('Error fetching details')))
        rerender(<Weather />)
        const stilAgainlNoResultsMessage = getByText(/not available/i)
        expect(stilAgainlNoResultsMessage).toBeInTheDocument()
        expect(asFragment()).toMatchSnapshot()
    })

    test('should fetch location details when there is a "woeid" url param', () => {
        const { rerender, asFragment } = render(<Weather />)
        const url = `${PATH.weather}/123456`
        window.history.pushState({}, '', url)
        const spy = jest.spyOn(slice, 'getDetails')
        rerender(<Weather />)
        waitFor(() => {
            expect(spy).toHaveBeenCalledWith()
        })
        spy.mockRestore()
        expect(asFragment()).toMatchSnapshot()
    })
})
