import React from 'react'
import { render } from 'src/utils/testUtils'
import LayoutSearch from './Search'

const AComponent = () => <div>Hello, world</div>

describe('Search layout', () => {
    test('should render its children', () => {
        const { getByText } = render(
            <LayoutSearch>
                <AComponent />
            </LayoutSearch>
        )
        const childrenElement = getByText(/hello, world/i)
        expect(childrenElement).toBeInTheDocument()
    })

    test('should display a navigation bar and a search box', () => {
        const { getByRole } = render(
            <LayoutSearch>
                <AComponent />
            </LayoutSearch>
        )
        const navBar = getByRole('navigation')
        const searchBox = getByRole('textbox')
        expect(navBar).toBeInTheDocument()
        expect(searchBox).toBeInTheDocument()
    })

    test('should match the most recent snapshot', () => {
        const { asFragment } = render(
            <LayoutSearch>
                <AComponent />
            </LayoutSearch>
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
