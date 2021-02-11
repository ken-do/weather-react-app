import { render } from 'src/utils/testUtils'
import React from 'react'
import LoadingIndicator from './LoadingIndicator'

describe('LoadingIndicator', () => {
    test('should render 7 dots aligned center', () => {
        const { container } = render(<LoadingIndicator />)
        const rootElement = container.firstChild
        expect(rootElement?.childNodes.length).toBe(7)
        expect(rootElement).toHaveStyle('text-align: center')
    })

    test('should match the most recent snapshot', () => {
        const { asFragment } = render(<LoadingIndicator />)
        expect(asFragment()).toMatchSnapshot()
    })
})
