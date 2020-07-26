import React, { useContext } from 'react'
import { AuthContext } from '../Firebase/context'

const Dashboard = () => {
    const context = useContext(AuthContext)

    const handleSignIn = () => {
        context.dispatch({ type: 'SIGN_IN' })
    }
    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleSignIn}>Sign In</button>
            {context.state === true ? <p>Signed In</p> : <p>Signed Out</p>}
        </div>
    )
}

export default Dashboard
