import React, { memo } from 'react'
import { LocationDetails } from 'src/types/data'
import Row from 'react-bootstrap/Row'
import { MAX_FORECASTS } from 'src/utils/constants'
import ForecastBox from './ForecastBox'
import ForecastLocation from './ForecastLocation'

interface Props {
    locationDetails: LocationDetails
}

const ForecastList = ({ locationDetails }: Props) => {
    const { consolidated_weather: forecasts } = locationDetails
    return (
        <Row>
            <ForecastLocation locationDetails={locationDetails} />
            {forecasts.slice(0, MAX_FORECASTS).map((forecast) => (
                <ForecastBox key={forecast.id} forecast={forecast} />
            ))}
        </Row>
    )
}

export default memo(ForecastList)
