'use client'

import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { markets, Category } from '@/app/data/markets'
import { MarketCard } from '@/components/MarketCard'

const ALL_CATEGORIES: Category[] = ['Finance', 'Politics', 'Sports', 'Tech', 'Science', 'Entertainment']

export default function MarketsPage() {
  const [activeCategory, setActiveCategory] = useState<'All' | Category>('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredMarkets = useMemo(() => {
    return markets.filter(m => {
      const matchesCategory = activeCategory === 'All' || m.category === activeCategory
      const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Markets</h1>
        <p className="text-gray-400 mt-2">Browse and trade on upcoming events across all categories</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search markets..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-verdikt-card border border-verdikt-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-verdikt-blue transition-colors"
          />
        </div>

        {/* Category tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 flex-shrink-0">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeCategory === 'All'
                ? 'bg-verdikt-blue text-white'
                : 'text-gray-400 hover:text-white hover:bg-verdikt-card border border-verdikt-border'
            }`}
          >
            All
          </button>
          {ALL_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-verdikt-blue text-white'
                  : 'text-gray-400 hover:text-white hover:bg-verdikt-card border border-verdikt-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-400">
          {filteredMarkets.length} market{filteredMarkets.length !== 1 ? 's' : ''} found
        </p>
        <div className="flex items-center gap-1 text-sm text-gray-400">
          <SlidersHorizontal className="w-4 h-4" />
          <span>Sort: Volume</span>
        </div>
      </div>

      {/* Markets Grid */}
      {filteredMarkets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredMarkets.map(market => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No markets found matching your criteria.</p>
          <button
            onClick={() => { setSearchQuery(''); setActiveCategory('All') }}
            className="mt-4 text-verdikt-blue hover:text-blue-400 text-sm"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}
