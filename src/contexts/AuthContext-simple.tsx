'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  email: string
  name: string
  balance: number
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateBalance: (amount: number) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user on mount (client-side only)
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('verdikt_current_user')
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser))
        } catch (e) {
          localStorage.removeItem('verdikt_current_user')
        }
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Simple mock auth
      if (password !== 'demo123') {
        return { success: false, error: 'Invalid password' }
      }
      
      const mockUser: User = {
        id: `user_${Date.now()}`,
        email,
        name: email.split('@')[0],
        balance: 1000.00,
        createdAt: new Date().toISOString()
      }
      
      setUser(mockUser)
      if (typeof window !== 'undefined') {
        localStorage.setItem('verdikt_current_user', JSON.stringify(mockUser))
      }
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Login failed' }
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const newUser: User = {
        id: `user_${Date.now()}`,
        email,
        name,
        balance: 1000.00,
        createdAt: new Date().toISOString()
      }
      
      setUser(newUser)
      if (typeof window !== 'undefined') {
        localStorage.setItem('verdikt_current_user', JSON.stringify(newUser))
      }
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Signup failed' }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('verdikt_current_user')
    }
  }

  const updateBalance = (amount: number) => {
    if (user) {
      const updatedUser = { ...user, balance: user.balance + amount }
      setUser(updatedUser)
      if (typeof window !== 'undefined') {
        localStorage.setItem('verdikt_current_user', JSON.stringify(updatedUser))
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateBalance }}>
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