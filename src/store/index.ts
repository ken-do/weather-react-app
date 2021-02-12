/* eslint-disable no-underscore-dangle */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import { configureStore } from '@reduxjs/toolkit'
import { Middleware } from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import reducer from './rootReducer'
import rootSaga from './rootSaga'

declare global {
    interface Window {
        __PRELOADED_STATE__?: Record<string, unknown>
    }
}

const sagaMiddleware = createSagaMiddleware()

const middleware: Middleware[] = [sagaMiddleware]

if (process.env.NODE_ENV === 'development') {
    middleware.push(logger)
}

const preloadedState = window.__PRELOADED_STATE__
delete window.__PRELOADED_STATE__

const store = configureStore({
    reducer,
    preloadedState,
    middleware,
})

sagaMiddleware.run(rootSaga)

/* istanbul ignore-text */
if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./rootReducer', () => {
        const newRootReducer = require('./rootReducer').default
        store.replaceReducer(newRootReducer)
    })
}

export type AppDispatch = typeof store.dispatch

export default store
