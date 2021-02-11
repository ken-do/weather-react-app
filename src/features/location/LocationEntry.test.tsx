import { render } from 'src/utils/testUtils'
import React from 'react'
import { PATH } from 'src/utils/constants'
import { search as locations } from 'src/server/db.json'
import LocationEntry from './LocationEntry'

const location = locations[0]

describe('LocationEntry', () => {
    test('should render a location title within an <a> tag with the correct link', () => {
        const { getByRole } = render(<LocationEntry location={location} />)
        const locationWrapper = getByRole('article')
        expect(locationWrapper).toBeInTheDocument()
        const linkElement = getByRole('link')
        expect(linkElement).toHaveAttribute('href')
        expect(linkElement.getAttribute('href')).toBe(
            `${PATH.weather}/${location.woeid}`
        )
    })

    test('should match the most recent snapshot', () => {
        const { asFragment } = render(<LocationEntry location={location} />)
        expect(asFragment()).toMatchSnapshot()
    })
})
