import { spawn } from 'redux-saga/effects'
import { watchFetchSuggestions } from 'src/features/search/suggestionsSlice'
import { watchFetchDetails } from 'src/features/weather/detailsSlice'
import { watchFetchLocations } from 'src/features/location/locationsSlice'
import rootSaga from './rootSaga'

test('rootSaga', () => {
    const gen = rootSaga()
    expect(gen.next().value).toEqual(spawn(watchFetchSuggestions))
    expect(gen.next().value).toEqual(spawn(watchFetchDetails))
    expect(gen.next().value).toEqual(spawn(watchFetchLocations))
})
