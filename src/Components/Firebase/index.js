import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

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

export const addDoc = async (listing, authUser) => {
    // add listing
    let doc = await db.collection('listings').add({
        ...listing,
        state: listing.state.toUpperCase(),
    })

    // add photos

    // add listing id to users listing array
    db.collection('users')
        .doc(authUser)
        .update({
            listings: firebase.firestore.FieldValue.arrayUnion(doc.id),
        })
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

export const getUserListings = async (authUser, setState) => {
    const userListings = []
    const listingsRef = await db.collection('users').doc(authUser).get()

    const listingIDs = [...listingsRef.data().listings]
    // const collections = await listingsRef.listCollections()
    // //
    // const userListingsRef = await db.collection('listings')

    const snapshot = await db
        .collection('listings')
        .where(firebase.firestore.FieldPath.documentId(), 'in', [...listingIDs])
        .get()
    snapshot.forEach((doc) => {
        userListings.push({ id: doc.id, data: doc.data() })
    })

    setState(userListings)
}

export const getUserListingIds = async (authUser, setState) => {
    const listingsRef = await db.collection('users').doc(authUser).get()

    const listingIDs = [...listingsRef.data().listings]

    setState(listingIDs)
}

export const getListingDetails = async (id) => {
    const docRef = await db.collection('listings').doc(id)
    const doc = await docRef.get()
    return doc.data()
}
