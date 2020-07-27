import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

import { AuthContext } from '../Firebase/context'

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const context = useContext(AuthContext)
    console.log(context)
    return (
        <Route
            {...rest}
            render={(props) =>
                context.authUser.authUser ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                )
            }
        />
    )
}

export default ProtectedRoute
