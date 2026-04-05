'use client'

import Link from 'next/link'
import { User, LogOut } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

function VerdiktLogo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="8" fill="#3B82F6" fillOpacity="0.15"/>
        <path
          d="M6 8L13.5 24L16 19L18.5 24L26 8"
          stroke="#3B82F6"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
        VERDIKT
      </span>
    </Link>
  )
}

export default function DesktopNav() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Check for user on mount
    const storedUser = localStorage.getItem('verdikt_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        localStorage.removeItem('verdikt_user')
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('verdikt_user')
    setUser(null)
    router.push('/')
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-verdikt-border bg-verdikt-bg/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <VerdiktLogo />

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/markets"
              className="text-sm text-gray-300 hover:text-white transition-colors font-medium"
            >
              Markets
            </Link>
            <Link
              href="/how-it-works"
              className="text-sm text-gray-300 hover:text-white transition-colors font-medium"
            >
              How it Works
            </Link>
            <Link
              href="/portfolio"
              className="text-sm text-gray-300 hover:text-white transition-colors font-medium"
            >
              Portfolio
            </Link>
            {!user && (
              <Link
                href="/sign-in"
                className="text-sm text-gray-300 hover:text-white transition-colors font-medium"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* CTA / User Info */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="hidden md:flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <User className="w-4 h-4" />
                  <span>{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-verdikt-border text-gray-400 text-xs font-medium hover:bg-white/5 hover:text-white transition-colors"
                >
                  <LogOut className="w-3 h-3" />
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/sign-in"
                className="hidden md:inline-flex items-center px-4 py-2 rounded-lg bg-verdikt-blue text-white text-sm font-semibold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20"
              >
                Get Started
              </Link>
            )}
            {/* MobileNav is imported separately */}
          </div>
        </div>
      </div>
    </nav>
  )
}