import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux'
import { AppDispatch } from 'store'
import { RootState } from 'store/rootReducer'

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
const useAppDispatch = () => useDispatch<AppDispatch>()

export { useAppDispatch as useDispatch }
export { useAppSelector as useSelector }
