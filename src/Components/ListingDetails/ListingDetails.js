import React, { useEffect, useState, useContext, useCallback } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Col, Typography, Button, Card, Row } from 'antd'

import { AuthContext } from '../Firebase/context'
import { getListingDetails, canUserEditDoc } from '../Firebase'

// get url parameters
const useQuery = () => {
    return new URLSearchParams(useLocation().search)
}

const ListingDetails = () => {
    const [listingDetails, setListingDetails] = useState()
    const [editFlag, setEditFlag] = useState(false)
    const context = useContext(AuthContext)
    const query = useQuery()
    const docID = query.get('id')

    const memoGetListingDetails = useCallback(() => {
        getListingDetails(docID).then((doc) => setListingDetails(doc))
    }, [docID])

    const memoCanUserEditDoc = useCallback(() => {
        canUserEditDoc(context.authUser.uid, docID).then((res) =>
            setEditFlag(res)
        )
    }, [context.authUser.uid, docID])

    useEffect(() => {
        memoGetListingDetails()
        memoCanUserEditDoc()
    }, [memoGetListingDetails, memoCanUserEditDoc])

    return (
        <Row justify="center" style={{ padding: 20 }}>
            <Col span={10}>
                <Typography.Title>Listing Details</Typography.Title>
                <Col>
                    {renderListingDetails(listingDetails)}
                    <Col>{renderEditDeleteButtons(editFlag, docID)}</Col>
                </Col>
            </Col>
        </Row>
    )
}

const renderEditDeleteButtons = (editFlag, docID) => {
    if (editFlag) {
        return (
            <Row>
                <Col>
                    <Link to={`/listing/edit?id=${docID}`}>
                        <Button>Edit</Button>
                    </Link>
                </Col>
                <Col>
                    <Button>Delete</Button>
                </Col>
            </Row>
        )
    }
}

const renderListingDetails = (listing) => {
    if (listing) {
        return (
            <Card>
                <Col>
                    <Row gutter={8}>
                        <Col>
                            <Typography.Title level={3}>
                                ${listing.price}
                            </Typography.Title>
                            <p>Listing Date |{listing.listingDate}</p>
                        </Col>
                    </Row>
                    <Row gutter={12}>
                        <Col>{listing.street}</Col>
                        <Col>
                            <Typography.Text>
                                {listing.city}, {listing.state} | {listing.zip}
                            </Typography.Text>
                        </Col>
                    </Row>
                    <Row>
                        <Row>{listing.neighborhood}</Row>
                    </Row>
                    <hr />
                    <Col>
                        <h4>Overview</h4>
                        <Typography.Paragraph>
                            {listing.description}
                        </Typography.Paragraph>
                        <Row gutter={8}>
                            <Col>{listing.bedrooms} | bd</Col>
                            <Col>{listing.baths} | ba</Col>
                        </Row>
                        <Row>
                            <Col>{listing.squareFeet} | sqft</Col>
                        </Row>
                        <Row>
                            <Col>{listing.lotSize} | lot sqft</Col>
                        </Row>
                        <Row>
                            <Col>{listing.garageSize} | garage sqft</Col>
                        </Row>
                    </Col>
                </Col>
                <Row></Row>
            </Card>
        )
    } else {
        return null
    }
}

export default ListingDetails
