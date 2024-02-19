"use client"

import { SessionProvider } from "next-auth/react"

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider = ({children, ...rest}:AuthProviderProps) => {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}
