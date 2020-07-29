import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Firebase/context'
import ListData from '../ListData/ListData'
import { Row } from 'antd'
import { getUserListings } from '../Firebase'

const Dashboard = () => {
    const context = useContext(AuthContext)
    const [userListings, setUserListings] = useState([])

    // const handleGetUserListings = useCallback(() => {
    //     getUserListings(context.authUser.uid, setUserListings)
    // }, [context.authUser.uid, setUserListings])

    useEffect(() => {
        getUserListings(context.authUser.uid, setUserListings)
    }, [context.authUser.uid])

    useEffect(() => {
        userListings.forEach((element) => {
            console.log(element, 'hi')
        })
    }, [userListings])
    return (
        <div>
            <h1>Dashboard</h1>
            <Row>
                {userListings &&
                    userListings.map((listing) => {
                        return (
                            <ListData
                                id={listing.id}
                                data={listing.data}
                                key={listing.id}
                            />
                        )
                    })}
            </Row>
        </div>
    )
}

export default Dashboard
