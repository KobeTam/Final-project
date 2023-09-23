import React, { createContext, useState } from 'react';

export const AuthContext = createContext("");

export default function AuthProvider({ children }: any) {

    const [test, setTest] = useState("Test Value")

    return (
        <AuthContext.Provider value={test}>
            {children}
        </AuthContext.Provider>
    )
}

