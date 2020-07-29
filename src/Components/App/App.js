import React, { useEffect } from 'react'
import { Router, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { useStorageReducer } from 'react-storage-hooks'

import Navigation from '../Navigation'
import Landing from '../Landing/Landing'
import SignUp from '../SignUp'
import SignIn from '../SignIn'
import Dashboard from '../Dashboard/Dashboard'
import Account from '../Account'
import AddListing from '../AddListing/AddListing'
import ListingDetails from '../ListingDetails/ListingDetails'
import EditListing from '../EditListing/EditListing'

import { AuthContext } from '../Firebase/context'
import authReducer from '../Firebase/authReducer'
import { auth } from '../Firebase'
import * as SESSION from '../Firebase/authReducer'

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import * as ROUTES from '../../constants/routes'

const history = createBrowserHistory()

function App() {
    const initialState = { authUser: false }
    const [authUser, authUserDispatch] = useStorageReducer(
        localStorage,
        'authReducer',
        authReducer,
        initialState
    )

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                authUserDispatch({ type: SESSION.SIGN_IN, payload: user })
            }
        })
    }, [authUserDispatch])

    useEffect(() => {}, [authUser])
    return (
        <AuthContext.Provider value={{ authUser, authUserDispatch }}>
            <Router history={history}>
                <div>
                    <Navigation />

                    <hr />

                    <Route exact path={ROUTES.LANDING} component={Landing} />
                    <Route path={ROUTES.SIGN_UP} component={SignUp} />
                    <Route path={ROUTES.SIGN_IN} component={SignIn} />
                    <Route path={ROUTES.DETAILS} component={ListingDetails} />
                    <ProtectedRoute
                        path={ROUTES.DASHBOARD}
                        component={Dashboard}
                    />
                    <ProtectedRoute
                        path={ROUTES.ADD_LISTING}
                        component={AddListing}
                    />
                    <ProtectedRoute path={ROUTES.ACCOUNT} component={Account} />
                    <ProtectedRoute
                        path={ROUTES.EDIT}
                        component={EditListing}
                    />
                </div>
            </Router>
        </AuthContext.Provider>
    )
}

export default App
