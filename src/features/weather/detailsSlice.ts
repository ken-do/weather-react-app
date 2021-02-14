import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit'
import { call, put, takeLatest } from 'redux-saga/effects'
import api, { endpoints } from 'src/utils/api'
import _isEmpty from 'lodash/isEmpty'
import { LocationDetails } from '../../types/data'

interface DetailsSlice {
    isLoading: boolean
    location: LocationDetails | null
    error: string | null
}

interface RequestResponse {
    data: LocationDetails
}

export const detailsInitialState: DetailsSlice = {
    isLoading: false,
    location: null,
    error: null,
}

function reset(state: DetailsSlice) {
    state.isLoading = false
    state.location = null
    state.error = null
}

function startLoading(state: DetailsSlice) {
    state.isLoading = true
}

function loadingFailed(state: DetailsSlice, { payload }: PayloadAction<Error>) {
    state.isLoading = false
    state.error = payload.message
    state.location = null
}

const details = createSlice({
    name: 'details',
    initialState: detailsInitialState,
    reducers: {
        resetDetails: reset,
        getDetailsStart: startLoading,
        getDetailsSuccess(
            state,
            { payload }: PayloadAction<LocationDetails | null>
        ) {
            state.isLoading = false
            state.error = null
            state.location = !_isEmpty(payload) ? payload : null
        },
        getDetailsFailure: loadingFailed,
    },
})

export const getDetails = createAction<string>('details/getDetails')

export const {
    resetDetails,
    getDetailsStart,
    getDetailsSuccess,
    getDetailsFailure,
} = details.actions

export function* fetchDetails({ payload }: ReturnType<typeof getDetails>) {
    if (payload) {
        try {
            yield put(getDetailsStart())
            const response: RequestResponse = yield call(
                api.get,
                `${endpoints.locationDetails}/${payload}`
            )
            yield put(getDetailsSuccess(response.data))
        } catch (err) {
            yield put(getDetailsFailure(err))
        }
    }
}

export function* watchFetchDetails() {
    yield takeLatest(getDetails.type, fetchDetails)
}

export default details.reducer
