'use client'

import Link from 'next/link'
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [name, setName] = useState('')
  
  const router = useRouter()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300))
      
      if (isSignUp) {
        if (!name.trim()) {
          setError('Name is required')
          return
        }
        
        const newUser = {
          id: `user_${Date.now()}`,
          email,
          name,
          balance: 1000.00,
          createdAt: new Date().toISOString()
        }
        
        localStorage.setItem('verdikt_user', JSON.stringify(newUser))
        router.push('/portfolio')
      } else {
        if (password !== 'demo123') {
          setError('Invalid password. Use "demo123" for demo')
          return
        }
        
        const user = {
          id: `user_${Date.now()}`,
          email,
          name: email.split('@')[0],
          balance: 1000.00,
          createdAt: new Date().toISOString()
        }
        
        localStorage.setItem('verdikt_user', JSON.stringify(user))
        router.push('/portfolio')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 group mb-6">
            <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="#3B82F6" fillOpacity="0.15"/>
              <path
                d="M6 8L13.5 24L16 19L18.5 24L26 8"
                stroke="#3B82F6"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-xl font-bold text-white">VERDIKT</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Welcome to Verdikt</h1>
          <p className="text-gray-400 mt-2 text-sm">
            {isSignUp ? 'Create an account to start trading' : 'Sign in to start trading prediction markets'}
          </p>
        </div>

        <div className="bg-verdikt-card border border-verdikt-border rounded-2xl p-8 shadow-2xl">
          <div className="relative flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-verdikt-border" />
            <span className="text-xs text-gray-500">Continue with email</span>
            <div className="flex-1 h-px bg-verdikt-border" />
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-sm text-gray-400 mb-1.5" htmlFor="name">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-verdikt-bg border border-verdikt-border rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-verdikt-blue transition-colors"
                  disabled={isLoading}
                />
              </div>
            )}

            <div>
              <label className="block text-sm text-gray-400 mb-1.5" htmlFor="email">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-3 bg-verdikt-bg border border-verdikt-border rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-verdikt-blue transition-colors"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm text-gray-400" htmlFor="password">
                  Password
                </label>
                {!isSignUp && (
                  <Link href="#" className="text-xs text-verdikt-blue hover:text-blue-400 transition-colors">
                    Forgot password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  className="w-full pl-10 pr-4 py-3 bg-verdikt-bg border border-verdikt-border rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-verdikt-blue transition-colors"
                  disabled={isLoading}
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Demo password: <code className="bg-gray-800 px-1 py-0.5 rounded">demo123</code>
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-verdikt-blue text-white font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                'Processing...'
              ) : (
                <>
                  {isSignUp ? 'Create Account' : 'Sign In'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp)
                setError('')
              }}
              className="text-verdikt-blue hover:text-blue-400 font-semibold transition-colors"
            >
              {isSignUp ? 'Sign in' : 'Sign up free'}
            </button>
          </p>
        </div>

        <p className="text-xs text-gray-600 text-center mt-6">
          Not financial advice. For entertainment only. No real money involved.
        </p>
      </div>
    </div>
  )
}