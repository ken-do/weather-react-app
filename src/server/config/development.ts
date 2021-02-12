import { Express } from 'express'
import proxy from '../proxy'
// import localApi from './localApi' // use this local version for quick development

const config = (app: Express) => {
    // to use the hard-coded db
    // replace the following block with
    // const dbPathname = path.join(__dirname, `db.json`)
    // app.set('dbPathname', dbPathname)
    // app.use('/api', localApi)
    app.use('/api', proxy)

    app.use((req, res) => {
        res.status(404).send('This endpoint does not exist')
    })

    return app
}

export default config
