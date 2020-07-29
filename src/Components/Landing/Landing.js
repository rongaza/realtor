import React, { useState, useEffect } from 'react'
import { getListings } from '../Firebase'

import ListData from '../ListData/ListData'

import { Row } from 'antd'

const Landing = () => {
    const [listingResults, setListingResults] = useState([])

    useEffect(() => {
        getListings(setListingResults)
    }, [])

    return (
        <Row justify="center" gutter={[8, 8]}>
            {listingResults &&
                listingResults.map((listing) => {
                    return (
                        <ListData
                            id={listing.id}
                            data={listing.data}
                            key={listing.id}
                        />
                    )
                })}
        </Row>
    )
}

export default Landing
