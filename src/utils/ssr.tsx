import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from 'src/App'
import { Provider } from 'react-redux'
import store from 'src/store'
import path from 'path'
import fs from 'fs'

export const renderAppToString = () =>
    ReactDOMServer.renderToString(
        <Provider store={store}>
            <App />
        </Provider>
    )

export const injectPreloadedState = async (app: string) => {
    try {
        const preloadedState = store.getState()
        const indexFile = path.resolve('./build/index.html')
        const data = await fs.promises.readFile(indexFile, 'utf8')

        return data.replace(
            '<div id="root"></div>',
            `<div id="root">${app}</div> 
            <script>
            window.__PRELOADED_STATE__ = ${JSON.stringify(
                preloadedState
            ).replace(/</g, '\\u003c')}
          </script>`
        )
    } catch (error) {
        return Promise.reject(new Error('Oops, better luck next time!'))
    }
}
