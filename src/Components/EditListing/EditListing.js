import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'

import ListForm from '../Forms/ListForm'

import { AuthContext } from '../Firebase/context'
import { canUserEditDoc } from '../Firebase'

const useQuery = () => {
    return new URLSearchParams(useLocation().search)
}

const EditListing = () => {
    const { authUser } = useContext(AuthContext)
    const query = useQuery()
    const docID = query.get('id')

    let editFlag = canUserEditDoc(authUser.uid, docID)

    if (editFlag) {
        return (
            <div>
                Edit Listing
                <ListForm />
            </div>
        )
    } else {
        return <NotAuth />
    }
}

const NotAuth = () => {
    return <div>You are not authorized to access this page</div>
}

export default EditListing
