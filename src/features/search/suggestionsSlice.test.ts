import { put, call } from 'redux-saga/effects'
import store from 'store'
import api, { endpoints } from 'utils/api'
import {
    suggestionsInitialState,
    getSuggetions,
    getSuggestionsStart,
    getSuggestionsSuccess,
    getSuggestionsFailure,
    fetchSuggestions,
    resetSuggestions,
} from './suggestionsSlice'

const mockSuggestions = [
    {
        title: 'mock title',
        location_type: 'mock location_type',
        woeid: 123456,
        latt_long: 'mock lat_long',
    },
]

const mockError = new Error('Not Found')

describe('actions', () => {
    test('state should have initial values when no actions have been dispatched', () => {
        const actualState = store.getState().suggestions
        expect(actualState).toEqual(suggestionsInitialState)
    })

    test('calling getSuggestionsStart() should set isLoading to true', () => {
        store.dispatch(getSuggestionsStart())
        const actualState = store.getState().suggestions
        expect(actualState.isLoading).toBe(true)
    })

    test('dispatch getSuggestionsSuccess() should set the locations to the returned payload and error to null', () => {
        store.dispatch(getSuggestionsSuccess(mockSuggestions))
        const actualState = store.getState().suggestions
        expect(actualState.locations).toEqual(mockSuggestions)
        expect(actualState.isLoading).toBe(false)
        expect(actualState.error).toEqual(null)
    })

    test('dispatch getSuggestionsFailure() should clear the locations and set error to the error payload', () => {
        store.dispatch(getSuggestionsFailure(mockError))
        const actualState = store.getState().suggestions
        expect(actualState.locations).toEqual([])
        expect(actualState.isLoading).toBe(false)
        expect(actualState.error).toEqual(mockError.message)
    })
})

describe('fetchSuggestions saga', () => {
    const query = 'mockQuery'

    test('handle a successful request', () => {
        const fetchIterator = fetchSuggestions(getSuggetions(query))
        store.dispatch(resetSuggestions())
        store.dispatch(getSuggetions(query))
        expect(fetchIterator.next().value).toEqual(put(getSuggestionsStart))
        expect(fetchIterator.next().value).toEqual(
            call(api.get, endpoints.suggestion, {
                params: { query },
            })
        )
        expect(fetchIterator.next({ data: mockSuggestions }).value).toEqual(
            put(getSuggestionsSuccess(mockSuggestions))
        )
    })

    test('handle a failing request', () => {
        const fetchIterator = fetchSuggestions(getSuggetions(query))
        store.dispatch(resetSuggestions())
        store.dispatch(getSuggetions(query))
        expect(fetchIterator.next().value).toEqual(put(getSuggestionsStart))
        expect(fetchIterator.next().value).toEqual(
            call(api.get, endpoints.suggestion, {
                params: { query },
            })
        )
        expect(fetchIterator.throw(mockError).value).toEqual(
            put(getSuggestionsFailure(mockError))
        )
    })
})
