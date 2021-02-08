import { combineReducers } from '@reduxjs/toolkit'
import { useSelector, TypedUseSelectorHook } from 'react-redux'
import suggestions from 'features/search/suggestionsSlice'

const rootReducer = combineReducers({ suggestions })

export type RootState = ReturnType<typeof rootReducer>

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

export default rootReducer
