import React, { memo, useCallback, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { SearchBoxWithSuggestions } from 'components'
import { useDispatch, useSelector } from 'utils/store'
import { PATH } from 'utils/constants'
import { normalizeObjectKeys } from 'utils/normalizers'
import { Location } from 'types/data'
import { Suggestion } from 'components/SuggestionDropdown'
import { getSuggestions, resetSuggestions } from './suggestionsSlice'

interface Props {
    size?: 'sm' | 'lg' | undefined
    autoFocus?: boolean
}

const LocationSearchBox = ({ size, autoFocus }: Props) => {
    const dispatch = useDispatch()
    const locations = useSelector((state) => state.suggestions.locations)
    const isLoading = useSelector((state) => state.suggestions.isLoading)

    const normalizedLocations = useMemo(
        () =>
            locations.map((location: Location) => {
                return normalizeObjectKeys({
                    ...location,
                    id: location.woeid,
                })
            }),
        [locations]
    ) as Suggestion[]

    const history = useHistory()

    const fetchLocationSuggestions = useCallback(
        (value: string) => {
            dispatch(getSuggestions(value))
        },
        [dispatch]
    )

    const resetLocationSuggestions = useCallback(() => {
        dispatch(resetSuggestions())
    }, [dispatch])

    const handleButtonClicked = useCallback(
        (value) => {
            history.push({
                pathname: `${PATH.location}`,
                search: `?query=${value}`,
            })
        },
        [history]
    )

    const handleSuggestionSelect = useCallback(
        (id) => {
            history.push(`${PATH.weather}/${id}`)
        },
        [history]
    )

    return (
        <SearchBoxWithSuggestions
            afterButtonClicked={handleButtonClicked}
            suggestions={normalizedLocations}
            fetchSuggestions={fetchLocationSuggestions}
            handleSuggestionSelect={handleSuggestionSelect}
            resetSuggestions={resetLocationSuggestions}
            size={size}
            autoFocus={autoFocus}
            isLoading={isLoading}
        />
    )
}

LocationSearchBox.defaultProps = {
    size: undefined,
    autoFocus: false,
}

export default memo(LocationSearchBox)
