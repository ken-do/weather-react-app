import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ForecastList from 'src/features/weather/ForecastList'
import { useDispatch, useSelector } from 'src/utils/store'
import { getDetails } from 'src/features/weather/detailsSlice'
import { EmptyStateMessage, LoadingIndicator } from 'src/components'

interface ParamTypes {
    woeid: string
}

const Weather = () => {
    const { woeid } = useParams<ParamTypes>()
    const dispatch = useDispatch()
    const locationDetails = useSelector((state) => state.details.location)
    const isLoading = useSelector((state) => state.details.isLoading)
    useEffect(() => {
        if (woeid) {
            dispatch(getDetails(woeid))
        }
    }, [dispatch, woeid])

    if (isLoading) {
        return <LoadingIndicator />
    }

    if (locationDetails) {
        return (
            <section>
                <ForecastList locationDetails={locationDetails} />
            </section>
        )
    }

    return (
        <EmptyStateMessage
            heading="Data Not Available"
            subHeading="Weather forecasts are missing for this region."
        />
    )
}

export default Weather
