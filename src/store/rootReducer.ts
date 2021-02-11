import { combineReducers } from '@reduxjs/toolkit'
import { useSelector, TypedUseSelectorHook } from 'react-redux'
import suggestions from 'features/search/suggestionsSlice'
import details from 'features/weather/detailsSlice'
import locations from 'features/location/locationsSlice'

const rootReducer = combineReducers({ suggestions, details, locations })

export type RootState = ReturnType<typeof rootReducer>

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

export default rootReducer
