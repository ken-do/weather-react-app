import React from 'react'
import { render, screen } from 'utils/testUtils'
import { LOCATION_SEARCH_PLACEHOLDER } from 'utils/constants'
import App from './App'

describe('Home page', () => {
    test('should render a logo and search box', () => {
        render(<App />)
        const inputElement = screen.getByPlaceholderText(
            LOCATION_SEARCH_PLACEHOLDER
        )
        expect(inputElement).toBeInTheDocument()

        const logo = screen.getByAltText(/logo/i)
        expect(logo).toBeInTheDocument()
    })
})
