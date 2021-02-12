/* eslint-disable import/no-extraneous-dependencies */
import express, { Express } from 'express'
import logger from 'morgan'
import fs from 'fs'
import appRoot from 'app-root-path'
import { renderAppToString, injectPreloadedState } from 'src/utils/ssr'
import { StaticRouterContext } from 'react-router'
import proxy from '../proxy'

const config = (app: Express) => {
    const streamToFile = (fileName: string) =>
        fs.createWriteStream(`${appRoot}/${fileName}`, {
            flags: 'a',
        })

    app.use('/static', express.static(`${appRoot}/build/static`))
    app.use('/favicon.ico', express.static(`${appRoot}/public/favicon.ico`))
    app.use('/manifest.json', express.static(`${appRoot}/public/manifest.json`))
    app.use('/logo64.json', express.static(`${appRoot}/public/logo64.json`))
    app.use('/robots.txt', express.static(`${appRoot}/public/robots.txt`))

    // log only 4xx and 5xx responses to error.log
    app.use(
        logger('combined', {
            stream: streamToFile('error.log'),
            skip(req, res) {
                return res.statusCode < 400
            },
        })
    )

    // log all requests to access.log
    app.use(
        logger('common', {
            stream: streamToFile('access.log'),
        })
    )

    // proxy API requests to metaweather
    app.use('/api', proxy)

    // server-side render the App when building for production
    app.use(async (req, res) => {
        try {
            const context: StaticRouterContext = {}
            const reactApp = await renderAppToString(req, context)
            const stateInjectedApp = await injectPreloadedState(reactApp)

            if (context.url) {
                // Somewhere a `<Redirect>` was rendered
                res.redirect(301, context.url)
            } else {
                res.send(stateInjectedApp)
            }
        } catch (error) {
            console.log('Error while server-side rendering: ', error)
            res.status(500).send('Internal Server Error')
        }
    })

    return app
}

export default config
