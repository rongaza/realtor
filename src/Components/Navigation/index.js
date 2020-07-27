import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

import * as ROUTES from '../../constants/routes'
import * as SESSION from '../Firebase/authReducer'

import { auth } from '../Firebase'
import { AuthContext } from '../Firebase/context'

const Navigation = () => {
    const context = useContext(AuthContext)
    const authUser = context.authUser.authUser
    if (authUser) {
        return <NavigationAuth />
    } else {
        return <NavigationNoAuth />
    }
}

const NavigationAuth = () => {
    const context = useContext(AuthContext)
    return (
        <div>
            <ul>
                <li>
                    <Link to={ROUTES.LANDING}>Landing</Link>
                </li>
                <li>
                    <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
                </li>
                <li>
                    <Link to={ROUTES.ACCOUNT}>Account</Link>
                </li>
                <li>
                    <Link to={ROUTES.ADD_LISTING}>Add New Listing</Link>
                </li>
                <li>
                    <Button
                        type="primary"
                        onClick={() => {
                            auth.signOut()
                            context.authUserDispatch({ type: SESSION.SIGN_OUT })
                        }}
                    >
                        Sign Out
                    </Button>
                </li>
            </ul>
        </div>
    )
}
const NavigationNoAuth = () => (
    <div>
        <ul>
            <li>
                <Link to={ROUTES.SIGN_IN}>Sign In</Link>
            </li>
            <li>
                <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
            </li>
            <li>
                <Link to={ROUTES.LANDING}>Landing</Link>
            </li>
        </ul>
    </div>
)

export default Navigation
