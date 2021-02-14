import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit'
import {
    call,
    put,
    cancelled,
    takeLatest,
    cancel,
    takeEvery,
} from 'redux-saga/effects'
import { Task } from 'redux-saga'
import api, { endpoints } from 'src/utils/api'
import { MAX_SUGGESTIONS } from 'src/utils/constants'
import axios from 'axios'
import { Location } from '../../types/data'

interface SuggestionsState {
    isLoading: boolean
    locations: Location[]
    error: string | null
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
            // only keep a defined maximum number of suggestions to reduce the amount of memory used
            state.locations = payload.slice(0, MAX_SUGGESTIONS)
        },
        getSuggestionsFailure: loadingFailed,
    },
})

export const getSuggestions = createAction<string>('suggestions/getSuggestions')
export const cancelSuggestions = createAction('suggestions/cancelSuggestions')

export const {
    resetSuggestions,
    getSuggestionsStart,
    getSuggestionsSuccess,
    getSuggestionsFailure,
} = suggestions.actions

export function* fetchSuggestions({
    payload,
}: ReturnType<typeof getSuggestions>) {
    const source = axios.CancelToken.source()
    try {
        yield put(getSuggestionsStart())
        const response = yield call(api.get, endpoints.locationSearch, {
            params: { query: payload },
            cancelToken: source.token,
        })
        yield put(getSuggestionsSuccess(response.data))
    } catch (err) {
        yield put(getSuggestionsFailure(err))
    } finally {
        if (yield cancelled()) {
            source.cancel()
            yield put(resetSuggestions())
        }
    }
}

function* cancelFetchSuggestions(task: Task) {
    yield cancel(task)
}

export function* watchFetchSuggestions() {
    const task = yield takeEvery(getSuggestions.type, fetchSuggestions)
    yield takeLatest(cancelSuggestions, cancelFetchSuggestions, task)
}

export default suggestions.reducer
