import express, { Express } from 'express'
import cors from 'cors'
import path from 'path'
import logger from 'morgan'
import { compose } from 'redux'
import dotenv from 'dotenv'
import createError from 'http-errors'
import fs from 'fs'
import api from './api'
// import localAPI from './api.local' // use this local version for quick development

dotenv.config()

// create a write stream (in append mode)
const streamToFile = (fileName: string) =>
    fs.createWriteStream(path.join(__dirname, fileName), {
        flags: 'a',
    })

const applyMiddlewares = (app: Express) => {
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use('/static', express.static(path.join(__dirname, '..', 'static')))
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

    return app
}

const applyAPI = (app: Express) => {
    // to use the hard-coded db
    // replace the following block with
    // app.use('/api', localAPI)
    app.use('/api', api)

    app.use((req, res, next) => {
        next(createError(404, 'This endpoint does not exist'))
    })
}

const app = express()

const dbPathname = path.join(__dirname, `db.json`)

app.set('dbPathname', dbPathname)

compose(applyAPI, applyMiddlewares)(app)

const port = process.env.SERVER_WEB_PORT ?? 4000

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})

export default app
