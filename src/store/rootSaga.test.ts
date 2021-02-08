import { spawn } from 'redux-saga/effects'
import { watchFetchSuggestions } from 'features/search/suggestionsSlice'
import rootSaga from './rootSaga'

test('rootSaga', () => {
    const gen = rootSaga()
    expect(gen.next().value).toEqual(spawn(watchFetchSuggestions))
})
