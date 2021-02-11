import React, { PropsWithChildren, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import store from 'src/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

export const AllTheProviders = ({ children }: PropsWithChildren<unknown>) => (
    <Provider store={store}>
        <Router>{children}</Router>
    </Provider>
)

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'queries'>
) => {
    return render(ui, { wrapper: AllTheProviders, ...options })
}

export * from '@testing-library/react'

export { customRender as render }
