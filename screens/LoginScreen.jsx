import { useState } from "react"
import { Alert } from "react-native"

import { login } from "../util/auth"
import AuthContent from "../components/Auth/AuthContent"
import LoadingOverlay from "../components/ui/LoadingOverlay"
import { useAuthToken } from "../hooks/use-auth-token"

function LoginScreen() {
    const { setAuthToken } = useAuthToken()

    const [isAuthenticating, setIsAuthenticating] = useState(false)

    const loginHandler = async ({
        email,
        password,
    }) => {
        setIsAuthenticating(true)

        try {
            const token = await login(email, password)

            if (!!token) {
                setAuthToken(token)
            }
        } catch (error) {
            Alert.alert("Authentication failed", "Error occurred while logging in. Please check your credentials and try again.")
        }

        setIsAuthenticating(false)
    }

    if (isAuthenticating) {
        return (
            <LoadingOverlay message="Logging in..." />
        )
    }

    return <AuthContent isLogin onAuthenticate={loginHandler} />
}

export default LoginScreen