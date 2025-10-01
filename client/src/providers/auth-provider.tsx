import React, { createContext, useState } from "react"

export interface ISession {
    name:string,
    email:string,
    role:string
}
const AuthContext = createContext<ISession|null>(null)


const AuthProvider = ({children}:
    {children:React.ReactNode}
) =>{
    const [session,setSession] = useState<ISession|null>(null)
    return (
        <AuthContext.Provider value={session}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider