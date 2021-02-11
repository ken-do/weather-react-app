import React, { PropsWithChildren } from 'react'
import NavBar from 'components/NavBar'
import LocationSearchBox from 'features/search/LocationSearchBox'

const LayoutSearch = ({ children }: PropsWithChildren<unknown>) => {
    return (
        <section>
            <header>
                <NavBar>
                    <LocationSearchBox />
                </NavBar>
            </header>
            <main
                role="main"
                className="container"
                style={{ padding: `60px 15px 0` }}
            >
                {children}
            </main>
        </section>
    )
}

export default LayoutSearch
