import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Firebase/context'
// import { getUserListings } from '../Firebase'
import ListData from '../ListData/ListData'
import { getUserListings } from '../Firebase'

const Dashboard = () => {
    const context = useContext(AuthContext)
    const [userListings, setUserListings] = useState([])

    useEffect(() => {
        getUserListings(context.authUser.uid, setUserListings)
    }, [])
    return (
        <div>
            <h1>Dashboard</h1>
            <ListData data={userListings} />
        </div>
    )
}

export default Dashboard
