import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('shows Home page by default', () => {
    render(<App />)
    const linkElement = screen.getByText(/home/i)
    expect(linkElement).toBeInTheDocument()
})
