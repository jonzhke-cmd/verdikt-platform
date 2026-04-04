import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Verdikt | Prediction Markets',
  description: 'Trade on real-world event outcomes. Make your call on politics, finance, sports and more.',
}

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="bg-verdikt-bg text-white min-h-screen flex flex-col">
        {/* Navigation */}
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
                <Link
                  href="/sign-in"
                  className="text-sm text-gray-300 hover:text-white transition-colors font-medium"
                >
                  Sign In
                </Link>
              </div>

              {/* CTA */}
              <div className="flex items-center gap-4">
                <Link
                  href="/sign-in"
                  className="hidden md:inline-flex items-center px-4 py-2 rounded-lg bg-verdikt-blue text-white text-sm font-semibold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20"
                >
                  Get Started
                </Link>
                {/* Mobile hamburger placeholder */}
                <button className="md:hidden text-gray-300 hover:text-white p-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-verdikt-border bg-verdikt-card mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand */}
              <div className="md:col-span-2">
                <VerdiktLogo />
                <p className="mt-3 text-sm text-gray-400 max-w-xs">
                  Make your call. Back it with real conviction.
                </p>
                <p className="mt-4 text-xs text-gray-500 leading-relaxed">
                  Not financial advice. For entertainment only. All markets are simulated for demonstration purposes.
                </p>
              </div>

              {/* Markets */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-3">Markets</h3>
                <ul className="space-y-2">
                  <li><Link href="/markets?cat=Finance" className="text-sm text-gray-400 hover:text-white transition-colors">Finance</Link></li>
                  <li><Link href="/markets?cat=Politics" className="text-sm text-gray-400 hover:text-white transition-colors">Politics</Link></li>
                  <li><Link href="/markets?cat=Sports" className="text-sm text-gray-400 hover:text-white transition-colors">Sports</Link></li>
                  <li><Link href="/markets?cat=Tech" className="text-sm text-gray-400 hover:text-white transition-colors">Tech</Link></li>
                  <li><Link href="/markets?cat=Science" className="text-sm text-gray-400 hover:text-white transition-colors">Science</Link></li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-3">Company</h3>
                <ul className="space-y-2">
                  <li><Link href="/how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">How it Works</Link></li>
                  <li><Link href="/portfolio" className="text-sm text-gray-400 hover:text-white transition-colors">Portfolio</Link></li>
                  <li><Link href="/sign-in" className="text-sm text-gray-400 hover:text-white transition-colors">Sign In</Link></li>
                  <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                  <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-verdikt-border flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs text-gray-500">
                © 2026 Verdikt. All rights reserved.
              </p>
              <p className="text-xs text-gray-600">
                ⚠️ Not financial advice. For entertainment only.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
