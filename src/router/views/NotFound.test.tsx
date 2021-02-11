import React from 'react'
import { render } from 'src/utils/testUtils'
import NotFound from './NotFound'

describe('NotFound view', () => {
    test('should show a message saying the requested page is not found', () => {
        const { getByText } = render(<NotFound />)
        const notFoundMessage = getByText(/404/i)
        expect(notFoundMessage).toBeInTheDocument()
    })

    test('should match the most recent snapshot', () => {
        const { asFragment } = render(<NotFound />)
        expect(asFragment()).toMatchSnapshot()
    })
})
