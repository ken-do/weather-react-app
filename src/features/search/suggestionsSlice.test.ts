import { put, call, cancelled } from 'redux-saga/effects'
import store from 'src/store'
import api, { endpoints } from 'src/utils/api'
import { search as locations } from 'src/server/db.json'
import { Location } from 'src/types/data'
import { MAX_SUGGESTIONS } from 'src/utils/constants'
import axios from 'axios'
import {
    suggestionsInitialState,
    getSuggestions,
    getSuggestionsStart,
    getSuggestionsSuccess,
    getSuggestionsFailure,
    fetchSuggestions,
    resetSuggestions,
} from './suggestionsSlice'

const source = axios.CancelToken.source()

const suggestions = locations as Location[]
const error = new Error('Not Found')

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

    test('dispatch getSuggestionsSuccess() should set error to null and locations to the returned payload up to some defined maximum', () => {
        store.dispatch(getSuggestionsSuccess(suggestions))
        const actualState = store.getState().suggestions
        expect(actualState.locations).toEqual(
            suggestions.slice(0, MAX_SUGGESTIONS)
        )
        expect(actualState.isLoading).toBe(false)
        expect(actualState.error).toEqual(null)
    })

    test('dispatch getSuggestionsFailure() should clear the locations and set error to the error payload', () => {
        store.dispatch(getSuggestionsFailure(error))
        const actualState = store.getState().suggestions
        expect(actualState.locations).toEqual([])
        expect(actualState.isLoading).toBe(false)
        expect(actualState.error).toEqual(error.message)
    })
})

describe('fetchSuggestions saga', () => {
    const query = 'mockQuery'

    test('return if payload is empty', () => {
        const fetchIterator = fetchSuggestions(getSuggestions(''))
        expect(fetchIterator.next().done).toBe(true)
    })

    test('handle a successful request', () => {
        const fetchIterator = fetchSuggestions(getSuggestions(query))
        store.dispatch(resetSuggestions())
        store.dispatch(getSuggestions(query))
        expect(fetchIterator.next().value).toEqual(put(getSuggestionsStart()))
        expect(fetchIterator.next().value).toEqual(
            call(api.get, endpoints.locationSearch, {
                params: { query },
                cancelToken: source.token,
            })
        )
        expect(fetchIterator.next({ data: suggestions }).value).toEqual(
            put(getSuggestionsSuccess(suggestions))
        )
    })

    test('handle a failing request', () => {
        const fetchIterator = fetchSuggestions(getSuggestions(query))
        store.dispatch(resetSuggestions())
        store.dispatch(getSuggestions(query))
        expect(fetchIterator.next().value).toEqual(put(getSuggestionsStart()))
        expect(fetchIterator.next().value).toEqual(
            call(api.get, endpoints.locationSearch, {
                params: { query },
                cancelToken: source.token,
            })
        )
        expect(fetchIterator.throw(error).value).toEqual(
            put(getSuggestionsFailure(error))
        )
    })

    test('handle a cancelled request', () => {
        const fetchIterator = fetchSuggestions(getSuggestions(query))
        store.dispatch(resetSuggestions())
        store.dispatch(getSuggestions(query))
        expect(fetchIterator.next().value).toEqual(put(getSuggestionsStart()))
        expect(fetchIterator.next().value).toEqual(
            call(api.get, endpoints.locationSearch, {
                params: { query },
                cancelToken: source.token,
            })
        )
        expect(fetchIterator.return().value).toEqual(cancelled())
        expect(fetchIterator.next(true).value).toEqual(put(resetSuggestions()))
    })
})
