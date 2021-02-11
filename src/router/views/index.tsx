import React from 'react'
import loadable from '@loadable/component'
import { LoadingIndicator } from 'src/components'

export const Home = loadable(
    () => import(/* webpackChunkName: "Home" */ './Home'),
    {
        fallback: <LoadingIndicator />,
    }
)
export const NotFound = loadable(
    () => import(/* webpackChunkName: "NotFound" */ './NotFound'),
    {
        fallback: <LoadingIndicator />,
    }
)
export const Location = loadable(
    () => import(/* webpackChunkName: "Location" */ './Location'),
    {
        fallback: <LoadingIndicator />,
    }
)
export const Weather = loadable(
    () => import(/* webpackChunkName: "Weather" */ './Weather'),
    {
        fallback: <LoadingIndicator />,
    }
)
