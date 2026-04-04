import Link from 'next/link'
import { TrendingUp, Clock, DollarSign } from 'lucide-react'
import { Market, getCategoryColor } from '@/app/data/markets'

interface MarketCardProps {
  market: Market
  size?: 'normal' | 'small'
}

export function MarketCard({ market, size = 'normal' }: MarketCardProps) {
  const isSmall = size === 'small'

  return (
    <div className="market-card bg-verdikt-card rounded-xl p-4 flex flex-col gap-3 h-full">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(market.category)}`}>
          {market.category}
        </span>
        {market.trending && (
          <span className="flex items-center gap-1 text-xs text-orange-400">
            <TrendingUp className="w-3 h-3" />
            Trending
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className={`font-semibold text-white leading-snug ${isSmall ? 'text-sm' : 'text-base'}`}>
        {market.title}
      </h3>

      {/* Price Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="text-verdikt-yes font-semibold">YES {market.yesPrice}¢</span>
          <span className="text-verdikt-no font-semibold">NO {market.noPrice}¢</span>
        </div>
        <div className="h-2 rounded-full bg-verdikt-no/30 overflow-hidden">
          <div
            className="h-full rounded-full bg-verdikt-yes price-bar-inner"
            style={{ width: `${market.yesPrice}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>{market.yesPrice}% chance</span>
          <span>{market.noPrice}%</span>
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-3 text-xs text-gray-400 mt-auto pt-1 border-t border-verdikt-border">
        <span className="flex items-center gap-1">
          <DollarSign className="w-3 h-3" />
          {market.volume}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {market.closes}
        </span>
      </div>

      {/* Trade Button */}
      <Link
        href={`/markets/${market.slug}`}
        className="block text-center px-4 py-2 rounded-lg bg-verdikt-blue text-white text-sm font-semibold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20"
      >
        Trade
      </Link>
    </div>
  )
}
