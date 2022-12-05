import React, { useContext } from "react"
import { AuthContext } from "../authentication/authentication.context"


export const useAuth = () => {
    const context = useContext(AuthContext)

    if(!context) {
        throw Error("AuthContextProvider Must Be Wrapped")
    }

    return context
}