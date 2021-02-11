import { put, call } from 'redux-saga/effects'
import store from 'store'
import api, { endpoints } from 'utils/api'
import { location as detailsList } from 'server/db.json'
import {
    detailsInitialState,
    getDetails,
    getDetailsStart,
    getDetailsSuccess,
    getDetailsFailure,
    fetchDetails,
    resetDetails,
} from './detailsSlice'

const details = detailsList[0]
const error = new Error('Not Found')

describe('actions', () => {
    test('state should have initial values when no actions have been dispatched', () => {
        const actualState = store.getState().details
        expect(actualState).toEqual(detailsInitialState)
    })

    test('calling getDetailsStart() should set isLoading to true', () => {
        store.dispatch(getDetailsStart())
        const actualState = store.getState().details
        expect(actualState.isLoading).toBe(true)
    })

    test('dispatch getDetailsSuccess() should set the details to the returned payload and error to null', () => {
        store.dispatch(getDetailsSuccess(details))
        const actualState = store.getState().details
        expect(actualState.location).toEqual(details)
        expect(actualState.isLoading).toBe(false)
        expect(actualState.error).toEqual(null)
    })

    test('dispatch getDetailsFailure() should clear the details and set error to the error payload', () => {
        store.dispatch(getDetailsFailure(error))
        const actualState = store.getState().details
        expect(actualState.location).toEqual(null)
        expect(actualState.isLoading).toBe(false)
        expect(actualState.error).toEqual(error.message)
    })
})

describe('fetchDetails saga', () => {
    const id = '123456'

    test('handle a successful request', () => {
        const fetchIterator = fetchDetails(getDetails(id))
        store.dispatch(resetDetails())
        store.dispatch(getDetails(id))
        expect(fetchIterator.next().value).toEqual(put(getDetailsStart()))
        expect(fetchIterator.next().value).toEqual(
            call(api.get, `${endpoints.locationDetails}/${id}`)
        )
        expect(fetchIterator.next({ data: details }).value).toEqual(
            put(getDetailsSuccess(details))
        )
    })

    test('handle a failing request', () => {
        const fetchIterator = fetchDetails(getDetails(id))
        store.dispatch(resetDetails())
        store.dispatch(getDetails(id))
        expect(fetchIterator.next().value).toEqual(put(getDetailsStart()))
        expect(fetchIterator.next().value).toEqual(
            call(api.get, `${endpoints.locationDetails}/${id}`)
        )
        expect(fetchIterator.throw(error).value).toEqual(
            put(getDetailsFailure(error))
        )
    })
})
