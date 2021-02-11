import React from 'react'
import { render, screen } from 'src/utils/testUtils'
import Plain from './Plain'

const AComponent = () => <div>Hello, world</div>

describe('Plain layout', () => {
    test('should render its children', () => {
        render(
            <Plain>
                <AComponent />
            </Plain>
        )
        const childrenElement = screen.getByText(/hello, world/i)
        expect(childrenElement).toBeInTheDocument()
    })

    test('should not render anything else', () => {
        const { container } = render(
            <Plain>
                <AComponent />
            </Plain>
        )
        expect(container.firstChild?.childNodes).toHaveLength(1)
    })

    test('should match the most recent snapshot', () => {
        const { container } = render(
            <Plain>
                <AComponent />
            </Plain>
        )
        expect(container).toMatchSnapshot()
    })
})
