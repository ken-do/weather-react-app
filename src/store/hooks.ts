/* istanbul ignore file */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux'
import { RootState } from './rootReducer'
import { AppDispatch } from './index'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
