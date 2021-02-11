import React, { PropsWithChildren } from 'react'

const LayoutPlain = ({ children }: PropsWithChildren<unknown>) => {
    return (
        <section>
            <main role="main" className="container">
                {children}
            </main>
        </section>
    )
}

export default LayoutPlain
