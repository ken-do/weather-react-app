import { spawn } from 'redux-saga/effects'
import { watchFetchSuggestions } from 'features/search/suggestionsSlice'
import { watchFetchDetails } from 'features/weather/detailsSlice'
import { watchFetchLocations } from 'features/location/locationsSlice'
import rootSaga from './rootSaga'

test('rootSaga', () => {
    const gen = rootSaga()
    expect(gen.next().value).toEqual(spawn(watchFetchSuggestions))
    expect(gen.next().value).toEqual(spawn(watchFetchDetails))
    expect(gen.next().value).toEqual(spawn(watchFetchLocations))
})
