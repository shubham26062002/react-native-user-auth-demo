import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StatusBar } from "expo-status-bar"

import LoginScreen from "./screens/LoginScreen"
import SignupScreen from "./screens/SignupScreen"
import WelcomeScreen from "./screens/WelcomeScreen"
import { Colors } from "./constants/styles"
import { useAuthToken } from "./hooks/use-auth-token"
import IconButton from "./components/ui/IconButton"

const Stack = createNativeStackNavigator()

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  )
}

function AuthenticatedStack() {
  const { setAuthToken } = useAuthToken()

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
        headerRight: ({
          tintColor,
        }) => (
          <IconButton icon="exit" color={tintColor} size={24} onPress={() => {
            setAuthToken(null)
          }} />
        )
      }} />
    </Stack.Navigator>
  )
}

function Navigation() {
  const { authToken } = useAuthToken()

  return (
    <NavigationContainer>

      {!!authToken ? (
        <AuthenticatedStack />
      ) : (
        <AuthStack />
      )}

    </NavigationContainer>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />

      <Navigation />
    </>
  )
}