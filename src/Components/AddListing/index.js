import React, { useContext } from 'react'
import ListForm from './ListForm'

import { addDoc } from '../Firebase/index'

import { AuthContext } from '../Firebase/context'

const AddListing = () => {
    const authContext = useContext(AuthContext)

    const handleSubmit = (listingInfo) => {
        addDoc(listingInfo, authContext.authUser.uid)
    }
    return (
        <div>
            <ListForm addDoc={handleSubmit} />
        </div>
    )
}
export default AddListing
