import { combineReducers } from '@reduxjs/toolkit'
import { useSelector, TypedUseSelectorHook } from 'react-redux'

const rootReducer = combineReducers({})

export type RootState = ReturnType<typeof rootReducer>

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

export default rootReducer
