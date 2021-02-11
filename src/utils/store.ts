import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux'
import { AppDispatch } from 'src/store'
import { RootState } from 'src/store/rootReducer'

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
const useAppDispatch = () => useDispatch<AppDispatch>()

export { useAppDispatch as useDispatch }
export { useAppSelector as useSelector }
