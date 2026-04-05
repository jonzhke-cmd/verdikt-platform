'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

interface User {
  id: string
  email: string
  name: string
  image?: string
  balance: number
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (provider?: string) => Promise<void>
  logout: () => Promise<void>
  updateBalance: (amount: number) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') {
      setIsLoading(true)
      return
    }

    if (session?.user) {
      // Get or create user from localStorage (or would be database in real app)
      const storedUser = localStorage.getItem(`verdikt_user_${session.user.email}`)
      
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      } else {
        const newUser: User = {
          id: session.user.email || `user_${Date.now()}`,
          email: session.user.email || '',
          name: session.user.name || session.user.email?.split('@')[0] || 'User',
          image: session.user.image,
          balance: 1000.00
        }
        setUser(newUser)
        localStorage.setItem(`verdikt_user_${session.user.email}`, JSON.stringify(newUser))
      }
    } else {
      setUser(null)
    }
    
    setIsLoading(false)
  }, [session, status])

  const login = async (provider: string = 'github') => {
    await signIn(provider)
  }

  const logout = async () => {
    await signOut({ callbackUrl: '/' })
  }

  const updateBalance = (amount: number) => {
    if (user) {
      const updatedUser = { ...user, balance: user.balance + amount }
      setUser(updatedUser)
      localStorage.setItem(`verdikt_user_${user.email}`, JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, updateBalance }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}