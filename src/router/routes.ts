// layouts
import Basic from './layouts/Basic'
// views
import Home from './views/Home'
import NotFound from './views/NotFound'
import Location from './views/Location'

const routes = {
    home: {
        path: '/',
        view: Home,
        layout: Basic,
    },
    location: {
        path: '/location/:id(\\d+)?',
        view: Location,
        layout: Basic,
    },
    notFound: {
        path: '*',
        view: NotFound,
        layout: Basic,
    },
}

export default routes
