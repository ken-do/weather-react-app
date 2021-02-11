/* istanbul ignore file */
import { ComponentType } from 'react'
import { PATH } from 'utils/constants'
import { Plain, Search } from './layouts'
import { Home, NotFound, Location, Weather } from './views'

interface Route {
    key: string
    path: string
    view: ComponentType
    layout: ComponentType
}

const routes: Route[] = [
    {
        key: 'home',
        path: PATH.home,
        view: Home,
        layout: Plain,
    },
    {
        key: 'location',
        path: `${PATH.location}`,
        view: Location,
        layout: Search,
    },
    {
        key: 'weather',
        path: `${PATH.weather}/:woeid(\\d+)?`,
        view: Weather,
        layout: Search,
    },
    {
        key: 'not-found',
        path: '*',
        view: NotFound,
        layout: Search,
    },
]

export default routes
