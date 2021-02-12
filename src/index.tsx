/* eslint-disable global-require, @typescript-eslint/no-var-requires */
/* eslint-disable global-require, @typescript-eslint/no-var-requires */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.scss'
import { BrowserRouter as Router } from 'react-router-dom'
import { loadableReady } from '@loadable/component'
import reportWebVitals from './reportWebVitals'
import store from './store'

const render = () => {
    const App = require('./App').default

    ReactDOM.hydrate(
        <React.StrictMode>
            <Provider store={store}>
                <Router>
                    <App />
                </Router>
            </Provider>
        </React.StrictMode>,
        document.getElementById('root')
    )
}

loadableReady(() => {
    render()
})

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./App', render)
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

export default {}
