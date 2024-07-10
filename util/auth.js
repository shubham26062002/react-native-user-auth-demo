import axios from "axios"

export const authenticate = async (mode, email, password) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${process.env.EXPO_PUBLIC_FIREBASE_WEB_API_KEY}`

    const response = await axios.post(url, {
        email,
        password,
        returnSecureToken: true,
    })

    const token = response.data.idToken

    return token
}

export const createUser = async (email, password) => {
    return await authenticate("signUp", email, password)
}

export const login = async (email, password) => {
    return await authenticate("signInWithPassword", email, password)
}