import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit'
import { call, put, spawn, takeLatest } from 'redux-saga/effects'
import api, { endpoints } from 'src/utils/api'
import {
    cancelSuggestions,
    watchFetchSuggestions,
} from 'src/features/search/suggestionsSlice'
import { Location } from '../../types/data'

interface LocationsState {
    isLoading: boolean
    entries: Location[]
    error: string | null
}

interface RequestResponse {
    data: Location[]
}

export const locationsInitialState: LocationsState = {
    isLoading: false,
    entries: [],
    error: null,
}

function reset(state: LocationsState) {
    state.isLoading = false
    state.entries = []
    state.error = null
}

function startLoading(state: LocationsState) {
    state.isLoading = true
}

function loadingFailed(
    state: LocationsState,
    { payload }: PayloadAction<Error>
) {
    state.isLoading = false
    state.error = payload.message
    state.entries = []
}

const locations = createSlice({
    name: 'locations',
    initialState: locationsInitialState,
    reducers: {
        resetLocations: reset,
        getLocationsStart: startLoading,
        getLocationsSuccess(state, { payload }: PayloadAction<Location[]>) {
            state.isLoading = false
            state.error = null
            state.entries = payload
        },
        getLocationsFailure: loadingFailed,
    },
})

export const getLocations = createAction<string>('locations/getLocations')

export const {
    resetLocations,
    getLocationsStart,
    getLocationsSuccess,
    getLocationsFailure,
} = locations.actions

export function* fetchLocations({ payload }: ReturnType<typeof getLocations>) {
    if (payload) {
        try {
            yield put(cancelSuggestions())
            yield put(getLocationsStart())
            const response: RequestResponse = yield call(
                api.get,
                endpoints.locationSearch,
                {
                    params: { query: payload },
                }
            )
            yield put(getLocationsSuccess(response.data))
        } catch (err) {
            yield put(getLocationsFailure(err))
        } finally {
            yield spawn(watchFetchSuggestions)
        }
    }
}

export function* watchFetchLocations() {
    yield takeLatest(getLocations.type, fetchLocations)
}

export default locations.reducer
