import React from 'react'
import { render } from 'utils/testUtils'
import { APP_NAME } from 'utils/constants'
import Home from './Home'

describe('Home view', () => {
    test('should render a logo, the app name and an auto-focused search box', () => {
        const { getByRole, getByText } = render(<Home />)
        const logo = getByRole('img')
        const appName = getByText(APP_NAME)
        const searchBox = getByRole('textbox')
        expect(logo).toBeInTheDocument()
        expect(appName).toBeInTheDocument()
        expect(searchBox).toBeInTheDocument()
        expect(searchBox).toHaveFocus()
    })

    test('should match the most recent snapshot', () => {
        const { asFragment } = render(<Home />)
        expect(asFragment()).toMatchSnapshot()
    })
})
