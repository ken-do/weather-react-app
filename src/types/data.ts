export interface ConsolidatedWeather {
    id: number
    weather_state_name: string
    weather_state_abbr: string
    wind_direction_compass: string
    created: string
    applicable_date: string
    min_temp: number
    max_temp: number
    the_temp: number
    wind_speed: number
    wind_direction: number
    air_pressure: number
    humidity: number
    visibility: number
    predictability: number
    [key: string]: unknown
}

export interface NormalizedConsolidatedWeather {
    id: number
    weatherStateName: string
    weatherStateAbbr: string
    windDirectionCompass: string
    created: string
    applicableDate: string
    minTemp: number
    maxTemp: number
    theTemp: number
    windSpeed: number
    windDirection: number
    airPressure: number
    humidity: number
    visibility: number
    predictability: number
}

interface ReportSource {
    title: string
    slug: string
    url: string
    crawl_rate: number
}

export interface Location {
    title: string
    location_type: string
    woeid: number
    latt_long: string
    [key: string]: unknown
}

export interface NormalizedLocation {
    title: string
    locationType: string
    woeid: number
    lattLong: string
}

export interface LocationDetails {
    consolidated_weather: ConsolidatedWeather[]
    time: string
    sun_rise: string
    sun_set: string
    timezone_name: string
    parent: Location
    sources: ReportSource[]
    title: string
    location_type: string
    woeid: number
    latt_long: string
    timezone: string
    [key: string]: unknown
}

export interface NormalizedLocationDetails {
    consolidatedWeather: ConsolidatedWeather[]
    time: string
    sunRise: string
    sunSet: string
    timezoneName: string
    parent: Location
    sources: ReportSource[]
    title: string
    locationType: string
    woeid: number
    lattLong: string
    timezone: string
}
