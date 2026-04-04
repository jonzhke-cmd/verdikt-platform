import Link from 'next/link'
import { ArrowRight, BarChart2, Zap, Trophy, Clock, Search, TrendingUp } from 'lucide-react'
import { markets } from './data/markets'
import { MarketCard } from '@/components/MarketCard'

const featuredMarkets = markets.filter(m => m.featured).slice(0, 4)
const trendingMarkets = markets.filter(m => m.trending).slice(0, 6)

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-mesh">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        {/* Glow effects */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              Live Markets — Real Conviction
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight mb-6">
              The World Is Uncertain.{' '}
              <span className="text-verdikt-blue">Your Edge Isn&apos;t.</span>
            </h1>

            {/* Subline */}
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Trade YES or NO on real-world events. Verdikt is where conviction meets opportunity — in politics, finance, sports, and beyond.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/markets"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-verdikt-blue text-white font-bold text-lg hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-0.5"
              >
                Browse Markets
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-verdikt-border text-white font-bold text-lg hover:border-gray-400 hover:bg-white/5 transition-all"
              >
                How It Works
              </Link>
            </div>

            {/* Social proof */}
            <p className="mt-8 text-sm text-gray-500">
              Join thousands of traders making their call every day
            </p>
          </div>
        </div>
      </section>

      {/* Live Stats Bar */}
      <section className="border-y border-verdikt-border bg-verdikt-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">12</div>
              <div className="text-sm text-gray-400 mt-1">Active Markets</div>
            </div>
            <div className="text-center border-x border-verdikt-border">
              <div className="text-2xl sm:text-3xl font-bold text-white">$45M+</div>
              <div className="text-sm text-gray-400 mt-1">Volume Traded</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">24/7</div>
              <div className="text-sm text-gray-400 mt-1">Trading</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Markets */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Featured Markets</h2>
            <p className="text-gray-400 mt-1">Top markets by volume and activity</p>
          </div>
          <Link
            href="/markets"
            className="flex items-center gap-2 text-sm text-verdikt-blue hover:text-blue-400 transition-colors font-medium"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredMarkets.map(market => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-verdikt-card border-y border-verdikt-border py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-white">How It Works</h2>
            <p className="text-gray-400 mt-2">Three simple steps to start trading</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative text-center p-6">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-verdikt-blue" />
              </div>
              <div className="absolute top-8 left-0 w-8 h-8 rounded-full bg-verdikt-blue text-white text-sm font-bold flex items-center justify-center -translate-x-1/2 -translate-y-1/2 hidden md:flex">
                1
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Browse Events</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Find a market on politics, finance, sports or tech. New markets added daily across every major category.
              </p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center absolute left-1/3 top-1/2">
              <ArrowRight className="w-6 h-6 text-gray-600" />
            </div>

            {/* Step 2 */}
            <div className="relative text-center p-6">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-4">
                <BarChart2 className="w-6 h-6 text-verdikt-yes" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Make Your Call</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Buy YES or NO contracts at the current market price. Prices reflect real-time crowd probability — 67¢ means 67% chance.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative text-center p-6">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Collect Your Winnings</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                If you&apos;re right, your contracts resolve at $1.00 each. If you bought YES at 67¢ and the event happens — you profit 33¢ per share.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-verdikt-border text-white font-semibold hover:border-gray-400 hover:bg-white/5 transition-all"
            >
              Learn More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Markets */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-orange-400" />
            <div>
              <h2 className="text-2xl font-bold text-white">Trending Now</h2>
              <p className="text-gray-400 text-sm mt-0.5">Most active markets today</p>
            </div>
          </div>
          <Link
            href="/markets"
            className="flex items-center gap-2 text-sm text-verdikt-blue hover:text-blue-400 transition-colors font-medium"
          >
            See All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingMarkets.map(market => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-blue-900/80 border border-blue-500/20 p-10 sm:p-16 text-center">
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-blue-500/20 rounded-full blur-3xl" />

            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to make your call?
              </h2>
              <p className="text-blue-200 text-lg mb-8 max-w-lg mx-auto">
                Join Verdikt and start trading on the events that matter to you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/sign-in"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-blue-900 font-bold text-lg hover:bg-blue-50 transition-all"
                >
                  Sign Up Free <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/markets"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-blue-400/40 text-white font-bold text-lg hover:border-blue-400 hover:bg-blue-500/10 transition-all"
                >
                  Browse Markets
                </Link>
              </div>
              <p className="mt-6 text-xs text-blue-300/60">
                Not financial advice. For entertainment only.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
