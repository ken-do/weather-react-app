import React, { memo, useMemo } from 'react'
import { LocationDetails, NormalizedLocationDetails } from 'types/data'
import Col from 'react-bootstrap/Col'
import { normalizeObjectKeys } from 'utils/normalizers'
import { UTCStringToHours } from 'utils/formatters'

interface Props {
    locationDetails: LocationDetails
}

const ForecastLocation = ({ locationDetails }: Props) => {
    const normalizedLocationDetails = useMemo(
        () =>
            normalizeObjectKeys<LocationDetails, NormalizedLocationDetails>(
                locationDetails
            ),
        [locationDetails]
    )

    const { title, time } = normalizedLocationDetails
    const localTime = useMemo(() => UTCStringToHours(time), [time])
    return (
        <Col lg="2" md="2" sm="4" xs="12">
            <h2 className="text-success">{title}</h2>
            <p>{localTime}</p>
        </Col>
    )
}

export default memo(ForecastLocation)
