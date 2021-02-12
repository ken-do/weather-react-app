import React, { memo, useMemo } from 'react'
import {
    ConsolidatedWeather,
    NormalizedConsolidatedWeather,
} from 'src/types/data'
import { normalizeObjectKeys } from 'src/utils/normalizers'
import { dateToFriendlyDate } from 'src/utils/formatters'
import forecastImages from 'src/utils/weatherForecastImages'

interface Props {
    forecast: ConsolidatedWeather
}

const ForecastBox = ({ forecast }: Props) => {
    const normalizedForecast = useMemo(
        () =>
            normalizeObjectKeys<
                ConsolidatedWeather,
                NormalizedConsolidatedWeather
            >(forecast),
        [forecast]
    )

    const {
        applicableDate,
        minTemp,
        maxTemp,
        weatherStateName,
        weatherStateAbbr,
        windSpeed,
    } = normalizedForecast

    return (
        <article
            className="col-lg-2 col-md-2 col-sm-4-col-xs-6"
            data-date={`${applicableDate}`}
        >
            <p>
                <span className="text-success font-weight-bold">
                    {dateToFriendlyDate(applicableDate)}
                </span>
            </p>
            <dl>
                <dd className="weatherstate" data-original-title="" title="">
                    <img
                        src={forecastImages[weatherStateAbbr] as string}
                        alt={weatherStateName}
                        width="32"
                    />
                    <span className="hidden-xs hidden-sm">
                        {` ${weatherStateName}`}
                    </span>
                </dd>
                <dt>Temperature</dt>
                <dd>
                    Max: {Math.round(maxTemp)}°C
                    <br />
                    Min: {Math.round(minTemp)}°C
                </dd>
                <dt>Wind</dt>
                <dd className="wind">
                    <span className="dir dir-sw" title="SW" />↗{' '}
                    {Math.round(windSpeed)}mph
                </dd>
            </dl>
        </article>
    )
}
export default memo(ForecastBox)
