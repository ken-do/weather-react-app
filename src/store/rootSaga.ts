import { spawn } from 'redux-saga/effects'
import { watchFetchSuggestions } from 'src/features/search/suggestionsSlice'
import { watchFetchDetails } from 'src/features/weather/detailsSlice'
import { watchFetchLocations } from 'src/features/location/locationsSlice'

export default function* rootSaga() {
    yield spawn(watchFetchSuggestions)
    yield spawn(watchFetchDetails)
    yield spawn(watchFetchLocations)
}
