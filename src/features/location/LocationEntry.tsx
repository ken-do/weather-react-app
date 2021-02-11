import React, { memo } from 'react'
import Badge from 'react-bootstrap/Badge'
import { Link } from 'react-router-dom'
import { Location, NormalizedLocation } from 'types/data'
import { normalizeObjectKeys } from 'utils/normalizers'
import { PATH } from 'utils/constants'
import styles from './LocationEntry.module.scss'

interface Props {
    location: Location
}

const LocationEntry = ({ location }: Props) => {
    const normalizedLocation = normalizeObjectKeys<
        Location,
        NormalizedLocation
    >(location)

    const { woeid, title, locationType } = normalizedLocation

    return (
        <article key={woeid} className="col-md-3">
            <Link
                className={`${styles.link} mr-2 mb-2 d-inline-block`}
                to={`${PATH.weather}/${woeid}`}
            >
                {title}
            </Link>
            <Badge pill variant="success">
                {locationType}
            </Badge>
        </article>
    )
}
export default memo(LocationEntry)
