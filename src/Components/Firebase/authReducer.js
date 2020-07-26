export const SIGN_IN = 'SIGN_IN'
export const SIGN_OUT = 'SIGN_OUT'

const authReducer = (state, action) => {
    let uid
    if (action.payload) {
        uid = action.payload.uid
    }

    switch (action.type) {
        case SIGN_IN:
            return { authUser: true, uid }
        case SIGN_OUT:
            return { authUser: false }
        default:
            return state
    }
}

export default authReducer
