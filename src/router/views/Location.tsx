import React, { useEffect } from 'react'
import LocationList from 'src/features/location/LocationList'
import { useQuery } from 'src/utils/router'
import { useDispatch, useSelector } from 'src/utils/store'
import { getLocations } from 'src/features/location/locationsSlice'
import { EmptyStateMessage, LoadingIndicator } from 'src/components'

const Location = () => {
    const queryParams = useQuery()
    const query = queryParams.get('query')
    const dispatch = useDispatch()
    const locations = useSelector((state) => state.locations.entries)
    const isLoading = useSelector((state) => state.locations.isLoading)

    useEffect(() => {
        if (query) {
            dispatch(getLocations(query))
        }
    }, [dispatch, query])

    if (isLoading) {
        return <LoadingIndicator />
    }

    if (locations.length) {
        return <LocationList locations={locations} />
    }

    return (
        <EmptyStateMessage
            heading="No Results"
            subHeading="Try searching for another location with a different query."
        />
    )
}

export default Location
