import React, { useState, useEffect } from 'react'
import { getListings } from '../Firebase'

import ListData from '../ListData/ListData'

import { Row, Col } from 'antd'

const Landing = () => {
    const [listingResults, setListingResults] = useState([])

    useEffect(() => {
        getListings(setListingResults)
    }, [])

    return (
        <Row>
            <Col>
                <ListData data={listingResults} />
            </Col>
        </Row>
    )
}

export default Landing
