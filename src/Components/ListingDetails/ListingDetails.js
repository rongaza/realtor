import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Row, Col, Typography } from 'antd'

import { getListingDetails } from '../Firebase'

// get url parameters
const useQuery = () => {
    return new URLSearchParams(useLocation().search)
}

const ListingDetails = () => {
    const [listingDetails, setListingDetails] = useState()
    const query = useQuery()

    useEffect(() => {
        getListingDetails(query.get('id')).then((doc) => setListingDetails(doc))
    }, [])

    return (
        <Col>
            <Typography.Title>Listing Details</Typography.Title>
            <Row>
                {renderListingDetails(listingDetails)}
                <Col></Col>
            </Row>
        </Col>
    )
}

const renderListingDetails = (listing) => {
    console.log(listing)
    if (listing) {
        return (
            <Col>
                <Typography.Paragraph>{listing.street}</Typography.Paragraph>
                <Typography.Text>
                    {listing.city}, {listing.state}
                </Typography.Text>
            </Col>
        )
    } else {
        return null
    }
}

export default ListingDetails
