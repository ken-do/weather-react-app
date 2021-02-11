import { fireEvent, render } from 'utils/testUtils'
import React from 'react'
import SuggestionDropdown from './SuggestionDropdown'

const mockSuggestions = [
    {
        title: 'mock title',
        id: 123456,
    },
]

describe('SuggestionDropdown', () => {
    test('should render a list of suggestions in <li> tags', () => {
        const handleSuggestionSelect = jest.fn()
        const { container, getByText } = render(
            <SuggestionDropdown
                suggestions={mockSuggestions}
                handleSuggestionSelect={handleSuggestionSelect}
            />
        )
        expect(container).toContainHTML('ul')
        const firstSuggestion = getByText(mockSuggestions[0].title)
        expect(firstSuggestion).toContainHTML('li')
    })

    test('on selecting a suggsetion, it should trigger handleSuggestionSelect', () => {
        const handleSuggestionSelect = jest.fn()
        const { getByText } = render(
            <SuggestionDropdown
                suggestions={mockSuggestions}
                handleSuggestionSelect={handleSuggestionSelect}
            />
        )
        const firstSuggestion = getByText(mockSuggestions[0].title)
        fireEvent.click(firstSuggestion)
        expect(handleSuggestionSelect).toHaveBeenCalledWith(
            mockSuggestions[0].id
        )
    })

    test('should match the most recent snapshot', () => {
        const handleSuggestionSelect = jest.fn()
        const { asFragment } = render(
            <SuggestionDropdown
                suggestions={mockSuggestions}
                handleSuggestionSelect={handleSuggestionSelect}
            />
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
