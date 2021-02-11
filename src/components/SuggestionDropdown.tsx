import React from 'react'
import styles from './SuggestionDropDown.module.scss'

export interface Suggestion {
    id: number
    title: string
    [key: string]: unknown
}

interface Props {
    suggestions: Suggestion[]
    handleSuggestionSelect: (id: number) => void
}

const SuggestionsDropdown = ({
    suggestions,
    handleSuggestionSelect,
}: Props) => {
    return (
        <ul className={`list-group ${styles.wrapper}`}>
            {suggestions.map(({ id, title }) => (
                <li
                    className="list-group-item"
                    role="presentation"
                    key={id}
                    onClick={() => handleSuggestionSelect(id)}
                >
                    {title}
                </li>
            ))}
        </ul>
    )
}
export default SuggestionsDropdown
