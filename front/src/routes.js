import React from 'react';

import {
    Route,
    Switch,
    BrowserRouter
} from 'react-router-dom'

import Dashboard from './pages/Dashboard'

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Dashboard}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;