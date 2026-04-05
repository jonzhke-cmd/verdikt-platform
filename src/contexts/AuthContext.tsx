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

const MOCK_USERS_KEY = 'verdikt_mock_users'
const CURRENT_USER_KEY = 'verdikt_current_user'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem(CURRENT_USER_KEY)
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        localStorage.removeItem(CURRENT_USER_KEY)
      }
    }
    setIsLoading(false)
  }, [])

  const getMockUsers = (): Record<string, User> => {
    const stored = localStorage.getItem(MOCK_USERS_KEY)
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch (e) {
        return {}
      }
    }
    return {}
  }

  const saveMockUsers = (users: Record<string, User>) => {
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users))
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simple mock auth - in real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network delay
      
      const users = getMockUsers()
      const user = Object.values(users).find(u => u.email === email)
      
      if (!user) {
        return { success: false, error: 'User not found' }
      }
      
      // Simple password check (in real app, use proper hashing)
      if (password !== 'demo123') {
        return { success: false, error: 'Invalid password' }
      }
      
      setUser(user)
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
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
      
      const users = getMockUsers()
      
      // Check if user exists
      if (Object.values(users).some(u => u.email === email)) {
        return { success: false, error: 'Email already registered' }
      }
      
      const newUser: User = {
        id: `user_${Date.now()}`,
        email,
        name,
        balance: 1000.00, // Starting balance
        createdAt: new Date().toISOString()
      }
      
      users[newUser.id] = newUser
      saveMockUsers(users)
      
      setUser(newUser)
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser))
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Signup failed' }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(CURRENT_USER_KEY)
  }

  const updateBalance = (amount: number) => {
    if (user) {
      const updatedUser = { ...user, balance: user.balance + amount }
      setUser(updatedUser)
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser))
      
      // Also update in users storage
      const users = getMockUsers()
      users[user.id] = updatedUser
      saveMockUsers(users)
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