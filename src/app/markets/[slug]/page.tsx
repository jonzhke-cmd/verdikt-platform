import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Clock, DollarSign, ArrowLeft, BarChart2 } from 'lucide-react'
import { markets, getCategoryColor } from '@/app/data/markets'
import { PriceChart } from './PriceChart'
import { TradePanel } from './TradePanel'
import { MarketCard } from '@/components/MarketCard'

export async function generateStaticParams() {
  return markets.map(m => ({ slug: m.slug }))
}

interface PageProps {
  params: Promise<{ slug: string }>
}

// Mock order book
function generateOrderBook(yesPrice: number) {
  const bids = []
  const asks = []
  for (let i = 0; i < 5; i++) {
    bids.push({
      price: yesPrice - 1 - i,
      size: Math.round(50 + Math.random() * 200),
    })
    asks.push({
      price: yesPrice + 1 + i,
      size: Math.round(50 + Math.random() * 200),
    })
  }
  return { bids, asks }
}

export default async function MarketDetailPage({ params }: PageProps) {
  const { slug } = await params
  const market = markets.find(m => m.slug === slug)

  if (!market) {
    notFound()
  }

  const relatedMarkets = markets
    .filter(m => m.slug !== market.slug)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)

  const { bids, asks } = generateOrderBook(market.yesPrice)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <Link
        href="/markets"
        className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Markets
      </Link>

      {/* Title + Meta */}
      <div className="flex flex-col gap-3 mb-8">
        <div className="flex items-center gap-3 flex-wrap">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getCategoryColor(market.category)}`}>
            {market.category}
          </span>
          <span className="flex items-center gap-1.5 text-sm text-gray-400">
            <Clock className="w-4 h-4" />
            Closes {market.closes}
          </span>
          <span className="flex items-center gap-1.5 text-sm text-gray-400">
            <DollarSign className="w-4 h-4" />
            {market.volume} volume
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
          {market.title}
        </h1>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Chart + Order Book + Description */}
        <div className="lg:col-span-2 space-y-6">
          {/* Price Display */}
          <div className="bg-verdikt-card border border-verdikt-border rounded-xl p-6">
            <div className="flex items-center gap-6 mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-verdikt-yes">{market.yesPrice}¢</div>
                <div className="text-sm text-gray-400 mt-1">YES</div>
              </div>
              <div className="flex-1 h-4 rounded-full bg-verdikt-no/30 overflow-hidden relative">
                <div
                  className="h-full rounded-full bg-verdikt-yes"
                  style={{ width: `${market.yesPrice}%` }}
                />
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-verdikt-no">{market.noPrice}¢</div>
                <div className="text-sm text-gray-400 mt-1">NO</div>
              </div>
            </div>

            {/* Chart */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BarChart2 className="w-4 h-4 text-gray-400" />
                <h2 className="text-sm font-semibold text-white">14-Day Price History</h2>
              </div>
              <PriceChart data={market.priceHistory} />
            </div>
          </div>

          {/* Order Book */}
          <div className="bg-verdikt-card border border-verdikt-border rounded-xl p-6">
            <h2 className="font-bold text-white mb-4">Order Book</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Bids (YES buyers) */}
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-2 pb-1 border-b border-verdikt-border">
                  <span>Bid (YES)</span>
                  <span>Size</span>
                </div>
                {bids.map((b, i) => (
                  <div key={i} className="flex justify-between text-sm py-1 relative">
                    <div
                      className="absolute inset-0 bg-verdikt-yes/5 rounded"
                      style={{ width: `${(b.size / 250) * 100}%` }}
                    />
                    <span className="relative text-verdikt-yes font-mono">{b.price}¢</span>
                    <span className="relative text-gray-400 font-mono">{b.size}</span>
                  </div>
                ))}
              </div>

              {/* Asks (NO buyers) */}
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-2 pb-1 border-b border-verdikt-border">
                  <span>Ask (NO)</span>
                  <span>Size</span>
                </div>
                {asks.map((a, i) => (
                  <div key={i} className="flex justify-between text-sm py-1 relative">
                    <div
                      className="absolute inset-0 bg-verdikt-no/5 rounded"
                      style={{ width: `${(a.size / 250) * 100}%` }}
                    />
                    <span className="relative text-verdikt-no font-mono">{a.price}¢</span>
                    <span className="relative text-gray-400 font-mono">{a.size}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Market Description */}
          <div className="bg-verdikt-card border border-verdikt-border rounded-xl p-6">
            <h2 className="font-bold text-white mb-3">About This Market</h2>
            <p className="text-gray-400 leading-relaxed text-sm">
              {market.description}
            </p>
          </div>
        </div>

        {/* Right: Trade Panel */}
        <div className="lg:col-span-1">
          <TradePanel
            yesPrice={market.yesPrice}
            noPrice={market.noPrice}
            title={market.title}
          />
        </div>
      </div>

      {/* Related Markets */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-white mb-6">Related Markets</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {relatedMarkets.map(m => (
            <MarketCard key={m.id} market={m} />
          ))}
        </div>
      </div>
    </div>
  )
}
