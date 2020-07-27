import React, { useEffect, useState, useContext } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Row, Col, Typography, Button } from 'antd'

import { AuthContext } from '../Firebase/context'
import { getListingDetails, canUserEditDoc } from '../Firebase'

// get url parameters
const useQuery = () => {
    return new URLSearchParams(useLocation().search)
}

const ListingDetails = () => {
    const [listingDetails, setListingDetails] = useState()
    const context = useContext(AuthContext)
    const query = useQuery()
    const docID = query.get('id')

    useEffect(() => {
        getListingDetails(docID).then((doc) => setListingDetails(doc))
    }, [])

    return (
        <Col>
            <Typography.Title>Listing Details</Typography.Title>
            <Col>
                {renderListingDetails(listingDetails)}
                <Col>{renderEditButton(context.authUser.uid, docID)}</Col>
            </Col>
        </Col>
    )
}

const renderEditButton = (uid, docID) => {
    let flag = uid ? canUserEditDoc(uid, docID) : false

    if (flag) {
        return (
            <Link to={`/listing/edit?id=${docID}`}>
                <Button>Edit</Button>
            </Link>
        )
    }
}

const renderListingDetails = (listing) => {
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
