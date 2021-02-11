import express from 'express'
import axios, { Method } from 'axios'
import createError from 'http-errors'
import { standardizeRequestError } from '../utils/api'

const router = express.Router()

router.use(async (req, res, next) => {
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
        return res.send(response.data)
    } catch (error) {
        const standardizedError = standardizeRequestError(error)
        return next(createError(500, standardizedError))
    }
})

export default router
