/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { SearchBox } from 'components'
import { render, waitFor } from 'utils/testUtils'
import { search as locations } from 'server/db.json'
import { fireEvent } from '@testing-library/react'
import withSuggestions from './withSuggestions'

const suggestions = locations.map(({ title, woeid }) => ({ title, id: woeid }))

const SearchBoxWithSuggestions = withSuggestions(SearchBox)

const defaultProps = {
    suggestions: [],
    fetchSuggestions: jest.fn((value) => {
        console.log(value)
    }),
    resetSuggestions: jest.fn(() => {}),
    handleSuggestionSelect: jest.fn((id: number) => {
        console.log(id)
    }),
    afterInputChanged: jest.fn((value) => {
        console.log(value)
    }),
    afterButtonClicked: jest.fn((value) => {
        console.log(value)
    }),
}

describe('SearchBoxWithSuggestions', () => {
    test('should render a search box, a button and not render a suggestion list', () => {
        const { queryByRole, asFragment } = render(
            <SearchBoxWithSuggestions {...defaultProps} />
        )
        const searchBox = queryByRole('textbox')
        expect(searchBox).toBeInTheDocument()
        const button = queryByRole('button')
        expect(button).toBeInTheDocument()
        const suggestionList = queryByRole('list')
        expect(suggestionList).not.toBeInTheDocument()
        expect(asFragment()).toMatchSnapshot()
    })

    test('should render a suggestion list when suggestions are available', () => {
        const propsWithSuggestions = {
            ...defaultProps,
            suggestions,
        }

        const { queryByRole, asFragment } = render(
            <SearchBoxWithSuggestions {...propsWithSuggestions} />
        )
        const suggestionList = queryByRole('list')
        expect(suggestionList).toBeInTheDocument()
        expect(asFragment()).toMatchSnapshot()
    })

    test('should fetch suggestions when the input value changes', async () => {
        const value = 'san'
        const { getByRole } = render(
            <SearchBoxWithSuggestions {...defaultProps} />
        )
        const searchBox = getByRole('textbox')
        expect(searchBox).toBeInTheDocument()
        fireEvent.change(searchBox, { target: { value } })
        expect(searchBox).toHaveValue(value)
        await waitFor(() =>
            expect(defaultProps.fetchSuggestions).toHaveBeenCalledWith(value)
        )
        expect(defaultProps.afterInputChanged).toHaveBeenCalledWith(value)
    })

    test('should clear suggestions when the button is clicked on', async () => {
        const value = 'san'
        const { getByRole } = render(
            <SearchBoxWithSuggestions {...defaultProps} />
        )
        const button = getByRole('button')
        const searchBox = getByRole('textbox')
        fireEvent.change(searchBox, { target: { value } })
        fireEvent.click(button)
        await waitFor(() =>
            expect(defaultProps.resetSuggestions).toHaveBeenCalled()
        )
        expect(defaultProps.afterButtonClicked).toHaveBeenCalledWith(value)
    })

    test('should clear suggestions when clicking somewhere outside the component', async () => {
        const value = 'san'
        const { getByRole, container } = render(
            <SearchBoxWithSuggestions {...defaultProps} />
        )
        const searchBox = getByRole('textbox')
        fireEvent.change(searchBox, { target: { value } })
        fireEvent.click(container)
        await waitFor(() =>
            expect(defaultProps.resetSuggestions).toHaveBeenCalled()
        )
    })

    test('should trigger handleSuggestionSelect when clicking on a suggestion from the suggestion list', () => {
        const propsWithSuggestions = {
            ...defaultProps,
            suggestions,
        }
        const { getByText } = render(
            <SearchBoxWithSuggestions {...propsWithSuggestions} />
        )
        const firstSuggestion = getByText(suggestions[0].title)
        fireEvent.click(firstSuggestion)
        expect(defaultProps.handleSuggestionSelect).toHaveBeenCalledWith(
            suggestions[0].id
        )
    })
})
