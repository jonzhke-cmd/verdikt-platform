'use client'

import { useState } from 'react'
import { AlertCircle, CheckCircle } from 'lucide-react'

interface TradePanelProps {
  yesPrice: number
  noPrice: number
  title: string
}

export function TradePanel({ yesPrice, noPrice, title }: TradePanelProps) {
  const [side, setSide] = useState<'YES' | 'NO'>('YES')
  const [amount, setAmount] = useState('')
  const [placed, setPlaced] = useState(false)

  const price = side === 'YES' ? yesPrice : noPrice
  const estimatedShares = amount ? (parseFloat(amount) / (price / 100)).toFixed(2) : '0'
  const potentialProfit = amount
    ? ((parseFloat(estimatedShares) * 1.0) - parseFloat(amount)).toFixed(2)
    : '0.00'

  const handlePlace = () => {
    if (!amount || parseFloat(amount) <= 0) return
    setPlaced(true)
    setTimeout(() => {
      setPlaced(false)
      setAmount('')
    }, 2500)
  }

  return (
    <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-5 space-y-4 sticky top-20">
      <h3 className="font-bold text-white text-base">Place Order</h3>

      {/* YES / NO Toggle */}
      <div className="flex rounded-lg overflow-hidden border border-[#1F2937]">
        <button
          onClick={() => setSide('YES')}
          className={`flex-1 py-2.5 text-sm font-bold transition-colors ${
            side === 'YES'
              ? 'bg-verdikt-yes text-white'
              : 'bg-verdikt-card text-gray-400 hover:text-white'
          }`}
        >
          YES {yesPrice}¢
        </button>
        <button
          onClick={() => setSide('NO')}
          className={`flex-1 py-2.5 text-sm font-bold transition-colors ${
            side === 'NO'
              ? 'bg-verdikt-no text-white'
              : 'bg-verdikt-card text-gray-400 hover:text-white'
          }`}
        >
          NO {noPrice}¢
        </button>
      </div>

      {/* Amount Input */}
      <div>
        <label className="block text-xs text-gray-400 mb-1.5">Amount ($)</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
          <input
            type="number"
            min="0"
            step="1"
            placeholder="0.00"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="w-full pl-7 pr-4 py-2.5 bg-[#0A0F1E] border border-[#1F2937] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-verdikt-blue transition-colors"
          />
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-[#0A0F1E] rounded-lg p-3 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Price per share</span>
          <span className="text-white font-medium">{price}¢</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Estimated shares</span>
          <span className="text-white font-medium">{estimatedShares}</span>
        </div>
        <div className="flex justify-between border-t border-[#1F2937] pt-2">
          <span className="text-gray-400">Potential profit</span>
          <span className={`font-bold ${parseFloat(potentialProfit) >= 0 ? 'text-verdikt-yes' : 'text-verdikt-no'}`}>
            +${potentialProfit}
          </span>
        </div>
      </div>

      {/* Place Order Button */}
      {placed ? (
        <div className="flex items-center justify-center gap-2 py-3 rounded-lg bg-green-500/20 border border-green-500/30 text-verdikt-yes font-semibold text-sm">
          <CheckCircle className="w-4 h-4" />
          Order Placed! (Demo)
        </div>
      ) : (
        <button
          onClick={handlePlace}
          className="w-full py-3 rounded-lg bg-verdikt-blue text-white font-bold text-sm hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!amount || parseFloat(amount) <= 0}
        >
          {amount && parseFloat(amount) > 0
            ? `Buy ${side} — $${amount}`
            : 'Enter Amount to Trade'}
        </button>
      )}

      {/* Disclaimer */}
      <div className="flex gap-2 p-3 bg-yellow-500/5 border border-yellow-500/10 rounded-lg">
        <AlertCircle className="w-4 h-4 text-yellow-500/70 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-gray-500 leading-relaxed">
          This is a simulated market for demonstration purposes. No real money is involved.
        </p>
      </div>
    </div>
  )
}
