import { render } from 'src/utils/testUtils'
import React from 'react'
import { APP_NAME } from 'src/utils/constants'
import NavBar from './NavBar'

describe('NavBar', () => {
    test('should render a logo and the app name', () => {
        const { getByRole, getByText } = render(<NavBar />)
        const logo = getByRole('img')
        const appName = getByText(APP_NAME)
        expect(logo).toBeInTheDocument()
        expect(appName).toBeInTheDocument()
    })

    test('should match the most recent snapshot', () => {
        const { asFragment } = render(<NavBar />)
        expect(asFragment()).toMatchSnapshot()
    })
})
