/* eslint-disable global-require, @typescript-eslint/no-var-requires */
import { configureStore } from '@reduxjs/toolkit'
import { Middleware } from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './rootReducer'
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware()

const appliedMiddlewares: Middleware[] = [sagaMiddleware]

if (process.env.NODE_ENV === 'development') {
    appliedMiddlewares.push(logger)
}

const store = configureStore({
    reducer: rootReducer,
    middleware: appliedMiddlewares,
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
