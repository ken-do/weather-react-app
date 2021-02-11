/* eslint-disable import/first */
jest.mock('@testing-library/react')
import React from 'react'
import { render } from '@testing-library/react'
import ReactDOM from 'react-dom'
import { render as customRender, AllTheProviders } from './testUtils'

const AComponent = () => <div>Hello, world</div>

describe('testUtils', () => {
    test('AllTheProviders should render a wrapped children', () => {
        const container = document.createElement('div')
        expect(container).toBeEmptyDOMElement()
        ReactDOM.render(
            <AllTheProviders>
                <AComponent />
            </AllTheProviders>,
            container
        )
        expect(container).toContainHTML('<div>Hello, world</div>')
    })

    test('customRender should wrap the input component within the provided providers', () => {
        customRender(<AComponent />)
        expect(render).toHaveBeenCalledWith(<AComponent />, {
            wrapper: AllTheProviders,
        })
    })
})
