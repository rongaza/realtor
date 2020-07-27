import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Card } from 'antd'

const ListData = ({ data }) => {
    const renderListings = () =>
        data.map((listing) => {
            return (
                <Col key={listing.id}>
                    <Card>
                        <Link to={`/listing/details?id=${listing.id}`}>
                            Stuff
                        </Link>
                        <p>{listing.data.street}</p>
                        <p>
                            {listing.data.city},{listing.data.state} --{' '}
                            {listing.data.zip}
                        </p>
                    </Card>
                </Col>
            )
        })

    return (
        <Row>
            <Col>
                <h1>Houses</h1>
                <Row>{data.length > 0 && renderListings()}</Row>
            </Col>
        </Row>
    )
}

export default ListData
