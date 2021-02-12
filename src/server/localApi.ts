import express from 'express'
import fs from 'fs'
import { LocationDetails } from 'src/types/data'

const router = express.Router()

router.get('/location/search', (req, res) => {
    const { query } = req.query
    const dbPathname = req.app.get('dbPathname')
    let result = []
    if (query && query === 'san') {
        const bufferData = fs.readFileSync(dbPathname)
        const db = JSON.parse(bufferData.toString())
        result = db.search
    }
    res.send(result)
})

router.get('/location/:woeid', (req, res) => {
    const { woeid } = req.params
    let result = []
    if (woeid && /\d+/.test(woeid)) {
        const dbPathname = req.app.get('dbPathname')
        const bufferData = fs.readFileSync(dbPathname)
        const db = JSON.parse(bufferData.toString())
        result = db.location.find(
            (location: LocationDetails) => location.woeid.toString() === woeid
        )
    }
    res.send(JSON.stringify(result))
})

export default router
