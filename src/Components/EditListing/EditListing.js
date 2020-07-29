import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import ListForm from '../Forms/ListForm'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../Firebase/context'
import { canUserEditDoc, editDoc } from '../Firebase'

const useQuery = () => {
    return new URLSearchParams(useLocation().search)
}

const EditListing = () => {
    const context = useContext(AuthContext)
    const history = useHistory()
    const query = useQuery()
    const docID = query.get('id')

    let editFlag = canUserEditDoc(context.authUser.uid, docID)

    const handleSubmit = (listingInfo) => {
        editDoc(docID, listingInfo, context.authUser.uid)
        history.push('/dashboard')
    }

    if (editFlag) {
        return (
            <div>
                Edit Listing
                <ListForm formCB={handleSubmit} />
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
