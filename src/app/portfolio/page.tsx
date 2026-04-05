'use client'

import { TrendingUp, TrendingDown, DollarSign, Plus, Clock, BarChart2, LogOut, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface User {
  id: string
  email: string
  name: string
  balance: number
  createdAt: string
}

export default function PortfolioPage() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  
  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('verdikt_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        localStorage.removeItem('verdikt_user')
      }
    }
    setIsLoading(false)
  }, [])
  
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/sign-in')
    }
  }, [user, isLoading, router])
  
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-verdikt-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading portfolio...</p>
        </div>
      </div>
    )
  }
  
  if (!user) {
    return null
  }
  
  const mockPositions = [
    {
      id: 1,
      marketTitle: 'Will the Fed cut rates in June 2026?',
      slug: 'fed-rate-cut-june-2026',
      side: 'YES' as const,
      shares: 150,
      avgPrice: 58,
      currentPrice: 67,
      pnl: 13.50,
    },
    {
      id: 2,
      marketTitle: 'Will Bitcoin hit $120K by July 2026?',
      slug: 'bitcoin-120k-july-2026',
      side: 'NO' as const,
      shares: 80,
      avgPrice: 60,
      currentPrice: 56,
      pnl: 3.20,
    },
    {
      id: 3,
      marketTitle: 'Will Trump roll back >50% of tariffs by end of 2026?',
      slug: 'trump-tariffs-rollback-2026',
      side: 'NO' as const,
      shares: 200,
      avgPrice: 35,
      currentPrice: 69,
      pnl: 68.00,
    },
    {
      id: 4,
      marketTitle: 'Will Nvidia stock hit $200 by Q3 2026?',
      slug: 'nvidia-200-q3-2026',
      side: 'YES' as const,
      shares: 100,
      avgPrice: 48,
      currentPrice: 52,
      pnl: 4.00,
    },
  ]
  
  const mockActivity = [
    { id: 1, action: 'Bought YES', market: 'Fed Rate Cut June 2026', amount: '$87.00', shares: 150, price: '58¢', date: 'Apr 1, 2026' },
    { id: 2, action: 'Bought NO', market: 'Bitcoin $120K July 2026', amount: '$48.00', shares: 80, price: '60¢', date: 'Mar 29, 2026' },
    { id: 3, action: 'Sold YES', market: 'US Recession 2026', amount: '$65.00', shares: 200, price: '33¢', date: 'Mar 25, 2026' },
    { id: 4, action: 'Bought NO', market: 'Trump Tariffs Rollback', amount: '$70.00', shares: 200, price: '35¢', date: 'Mar 20, 2026' },
    { id: 5, action: 'Bought YES', market: 'Nvidia $200 Q3 2026', amount: '$48.00', shares: 100, price: '48¢', date: 'Mar 15, 2026' },
  ]
  
  const totalPnl = mockPositions.reduce((sum, p) => sum + p.pnl, 0)
  
  const handleLogout = () => {
    localStorage.removeItem('verdikt_user')
    router.push('/')
  }
  
  const handleDeposit = () => {
    const amount = parseFloat(prompt('Enter deposit amount ($):') || '0')
    if (amount > 0) {
      const updatedUser = { ...user, balance: user.balance + amount }
      setUser(updatedUser)
      localStorage.setItem('verdikt_user', JSON.stringify(updatedUser))
      alert(`Successfully deposited $${amount.toFixed(2)}`)
    }
  }
  
  const handleWithdraw = () => {
    const amount = parseFloat(prompt('Enter withdrawal amount ($):') || '0')
    if (amount > 0 && amount <= user.balance) {
      const updatedUser = { ...user, balance: user.balance - amount }
      setUser(updatedUser)
      localStorage.setItem('verdikt_user', JSON.stringify(updatedUser))
      alert(`Successfully withdrew $${amount.toFixed(2)}`)
    } else if (amount > user.balance) {
      alert('Insufficient balance')
    }
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Portfolio</h1>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-2 text-gray-400">
              <User className="w-4 h-4" />
              <span className="text-sm">{user.name}</span>
            </div>
            <span className="text-xs text-gray-500">•</span>
            <span className="text-sm text-gray-400">{user.email}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <button
              onClick={handleDeposit}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-verdikt-blue text-white font-semibold text-sm hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20"
            >
              <Plus className="w-4 h-4" />
              Deposit
            </button>
            <button
              onClick={handleWithdraw}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-verdikt-border text-gray-400 font-semibold text-sm hover:bg-white/5 hover:text-white transition-colors"
            >
              Withdraw
            </button>
          </div>
          
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-verdikt-border text-gray-400 font-semibold text-sm hover:bg-white/5 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-verdikt-card border border-verdikt-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">Balance</span>
          </div>
          <div className="text-3xl font-bold text-white">
            ${user.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-gray-500 mt-1">Available to trade</p>
        </div>

        <div className="bg-verdikt-card border border-verdikt-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-verdikt-yes" />
            <span className="text-sm text-gray-400">Total P&L</span>
          </div>
          <div className="text-3xl font-bold text-verdikt-yes">
            +${totalPnl.toFixed(2)}
          </div>
          <p className="text-xs text-gray-500 mt-1">Unrealized gains</p>
        </div>

        <div className="bg-verdikt-card border border-verdikt-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <BarChart2 className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-400">Open Positions</span>
          </div>
          <div className="text-3xl font-bold text-white">{mockPositions.length}</div>
          <p className="text-xs text-gray-500 mt-1">Across {mockPositions.length} markets</p>
        </div>
      </div>

      <div className="bg-verdikt-card border border-verdikt-border rounded-xl mb-6">
        <div className="p-5 border-b border-verdikt-border">
          <h2 className="font-bold text-white">Open Positions</h2>
        </div>

        <div className="divide-y divide-verdikt-border">
          <div className="hidden sm:grid grid-cols-6 px-5 py-2.5 text-xs text-gray-500 font-medium">
            <div className="col-span-2">Market</div>
            <div className="text-center">Side</div>
            <div className="text-center">Shares</div>
            <div className="text-center">Avg / Current</div>
            <div className="text-right">Unrealized P&L</div>
          </div>

          {mockPositions.map(pos => (
            <div key={pos.id} className="grid grid-cols-1 sm:grid-cols-6 px-5 py-4 gap-2 sm:gap-0 items-center">
              <div className="sm:col-span-2">
                <Link
                  href={`/markets/${pos.slug}`}
                  className="text-sm font-medium text-white hover:text-verdikt-blue transition-colors line-clamp-2"
                >
                  {pos.marketTitle}
                </Link>
              </div>

              <div className="sm:text-center">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                  pos.side === 'YES'
                    ? 'bg-verdikt-yes/20 text-verdikt-yes'
                    : 'bg-verdikt-no/20 text-verdikt-no'
                }`}>
                  {pos.side}
                </span>
              </div>

              <div className="sm:text-center text-sm text-white font-mono">
                <span className="sm:hidden text-gray-400 text-xs">Shares: </span>
                {pos.shares}
              </div>

              <div className="sm:text-center text-sm font-mono">
                <span className="sm:hidden text-gray-400 text-xs">Price: </span>
                <span className="text-gray-400">{pos.avgPrice}¢</span>
                <span className="text-gray-600 mx-1">/</span>
                <span className="text-white">{pos.currentPrice}¢</span>
              </div>

              <div className="sm:text-right">
                <span className={`text-sm font-bold ${pos.pnl >= 0 ? 'text-verdikt-yes' : 'text-verdikt-no'}`}>
                  {pos.pnl >= 0 ? '+' : ''}${pos.pnl.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-verdikt-card border border-verdikt-border rounded-xl">
        <div className="p-5 border-b border-verdikt-border">
          <h2 className="font-bold text-white">Recent Activity</h2>
        </div>

        <div className="divide-y divide-verdikt-border">
          <div className="hidden sm:grid grid-cols-5 px-5 py-2.5 text-xs text-gray-500 font-medium">
            <div>Action</div>
            <div className="col-span-2">Market</div>
            <div className="text-center">Amount</div>
            <div className="text-right">Date</div>
          </div>

          {mockActivity.map(activity => (
            <div key={activity.id} className="grid grid-cols-1 sm:grid-cols-5 px-5 py-4 gap-1 sm:gap-0 items-center">
              <div>
                <span className={`inline-flex items-center gap-1 text-xs font-semibold ${
                  activity.action.includes('Bought') ? 'text-verdikt-yes' : 'text-verdikt-no'
                }`}>
                  {activity.action.includes('Bought') ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {activity.action}
                </span>
              </div>

              <div className="sm:col-span-2 text-sm text-white">
                {activity.market}
                <span className="ml-2 text-xs text-gray-500">{activity.shares} shares @ {activity.price}</span>
              </div>

              <div className="sm:text-center text-sm font-mono text-white">
                {activity.amount}
              </div>

              <div className="sm:text-right text-xs text-gray-400 flex items-center sm:justify-end gap-1">
                <Clock className="w-3 h-3" />
                {activity.date}
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-600 text-center mt-8">
        Portfolio data is stored locally in your browser. Sign in on another device to see your account.
      </p>
    </div>
  )
}