import React from 'react'
import { Request } from 'express'
import * as locationsSlice from 'src/features/location/locationsSlice'
import * as detailsSlice from 'src/features/weather/detailsSlice'
import store from 'src/server/store'
import { search as locations } from 'src/server/db.json'
import ReactDOMServer from 'react-dom/server'
import appRoot from 'app-root-path'
import * as ssrUtils from './ssr'

jest.mock('src/utils/api')

describe('triggerActions', () => {
    test('should trigger getLocations when receving request to the /location page', () => {
        const spy = jest.spyOn(locationsSlice, 'getLocations')
        const mockRequest = ({
            originalUrl: '/location',
            query: { query: 'san' },
        } as unknown) as Request
        ssrUtils.triggerActions(mockRequest)
        expect(spy).toHaveBeenCalledWith('san')
        spy.mockRestore()
    })

    test('should trigger getDetails when receving request to the /location page', () => {
        const spy = jest.spyOn(detailsSlice, 'getDetails')
        const mockRequest = ({
            originalUrl: '/weather/123456',
        } as unknown) as Request
        ssrUtils.triggerActions(mockRequest)
        expect(spy).toHaveBeenCalledWith('123456')
        spy.mockRestore()
    })
})

describe('renderAppToString', () => {
    test('should render the app to string using ReactDOMServer.renderToString', async () => {
        jest.doMock('src/App', () => ({ default: () => <div>Mock App</div> }))
        jest.spyOn(ReactDOMServer, 'renderToString').mockReturnValueOnce(
            '<div>Mock App</div>'
        )
        const mockRequest = ({
            originalUrl: '/',
        } as unknown) as Request
        const renderedApp = await ssrUtils.renderAppToString(mockRequest, {})
        expect(renderedApp).toBe('<div>Mock App</div>')
    })
})

describe('injectPreloadedState', () => {
    const renderedApp = '<div>Rendered App</div>'

    test('should inject the preloaded state into the rendered app', async () => {
        store.dispatch(locationsSlice.getLocationsSuccess(locations))
        const someTextFromState = locations[0].title
        const injectedApp = await ssrUtils.injectPreloadedState(
            renderedApp,
            `${appRoot}/public/index.html`
        )
        expect(injectedApp).toContain(renderedApp)
        expect(injectedApp).toContain(someTextFromState)
    })

    test('should reject if the build/index.html does not exist', async () => {
        await expect(
            ssrUtils.injectPreloadedState(
                renderedApp,
                'some-non-existing-file.html'
            )
        ).rejects.toThrow()
    })
})
