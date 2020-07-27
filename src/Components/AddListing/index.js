import React, { useState, useEffect, useContext } from 'react'
import ListForm from './ListForm'

import { Button } from 'antd'

import { db, addDoc } from '../Firebase/index'
import * as firebase from 'firebase/app'

import { AuthContext } from '../Firebase/context'

const initialState = {
    mls: '12345',
    street: '600 Fairfax Road',
    street2: '',
    city: 'Danville',
    state: 'CA',
    zip: '94526',
    neighborhood: '',
    price: 800000,
    dateListed: new Date(),
    bedrooms: '3',
    baths: '2',
    garageSize: '600',
    squareFeet: '1500',
    lotSize: '8000',
}

const AddListing = () => {
    const authContext = useContext(AuthContext)

    const handleSubmit = (listingInfo) => {
        console.log('submitting')
        addDoc(listingInfo, authContext.authUser.uid)
    }
    return (
        <div>
            <ListForm addDoc={handleSubmit} />
        </div>
    )
}
export default AddListing
