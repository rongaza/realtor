import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import { replaceUndefinedToNull } from '../../helpers/index'

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_ID,
}

firebase.initializeApp(config)

export const auth = firebase.auth()

export const db = firebase.firestore()

export const createNewUser = async (formValues, cbError) => {
    const user = await auth
        .createUserWithEmailAndPassword(
            formValues.email,
            formValues.passwordOne
        )
        .catch((error) => {
            console.log(error)
            cbError({ ...error })
        })

    // create listings array for users to put real estate listings
    db.collection('users').doc(user.user.uid).set({ listings: [] })
}

export const mlsUnique = async (mlsID) => {
    let docRef = await db.collection('mls').doc(mlsID)
    let doc = await docRef.get()
    if (!doc.exists) {
        return true
    } else {
        return false
    }
}

export const addDoc = async (listing, authUser) => {
    listing = replaceUndefinedToNull(listing)

    try {
        // add listing to firestore
        let listingDoc = await db.collection('listings').add({
            ...listing,
            state: listing.state.toUpperCase(),
        })

        // add photos

        // add listing id to users listing array
        let userListID = await db
            .collection('users')
            .doc(authUser)
            .update({
                listings: firebase.firestore.FieldValue.arrayUnion(
                    listingDoc.id
                ),
            })
        return userListID
    } catch (error) {
        return error
    }
}

export const editDoc = (id, listing) => {
    db.collection('listings')
        .doc(id)
        .update(listing)
        .then((res) => res)
        .catch((err) => console.log(err))
}

export const deleteDoc = async () => {}

export const getListings = async (setListingsCB) => {
    const listingsRef = await db.collection('listings')
    const snapshot = await listingsRef.get()
    const results = []
    snapshot.forEach((doc) => {
        results.push({ id: doc.id, data: doc.data() })
    })
    return setListingsCB(results)
}

export const getUserListings = async (authUser, setListingsCB) => {
    const userListings = []
    // const listingsRef = db.collections('users').doc(authUser)

    const resultRef = await firebase
        .firestore()
        .collection('users')
        .doc(authUser)
        .get()

    let userListingIDs = resultRef.data().listings

    userListingIDs.forEach(async (id) => {
        let docRef = await db.collection('listings').doc(id)
        let doc = await docRef.get()

        userListings.push({ id: doc.id, data: doc.data() })
    })

    setListingsCB(() => userListings)
}

export const canUserEditDoc = async (uid, docID) => {
    const results = await getUserListingIds(uid)
    return results.includes(docID)
}

export const getUserListingIds = async (uid) => {
    let listingIDs = []
    const listingsRef = await db.collection('users').doc(uid).get()

    listingIDs = [...listingsRef.data().listings]

    return listingIDs
}

export const getListingDetails = async (id) => {
    const docRef = await db.collection('listings').doc(id)
    const doc = await docRef.get()
    return doc.data()
}
