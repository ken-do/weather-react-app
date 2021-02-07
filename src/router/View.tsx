import React from 'react'
import { Switch, Route } from 'react-router-dom'
import routes from './routes'

const View = () => {
    return (
        <Switch>
            {Object.entries(routes).map(([key, route]) => (
                <Route key={key} exact path={route.path}>
                    <route.layout>
                        <route.view />
                    </route.layout>
                </Route>
            ))}
        </Switch>
    )
}

export default View
