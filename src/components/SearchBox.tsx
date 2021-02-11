import React, { memo, useState, useCallback } from 'react'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import { withSuggestions } from 'utils/hocs'
import { LOCATION_SEARCH_PLACEHOLDER, EVENT_KEYS } from 'utils/constants'
import styles from './SearchBox.module.scss'

export interface SearchBoxProps {
    afterInputChanged?: (value: string) => void
    afterButtonClicked?: (value: string) => void
    size?: 'sm' | 'lg' | undefined
    autoFocus?: boolean
    isLoading?: boolean
}

export const SearchBox: React.FC<SearchBoxProps> = ({
    afterInputChanged,
    afterButtonClicked,
    size,
    autoFocus,
    isLoading,
}: SearchBoxProps) => {
    const [value, setValue] = useState('')

    const handleInputChange = useCallback(
        (event) => {
            setValue(event.target.value)
            if (afterInputChanged) {
                afterInputChanged(event.target.value)
            }
        },
        [afterInputChanged]
    )

    const handleButtonClick = useCallback(() => {
        if (afterButtonClicked) {
            afterButtonClicked(value)
        }
        setValue('')
    }, [afterButtonClicked, value])

    const handleEnterKey = useCallback(
        (event) => {
            if (event.key === EVENT_KEYS.enter) {
                event.preventDefault()
                handleButtonClick()
            }
        },
        [handleButtonClick]
    )

    return (
        <Form inline className="flex-nowrap">
            <InputGroup size={size} className={styles.inputGroup}>
                <FormControl
                    type="text"
                    placeholder={LOCATION_SEARCH_PLACEHOLDER}
                    className="border-right-0 rounded-0"
                    value={value}
                    onChange={handleInputChange}
                    onKeyDown={handleEnterKey}
                    autoFocus={autoFocus}
                />
                <Button variant="success rounded-0" onClick={handleButtonClick}>
                    {isLoading ? (
                        <>
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="mr-1"
                            />
                            Loading...
                        </>
                    ) : (
                        'Search'
                    )}
                </Button>
            </InputGroup>
        </Form>
    )
}

SearchBox.defaultProps = {
    afterInputChanged: () => {},
    afterButtonClicked: () => {},
    size: undefined,
    autoFocus: false,
    isLoading: false,
}

export const SearchBoxWithSuggestions = withSuggestions(SearchBox)

export default memo(SearchBox)
