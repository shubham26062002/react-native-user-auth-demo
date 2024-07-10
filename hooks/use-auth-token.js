import { create } from "zustand"

export const useAuthToken = create((set) => ({
    authtoken: null,
    setAuthToken: (authToken) => set({
        authToken,
    }),
}))