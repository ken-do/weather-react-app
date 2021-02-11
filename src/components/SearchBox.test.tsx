import { render, fireEvent } from 'src/utils/testUtils'
import React from 'react'
import { EVENT_KEYS } from 'src/utils/constants'
import { SearchBox } from './SearchBox'

describe('SearchBox', () => {
    test('should render an input field and a button', () => {
        const { getByRole } = render(<SearchBox />)
        const button = getByRole('button')
        const input = getByRole('textbox')
        expect(button).toBeInTheDocument()
        expect(input).toBeInTheDocument()
    })

    test('should focus on the input element if autoFocus prop is to set true', () => {
        const { getByRole } = render(<SearchBox autoFocus />)
        const input = getByRole('textbox')
        expect(input).toHaveFocus()
    })

    test('should enlarge when passing in a lg size prop', () => {
        const { asFragment, rerender } = render(<SearchBox />)
        const firstRender = asFragment()
        rerender(<SearchBox size="lg" />)
        expect(firstRender).toMatchDiffSnapshot(asFragment())
    })

    it('should update the button lable based on isLoading value', () => {
        const { asFragment, rerender, queryByText } = render(<SearchBox />)
        const firstRender = asFragment()
        const button = queryByText(/search/i)
        expect(button).toBeVisible()
        rerender(<SearchBox isLoading />)
        const loadingButton = queryByText(/loading/i)
        expect(loadingButton).toBeVisible()
        expect(firstRender).toMatchDiffSnapshot(asFragment())
    })

    test('should update the input field correctly, then invokes afterInputChanged() on change events', () => {
        const afterInputChanged = jest.fn()
        const value = 'test'
        const { getByRole, asFragment } = render(
            <SearchBox afterInputChanged={afterInputChanged} />
        )
        const input = getByRole('textbox')
        const firstRender = asFragment()
        fireEvent.change(input, { target: { value } })
        expect(input).toHaveValue(value)
        expect(firstRender).toMatchDiffSnapshot(asFragment())
        expect(afterInputChanged).toHaveBeenCalledWith(value)
    })

    test('should clear the input value and call afterButtonClicked on button clicks', async () => {
        const afterButtonClicked = jest.fn()
        const value = 'test'
        const { getByRole, asFragment } = render(
            <SearchBox afterButtonClicked={afterButtonClicked} />
        )
        const input = getByRole('textbox')
        const button = getByRole('button')
        fireEvent.change(input, { target: { value } })
        expect(input).toHaveValue(value)
        const firstRender = asFragment()
        fireEvent.click(button)
        expect(input).toHaveValue('')
        expect(afterButtonClicked).toHaveBeenCalledTimes(1)
        expect(firstRender).toMatchDiffSnapshot(asFragment())
    })

    test('it shoud calls afterButtonClicked on hitting enter key', async () => {
        const afterButtonClicked = jest.fn()
        const value = 'test'
        const { getByRole } = render(
            <SearchBox afterButtonClicked={afterButtonClicked} />
        )
        const input = getByRole('textbox')
        fireEvent.change(input, { target: { value } })
        expect(input).toHaveValue(value)
        fireEvent.keyDown(input, { key: EVENT_KEYS.enter })
        expect(input).toHaveValue('')
        expect(afterButtonClicked).toHaveBeenCalledTimes(1)
    })
})
