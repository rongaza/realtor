import React, { useState, useEffect } from 'react'
import { db, getListings } from '../Firebase'

import { Row, Col, Card } from 'antd'

const Landing = () => {
    const [listingResults, setListingResults] = useState([])

    const renderListings = () =>
        listingResults.map((listing) => {
            console.log(listing)
            return (
                <Col key={listing.id}>
                    <Card>
                        <p>{listing.data.street}</p>
                        <p>
                            {listing.data.city},{listing.data.state} --{' '}
                            {listing.data.zip}
                        </p>
                    </Card>
                </Col>
            )
        })

    useEffect(() => {
        getListings(setListingResults)
    }, [])

    useEffect(() => {
        console.log(listingResults)
    }, [listingResults])
    return (
        <Row>
            <Col>
                <h1>Houses</h1>
                <Row>{listingResults.length > 0 && renderListings()}</Row>
            </Col>
        </Row>
    )
}

export default Landing
