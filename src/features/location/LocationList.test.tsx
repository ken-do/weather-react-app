import { render } from 'src/utils/testUtils'
import React from 'react'
import { search as locations } from 'src/server/db.json'
import LocationList from './LocationList'

describe('LocationList', () => {
    test('should render a list of locations', () => {
        const { queryAllByRole } = render(
            <LocationList locations={locations} />
        )
        const locationList = queryAllByRole('article')
        expect(locationList).toHaveLength(locations.length)
    })

    test('should match the most recent snapshot', () => {
        const { asFragment } = render(<LocationList locations={locations} />)
        expect(asFragment()).toMatchSnapshot()
    })
})
