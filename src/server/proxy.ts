import express from 'express'
import axios, { Method } from 'axios'
import { standardizeRequestError } from '../utils/api'

const router = express.Router()

router.use(async (req, res) => {
    const url = `${process.env.API_BASE_URL}${req.originalUrl}`
    res.setHeader('Access-Control-Allow-Origin', '*')
    try {
        const response = await axios.request({
            method: req.method as Method,
            url,
            headers: {
                Accepts: 'application/json',
            },
        })
        res.send(response.data)
    } catch (error) {
        console.log('Error while making API requests: ', error)
        const standardizedError = standardizeRequestError(error)
        res.status(500).send(standardizedError)
    }
})

export default router
