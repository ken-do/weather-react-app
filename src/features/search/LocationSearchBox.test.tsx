/* eslint-disable import/first */
jest.mock('src/utils/api')
import React from 'react'
import { PATH, EVENT_KEYS } from 'src/utils/constants'
import { fireEvent, render } from 'src/utils/testUtils'
import store from 'src/store'
import { search as locations } from 'src/server/db.json'
import LocationSearchBox from './LocationSearchBox'
import * as slice from './suggestionsSlice'
import { getSuggestionsSuccess, resetSuggestions } from './suggestionsSlice'

describe('LocationSearchBox', () => {
    afterEach(() => {
        store.dispatch(resetSuggestions())
    })

    test('should match the snapshot for empty state', () => {
        const { asFragment } = render(<LocationSearchBox />)
        expect(asFragment()).toMatchSnapshot()
    })

    test('should match the snapshot when there are suggestions available', () => {
        store.dispatch(getSuggestionsSuccess(locations))
        const { asFragment } = render(<LocationSearchBox />)
        expect(asFragment()).toMatchSnapshot()
    })

    test('should fetch suggestions when input value changes', () => {
        return new Promise((resolve) => {
            const getSuggestionsSpy = jest.spyOn(slice, 'getSuggestions')
            const { getByRole } = render(<LocationSearchBox />)
            const input = getByRole('textbox')
            const value = 'san'
            fireEvent.change(input, { target: { value } })
            setTimeout(() => {
                expect(getSuggestionsSpy).toHaveBeenCalledWith(value)
                resolve(value)
            }, 1000)
        })
    })

    test('should toggle suggestions based on the availability of suggestions data from the store', () => {
        store.dispatch(getSuggestionsSuccess(locations))
        const { queryByText } = render(<LocationSearchBox />)
        const firstSuggestion = queryByText(locations[0].title)
        expect(firstSuggestion).toBeInTheDocument()
        store.dispatch(resetSuggestions())
        const emptyFirstSuggestion = queryByText(locations[0].title)
        expect(emptyFirstSuggestion).toBeNull()
    })

    test('should navigate to the corresponding weather page when a suggestion is clicked on', () => {
        jest.useFakeTimers()
        store.dispatch(getSuggestionsSuccess(locations))
        const { getByText } = render(<LocationSearchBox />)
        const firstSuggestion = getByText(locations[0].title)
        fireEvent.click(firstSuggestion)
        jest.runAllTimers()
        expect(window.location.pathname).toBe(
            `${PATH.weather}/${locations[0].woeid}`
        )
    })

    test('should navigate to  the /location page with the correct query param when clicking on the search button', () => {
        const { getByRole } = render(<LocationSearchBox />)
        const input = getByRole('textbox')
        const button = getByRole('button')
        const value = 'san'
        fireEvent.change(input, { target: { value } })
        expect(input).toHaveValue(value)
        setTimeout(() => {
            fireEvent.click(button)
            expect(window.location.pathname).toBe(
                `${PATH.location}?query=${value}`
            )
        }, 1000)
    })

    test('should navigate to  the /location page with the correct query param when hitting the Enter key', () => {
        const { getByRole } = render(<LocationSearchBox />)
        const input = getByRole('textbox')
        const value = 'san'
        fireEvent.change(input, { target: { value } })
        expect(input).toHaveValue(value)
        setTimeout(() => {
            fireEvent.keyPress(document, { key: EVENT_KEYS.enter })
            expect(window.location.pathname).toBe(
                `${PATH.location}?query=${value}`
            )
        }, 1000)
    })
})
