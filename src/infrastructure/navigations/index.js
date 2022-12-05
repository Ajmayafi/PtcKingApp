import React, { useState } from "react";
import { AuthenticationNavigation } from "./authentication.navigation";
import { AccountNavigation } from "./account.navigation";
import { useAuth } from "../../services/hooks/useAuth";

export const Navigation = () => {
   const { user } = useAuth()

    return (
        user ? <AccountNavigation /> : <AuthenticationNavigation /> 
    )
}
