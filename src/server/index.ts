import express from 'express'
import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const dbPathname = path.join(__dirname, `db.json`)

app.set('dbPathname', dbPathname)

const port = process.env.SERVER_WEB_PORT ?? 4000
const env = process.env.NODE_ENV || 'development'

// eslint-disable-next-line @typescript-eslint/no-var-requires
// eslint-disable-next-line import/no-dynamic-require
import(`./config/${env}.ts`)
    .then((config) => {
        return config.default(app).listen(port, () => {
            console.log(`Server is listening at http://localhost:${port}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })
