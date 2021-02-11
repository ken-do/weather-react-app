import React from 'react'
import { render, waitFor } from 'src/utils/testUtils'
import store from 'src/store'
import {
    getLocationsSuccess,
    getLocationsFailure,
    resetLocations,
    getLocationsStart,
} from 'src/features/location/locationsSlice'
import { search as locations } from 'src/server/db.json'
import * as slice from 'src/features/location/locationsSlice'
import { PATH } from 'src/utils/constants'
import Location from './Location'

describe('Location view', () => {
    afterEach(() => {
        store.dispatch(resetLocations())
    })

    test('should render a loading indicator when location data is being fetched', () => {
        store.dispatch(getLocationsStart())
        const { queryByRole, asFragment } = render(<Location />)
        const loadingIndicator = queryByRole('status')
        expect(loadingIndicator).toBeInTheDocument()
        expect(asFragment()).toMatchSnapshot()
    })

    test('should show a list of locations after location data was', () => {
        store.dispatch(getLocationsSuccess(locations))
        const { queryAllByRole, asFragment } = render(<Location />)
        const locationList = queryAllByRole('article')
        expect(locationList).toHaveLength(locations.length)
        expect(asFragment()).toMatchSnapshot()
    })

    test('should show a message saying there is no results by default or if the request failed to return any data', () => {
        const { getByText, rerender, asFragment } = render(<Location />)
        const noResultsMessage = getByText(/no results/i)
        expect(noResultsMessage).toBeInTheDocument()
        store.dispatch(getLocationsSuccess([]))
        rerender(<Location />)
        const stillNoResultsMessage = getByText(/no results/i)
        expect(stillNoResultsMessage).toBeInTheDocument()
        store.dispatch(getLocationsFailure(new Error('Error fetching')))
        rerender(<Location />)
        const stillAgainNoResultsMessage = getByText(/no results/i)
        expect(stillAgainNoResultsMessage).toBeInTheDocument()
        expect(asFragment()).toMatchSnapshot()
    })

    test('should fetch locations when there is a "query" param', () => {
        const { rerender, asFragment } = render(<Location />)
        const url = `${PATH.location}?query=san`
        window.history.pushState({}, '', url)
        const spy = jest.spyOn(slice, 'getLocations')
        rerender(<Location />)
        waitFor(() => {
            expect(spy).toHaveBeenCalledWith()
        })
        spy.mockRestore()
        expect(asFragment()).toMatchSnapshot()
    })
})
