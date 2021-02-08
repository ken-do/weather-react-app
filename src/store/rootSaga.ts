import { spawn } from 'redux-saga/effects'
import { watchFetchSuggestions } from 'features/search/suggestionsSlice'

export default function* rootSaga() {
    yield spawn(watchFetchSuggestions)
}
