import { useState } from "react"
import { Alert } from "react-native"

import AuthContent from "../components/Auth/AuthContent"
import LoadingOverlay from "../components/ui/LoadingOverlay"
import { createUser } from "../util/auth"
import { useAuthToken } from "../hooks/use-auth-token"

function SignupScreen() {
    const { setAuthToken } = useAuthToken()

    const [isAuthenticating, setIsAuthenticating] = useState(false)

    const signupHandler = async ({
        email,
        password,
    }) => {
        setIsAuthenticating(true)

        try {
            const token = await createUser(email, password)

            if (!!token) {
                setAuthToken(token)
            }
        } catch (error) {
            Alert.alert("Authentication failed", "Error occurred while creating user. Please check your credentials and try again.")
        }

        setIsAuthenticating(false)
    }

    if (isAuthenticating) {
        return (
            <LoadingOverlay message="Creating user..." />
        )
    }

    return <AuthContent onAuthenticate={signupHandler} />
}

export default SignupScreen