import { AxiosResponse } from 'axios'
import api, { httpErrorMessages } from './api'

const mockResponse = { data: 'mockData' } as AxiosResponse

// axios does not expose types for api.interceptors.response.handlers
// but this test needs it, so cast api.interceptors.response and
// provide the missing type declartions based on axios's here
interface Handlers<V> {
    fulfilled: (value: V) => V | Promise<V>
    rejected: (error: unknown) => unknown
}

type InterceptorsResponse = typeof api.interceptors.response & {
    handlers: Handlers<AxiosResponse>[]
}

const interceptorsResponse = api.interceptors.response as InterceptorsResponse

describe('api', () => {
    test('should return a response without being modified', async () => {
        await expect(
            interceptorsResponse.handlers[0].fulfilled(mockResponse)
        ).toEqual(mockResponse)
    })

    test('should standardize errors returned from the server', async () => {
        await expect(
            interceptorsResponse.handlers[0].rejected({
                response: { status: 404 },
            })
        ).rejects.toMatchObject({
            message: httpErrorMessages[404],
        })
    })

    test('should standardize errors caused by wrong request settings', async () => {
        await expect(
            interceptorsResponse.handlers[0].rejected({
                message: 'Wrong settings',
            })
        ).rejects.toMatchObject({
            message: 'Wrong settings',
        })
    })

    test('should standardize errors caused by server not being available', async () => {
        await expect(
            interceptorsResponse.handlers[0].rejected({})
        ).rejects.toMatchObject({
            message: 'Server did not respond.',
        })
    })
})
