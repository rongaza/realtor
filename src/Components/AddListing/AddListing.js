import React, { useContext } from 'react'
import ListForm from '../Forms/ListForm'
import { useHistory } from 'react-router-dom'
import { addDoc } from '../Firebase/index'
import { AuthContext } from '../Firebase/context'

const AddListing = () => {
    const authContext = useContext(AuthContext)
    const history = useHistory()

    const handleSubmit = (listingInfo) => {
        addDoc(listingInfo, authContext.authUser.uid)
        history.push('/dashboard')
    }
    return (
        <div>
            <ListForm formCB={handleSubmit} />
        </div>
    )
}
export default AddListing
