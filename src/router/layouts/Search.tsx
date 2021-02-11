import React, { memo, PropsWithChildren } from 'react'
import NavBar from 'src/components/NavBar'
import LocationSearchBox from 'src/features/search/LocationSearchBox'

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

export default memo(LayoutSearch)
