import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Firebase/context'
import { getUserListings } from '../Firebase'
import ListData from '../ListData/ListData'

const Dashboard = () => {
    const context = useContext(AuthContext)
    const [userListings, setUserListings] = useState([])

    const fetchData = async () => {
        const results = await getUserListings()
        setUserListings(results)
    }

    useEffect(() => {
        fetchData()
    }, [])
    useEffect(() => {
        console.log(userListings)
    }, [userListings])
    return (
        <div>
            <h1>Dashboard</h1>
            <ListData data={userListings} />
        </div>
    )
}

export default Dashboard
