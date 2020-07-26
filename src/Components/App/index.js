import React, { useReducer, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navigation from '../Navigation'
import Landing from '../Landing'
import SignUp from '../SignUp'
import SignIn from '../SignIn'
import Dashboard from '../Dashboard'
import Account from '../Account'

import { AuthContext } from '../Firebase/context'
import authReducer from '../Firebase/authReducer'
import { auth } from '../Firebase'

import * as ROUTES from '../../constants/routes'

function App() {
    const initialState = { authUser: false }
    const [authUser, authUserDispatch] = useReducer(authReducer, initialState)

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            authUser && authUserDispatch({ type: 'SIGN_IN', payload: authUser })
        })
    }, [])

    useEffect(() => {
        console.log(authUser)
    }, [authUser])
    return (
        <AuthContext.Provider value={{ authUser, authUserDispatch }}>
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
        </AuthContext.Provider>
    )
}

export default App
