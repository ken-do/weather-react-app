import { spawn } from 'redux-saga/effects'
import { watchFetchSuggestions } from 'features/search/suggestionsSlice'
import { watchFetchDetails } from 'features/weather/detailsSlice'
import { watchFetchLocations } from 'features/location/locationsSlice'

export default function* rootSaga() {
    yield spawn(watchFetchSuggestions)
    yield spawn(watchFetchDetails)
    yield spawn(watchFetchLocations)
}
