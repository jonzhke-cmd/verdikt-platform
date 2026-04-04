import Link from 'next/link'
import { ArrowRight, Search, BarChart2, Trophy, CheckCircle, ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'Is this real money?',
    a: 'No. Verdikt is a demonstration platform using simulated markets and virtual currency. No real money changes hands, and this is for educational and entertainment purposes only.',
  },
  {
    q: 'How are market prices determined?',
    a: 'Prices are set by the crowd — buyers and sellers trading contracts. If more people think YES, the YES price rises. The price reflects the market\'s collective probability estimate for an event.',
  },
  {
    q: 'How do markets resolve?',
    a: 'Each market has clear resolution criteria based on verifiable, public information. When the event occurs (or doesn\'t), the market resolves to $1.00 for the winning side and $0.00 for the losing side.',
  },
  {
    q: 'Can I sell my position before resolution?',
    a: 'Yes. You can exit your position at any time before market close by selling your contracts at the current market price. If the probability has moved in your favor, you can lock in a profit before resolution.',
  },
  {
    q: 'What happens if a market is voided?',
    a: 'If a market cannot be resolved due to ambiguous outcomes or unforeseen circumstances, all contracts are cancelled and traders receive their original investment back.',
  },
]

export default function HowItWorksPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">How It Works</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Prediction markets are one of the most powerful tools for aggregating information and forecasting future events. Here&apos;s everything you need to know.
        </p>
      </div>

      {/* What are prediction markets? */}
      <section className="mb-14">
        <div className="bg-verdikt-card border border-verdikt-border rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">What are Prediction Markets?</h2>
          <div className="space-y-4 text-gray-400 leading-relaxed">
            <p>
              A prediction market is a financial market where participants buy and sell contracts whose value is tied to the outcome of future events. Each contract is worth $1.00 if the event occurs and $0.00 if it doesn&apos;t.
            </p>
            <p>
              Unlike traditional betting, prediction markets allow you to both buy AND sell at any time, create nuanced positions, and exit before resolution. The prices in these markets are remarkable accurate predictors of future events — often outperforming expert forecasts and polls.
            </p>
            <p>
              Markets exist for political outcomes, economic indicators, sports results, technology milestones, and more. Anywhere there&apos;s uncertainty, a prediction market can add signal.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-white mb-6">Trading in 3 Steps</h2>
        <div className="space-y-4">
          {/* Step 1 */}
          <div className="flex gap-5 bg-verdikt-card border border-verdikt-border rounded-xl p-6">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-verdikt-blue flex items-center justify-center text-white font-bold">
                1
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Search className="w-5 h-5 text-verdikt-blue" />
                <h3 className="text-lg font-bold text-white">Browse Events</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Find a market on a topic you know. Verdikt has markets on Fed rate decisions, Bitcoin price targets, sports outcomes, and tech milestones. Use filters to narrow by category, or search for a specific event.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-5 bg-verdikt-card border border-verdikt-border rounded-xl p-6">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-verdikt-yes flex items-center justify-center text-white font-bold">
                2
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BarChart2 className="w-5 h-5 text-verdikt-yes" />
                <h3 className="text-lg font-bold text-white">Make Your Call</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Decide if you think YES or NO is more likely. Buy YES if you think the event will happen, NO if you think it won&apos;t. The price you pay reflects the market&apos;s current probability — if YES costs 67¢, the crowd thinks there&apos;s a 67% chance it happens.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="bg-verdikt-yes/10 border border-verdikt-yes/20 rounded-lg p-3 text-center">
                  <div className="text-verdikt-yes font-bold text-lg">YES</div>
                  <div className="text-xs text-gray-400">Event happens → win $1.00/share</div>
                </div>
                <div className="bg-verdikt-no/10 border border-verdikt-no/20 rounded-lg p-3 text-center">
                  <div className="text-verdikt-no font-bold text-lg">NO</div>
                  <div className="text-xs text-gray-400">Event doesn&apos;t happen → win $1.00/share</div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-5 bg-verdikt-card border border-verdikt-border rounded-xl p-6">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold">
                3
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <h3 className="text-lg font-bold text-white">Collect Your Winnings</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                If you&apos;re right, your contracts resolve at $1.00 each. Your profit is the difference between what you paid and $1.00. You can also sell at any time before resolution — if the probability shifts in your favor, your contracts are now worth more than you paid.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How Pricing Works */}
      <section className="mb-14">
        <div className="bg-verdikt-card border border-verdikt-border rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">How Does Pricing Work?</h2>
          <div className="space-y-4 text-gray-400 leading-relaxed">
            <p>
              Every contract is worth exactly $1.00 if the event happens, $0.00 if it doesn&apos;t. The current price is therefore the market&apos;s implied probability.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
              <div className="bg-verdikt-bg rounded-lg p-4 border border-verdikt-border">
                <div className="text-white font-semibold mb-2">Example:</div>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Market</span>
                    <span className="text-white">Fed cuts rates</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">YES price</span>
                    <span className="text-verdikt-yes">67¢</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Implied probability</span>
                    <span className="text-white">67%</span>
                  </div>
                </div>
              </div>
              <div className="bg-verdikt-bg rounded-lg p-4 border border-verdikt-border">
                <div className="text-white font-semibold mb-2">If you buy YES at 67¢:</div>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Cost</span>
                    <span className="text-white">$67.00 (100 shares)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Win (event happens)</span>
                    <span className="text-verdikt-yes">+$33.00 profit</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Lose (doesn&apos;t happen)</span>
                    <span className="text-verdikt-no">-$67.00 loss</span>
                  </div>
                </div>
              </div>
            </div>

            <p>
              YES + NO prices always sum to 100¢ (or very close, accounting for the spread). If you buy YES at 67¢, you&apos;re implicitly saying the market has it wrong and the actual probability is higher than 67%.
            </p>
          </div>
        </div>
      </section>

      {/* Resolution */}
      <section className="mb-14">
        <div className="bg-verdikt-card border border-verdikt-border rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">How Do Markets Resolve?</h2>
          <div className="space-y-3 text-gray-400 leading-relaxed">
            <p>
              Each market has clear, objective resolution criteria written before trading begins. Resolution is based on publicly verifiable events — official announcements, government data, sports results, etc.
            </p>
            <div className="space-y-2 my-4">
              {[
                'Event occurs → YES contracts pay $1.00, NO contracts pay $0.00',
                'Event doesn\'t occur by deadline → NO contracts pay $1.00, YES pay $0.00',
                'Ambiguous outcome → market voided, all traders refunded',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-verdikt-yes flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-verdikt-card border border-verdikt-border rounded-xl p-5">
              <div className="flex items-start gap-3">
                <span className="text-verdikt-blue font-bold text-sm mt-0.5 flex-shrink-0">Q</span>
                <div>
                  <p className="font-semibold text-white text-sm mb-2">{faq.q}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="text-center bg-gradient-to-r from-blue-900/50 to-blue-800/30 border border-blue-500/20 rounded-xl p-10">
        <h2 className="text-2xl font-bold text-white mb-3">Ready to start trading?</h2>
        <p className="text-gray-400 mb-6">Browse markets and make your first call today.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/markets"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-verdikt-blue text-white font-semibold hover:bg-blue-500 transition-colors"
          >
            Browse Markets <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/sign-in"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-verdikt-border text-white font-semibold hover:border-gray-400 hover:bg-white/5 transition-all"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  )
}
