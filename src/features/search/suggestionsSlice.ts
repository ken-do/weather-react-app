import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit'
import { call, put, takeLatest } from 'redux-saga/effects'
import api, { endpoints } from 'utils/api'
import { Location } from '../../types/data'

interface SuggestionsState {
    isLoading: boolean
    locations: Location[]
    error: string | null
}

interface RequestResponse {
    data: Location[]
}

export const suggestionsInitialState: SuggestionsState = {
    isLoading: false,
    locations: [],
    error: null,
}

function reset(state: SuggestionsState) {
    state.isLoading = false
    state.locations = []
    state.error = null
}

function startLoading(state: SuggestionsState) {
    state.isLoading = true
}

function loadingFailed(
    state: SuggestionsState,
    { payload }: PayloadAction<Error>
) {
    state.isLoading = false
    state.error = payload.message
    state.locations = []
}

const suggestions = createSlice({
    name: 'suggestions',
    initialState: suggestionsInitialState,
    reducers: {
        resetSuggestions: reset,
        getSuggestionsStart: startLoading,
        getSuggestionsSuccess(state, { payload }: PayloadAction<Location[]>) {
            state.isLoading = false
            state.error = null
            state.locations = payload
        },
        getSuggestionsFailure: loadingFailed,
    },
})

export const getSuggetions = createAction<string>('suggestions/getSuggetions')

export const {
    resetSuggestions,
    getSuggestionsStart,
    getSuggestionsSuccess,
    getSuggestionsFailure,
} = suggestions.actions

export function* fetchSuggestions({
    payload,
}: ReturnType<typeof getSuggetions>) {
    try {
        yield put(getSuggestionsStart)
        const response: RequestResponse = yield call(
            api.get,
            endpoints.suggestion,
            {
                params: { query: payload },
            }
        )
        yield put(getSuggestionsSuccess(response.data))
    } catch (err) {
        yield put(getSuggestionsFailure(err))
    }
}

export function* watchFetchSuggestions() {
    yield takeLatest(getSuggetions.type, fetchSuggestions)
}

export default suggestions.reducer
