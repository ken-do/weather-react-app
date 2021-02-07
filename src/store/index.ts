/* eslint-disable global-require, @typescript-eslint/no-var-requires */
import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './rootReducer'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware, logger] as const,
})

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./rootReducer', () => {
        const newRootReducer = require('./rootReducer').default
        store.replaceReducer(newRootReducer)
    })
}

export type AppDispatch = typeof store.dispatch

export default store
