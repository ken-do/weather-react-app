import { put, call } from 'redux-saga/effects'
import store from 'src/store'
import api, { endpoints } from 'src/utils/api'
import { search as locations } from 'src/server/db.json'
import {
    locationsInitialState,
    getLocations,
    getLocationsStart,
    getLocationsSuccess,
    getLocationsFailure,
    fetchLocations,
    resetLocations,
} from './locationsSlice'

const mockLocations = locations
const mockError = new Error('Not Found')

describe('actions', () => {
    test('state should have initial values when no actions have been dispatched', () => {
        const actualState = store.getState().locations
        expect(actualState).toEqual(locationsInitialState)
    })

    test('calling getLocationsStart() should set isLoading to true', () => {
        store.dispatch(getLocationsStart())
        const actualState = store.getState().locations
        expect(actualState.isLoading).toBe(true)
    })

    test('dispatch getLocationsSuccess() should set the locations to the returned payload and error to null', () => {
        store.dispatch(getLocationsSuccess(mockLocations))
        const actualState = store.getState().locations
        expect(actualState.entries).toEqual(mockLocations)
        expect(actualState.isLoading).toBe(false)
        expect(actualState.error).toEqual(null)
    })

    test('dispatch getLocationsFailure() should clear the locations and set error to the error payload', () => {
        store.dispatch(getLocationsFailure(mockError))
        const actualState = store.getState().locations
        expect(actualState.entries).toEqual([])
        expect(actualState.isLoading).toBe(false)
        expect(actualState.error).toEqual(mockError.message)
    })
})

describe('fetchLocations saga', () => {
    const query = 'mockQuery'

    test('handle a successful request', () => {
        const fetchIterator = fetchLocations(getLocations(query))
        store.dispatch(resetLocations())
        store.dispatch(getLocations(query))
        expect(fetchIterator.next().value).toEqual(put(getLocationsStart()))
        expect(fetchIterator.next().value).toEqual(
            call(api.get, endpoints.locationSearch, {
                params: { query },
            })
        )
        expect(fetchIterator.next({ data: mockLocations }).value).toEqual(
            put(getLocationsSuccess(mockLocations))
        )
    })

    test('handle a failing request', () => {
        const fetchIterator = fetchLocations(getLocations(query))
        store.dispatch(resetLocations())
        store.dispatch(getLocations(query))
        expect(fetchIterator.next().value).toEqual(put(getLocationsStart()))
        expect(fetchIterator.next().value).toEqual(
            call(api.get, endpoints.locationSearch, {
                params: { query },
            })
        )
        expect(fetchIterator.throw(mockError).value).toEqual(
            put(getLocationsFailure(mockError))
        )
    })
})
