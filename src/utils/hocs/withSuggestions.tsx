/* eslint-disable react/jsx-props-no-spreading */
import React, {
    ComponentType,
    useCallback,
    useEffect,
    useMemo,
    useRef,
} from 'react'
import _debounce from 'lodash/debounce'
import { DEBOUNCE_WAIT_MS } from 'utils/constants'
import { SearchBoxProps } from 'components/SearchBox'
import SuggestionsDropdown, { Suggestion } from 'components/SuggestionDropdown'

interface WithSuggestionsProps {
    suggestions: Suggestion[]
    fetchSuggestions: (value: string) => void
    resetSuggestions: () => void
    handleSuggestionSelect: (id: number) => void
}

function withSuggestions<T extends SearchBoxProps>(
    WrappedSearchBox: ComponentType<T>
) {
    const SearchBoxWithSuggestions = (props: T & WithSuggestionsProps) => {
        const {
            suggestions,
            handleSuggestionSelect,
            fetchSuggestions,
            resetSuggestions,
            ...wrappedComponentProps
        } = props

        const {
            afterInputChanged: afterFetchedSuggestions,
            afterButtonClicked,
        } = wrappedComponentProps

        const enhancedFetchSuggestions = useCallback(
            (value) => {
                fetchSuggestions(value)
                if (afterFetchedSuggestions) {
                    afterFetchedSuggestions(value)
                }
            },
            [afterFetchedSuggestions, fetchSuggestions]
        )

        const enhancedHandleSuggestionSelect = useCallback(
            (id: number) => {
                resetSuggestions()
                handleSuggestionSelect(id)
            },
            [handleSuggestionSelect, resetSuggestions]
        )

        wrappedComponentProps.afterInputChanged = useMemo(
            () => _debounce(enhancedFetchSuggestions, DEBOUNCE_WAIT_MS),
            [enhancedFetchSuggestions]
        )

        wrappedComponentProps.afterButtonClicked = useCallback(
            (value: string) => {
                if (afterButtonClicked) {
                    resetSuggestions()
                    afterButtonClicked(value)
                }
            },
            [afterButtonClicked, resetSuggestions]
        )

        const wrapperRef = useRef<HTMLDivElement>(null)

        useEffect(() => {
            document.addEventListener('click', (event) => {
                const isOutsideClick =
                    wrapperRef.current &&
                    !wrapperRef.current?.contains(event.target as Node)
                if (isOutsideClick) {
                    resetSuggestions()
                }
            })
        }, [resetSuggestions])

        return (
            <div style={{ position: 'relative' }} ref={wrapperRef}>
                <WrappedSearchBox
                    {...((wrappedComponentProps as SearchBoxProps) as T)}
                />
                {!!suggestions.length && (
                    <SuggestionsDropdown
                        suggestions={suggestions}
                        handleSuggestionSelect={enhancedHandleSuggestionSelect}
                    />
                )}
            </div>
        )
    }
    return SearchBoxWithSuggestions
}

export default withSuggestions
