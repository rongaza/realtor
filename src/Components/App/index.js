import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navigation from '../Navigation'
import Landing from '../Landing'
import SignUp from '../SignUp'
import SignIn from '../SignIn'
import Dashboard from '../Dashboard'
import Account from '../Account'

import * as ROUTES from '../../constants/routes'

function App() {
    return (
        <Router>
            <div>
                <Navigation />

                <hr />

                <Route exact path={ROUTES.LANDING} component={Landing} />
                <Route path={ROUTES.SIGN_UP} component={SignUp} />
                <Route path={ROUTES.SIGN_IN} component={SignIn} />
                <Route path={ROUTES.DASHBOARD} component={Dashboard} />
                <Route path={ROUTES.ACCOUNT} component={Account} />
            </div>
        </Router>
    )
}

export default App
