import { render } from 'utils/testUtils'
import React from 'react'
import EmptyStateMessage from './EmptyStateMessage'

describe('EmptyStateMessage', () => {
    test('should render heading in h1 and subheading in h2 tags', () => {
        const { getByText } = render(
            <EmptyStateMessage
                heading="test heading"
                subHeading="test subheading"
            />
        )
        const heading = getByText('test heading')
        const subHeading = getByText('test subheading')
        expect(heading).toContainHTML('h1')
        expect(subHeading).toContainHTML('h2')
    })
    test('should match the most recent snapshot', () => {
        const { asFragment } = render(
            <EmptyStateMessage
                heading="test heading"
                subHeading="test subheading"
            />
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
