export type Category = 'Finance' | 'Politics' | 'Sports' | 'Tech' | 'Science' | 'Entertainment';

export type Market = {
  id: string;
  slug: string;
  title: string;
  category: Category;
  yesPrice: number;   // 0-100 cents
  noPrice: number;    // always 100 - yesPrice
  volume: string;     // e.g. "$1.2M"
  closes: string;     // e.g. "Jun 30, 2026"
  description: string;
  trending: boolean;
  featured: boolean;
  priceHistory: { date: string; yes: number }[]; // last 14 days
};

function generatePriceHistory(basePrice: number): { date: string; yes: number }[] {
  const history: { date: string; yes: number }[] = [];
  const today = new Date('2026-04-04');
  let price = basePrice + (Math.random() * 10 - 5);
  price = Math.max(5, Math.min(95, price));

  for (let i = 13; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    // Random walk ±3 per day, clamped
    const change = (Math.random() * 6 - 3);
    price = Math.max(5, Math.min(95, price + change));
    history.push({ date: dateStr, yes: Math.round(price) });
  }

  // Make sure last value is close to the actual current price
  const last = history[history.length - 1];
  last.yes = basePrice;

  return history;
}

export const markets: Market[] = [
  {
    id: '1',
    slug: 'fed-rate-cut-june-2026',
    title: 'Will the Fed cut rates in June 2026?',
    category: 'Finance',
    yesPrice: 67,
    noPrice: 33,
    volume: '$4.2M',
    closes: 'Jun 18, 2026',
    description:
      'This market resolves YES if the Federal Reserve announces a federal funds rate cut at its June 2026 FOMC meeting. It resolves NO if the Fed holds or raises rates. Resolution based on official FOMC statement.',
    trending: true,
    featured: true,
    priceHistory: [
      { date: '2026-03-22', yes: 58 },
      { date: '2026-03-23', yes: 60 },
      { date: '2026-03-24', yes: 59 },
      { date: '2026-03-25', yes: 62 },
      { date: '2026-03-26', yes: 61 },
      { date: '2026-03-27', yes: 63 },
      { date: '2026-03-28', yes: 65 },
      { date: '2026-03-29', yes: 63 },
      { date: '2026-03-30', yes: 64 },
      { date: '2026-03-31', yes: 66 },
      { date: '2026-04-01', yes: 65 },
      { date: '2026-04-02', yes: 68 },
      { date: '2026-04-03', yes: 66 },
      { date: '2026-04-04', yes: 67 },
    ],
  },
  {
    id: '2',
    slug: 'bitcoin-120k-july-2026',
    title: 'Will Bitcoin hit $120K by July 2026?',
    category: 'Finance',
    yesPrice: 44,
    noPrice: 56,
    volume: '$8.7M',
    closes: 'Jul 31, 2026',
    description:
      'Resolves YES if the Bitcoin spot price on any major exchange (Coinbase, Binance, Kraken) reaches $120,000 USD at any point before market close on July 31, 2026. Resolves NO otherwise.',
    trending: true,
    featured: true,
    priceHistory: [
      { date: '2026-03-22', yes: 48 },
      { date: '2026-03-23', yes: 50 },
      { date: '2026-03-24', yes: 47 },
      { date: '2026-03-25', yes: 45 },
      { date: '2026-03-26', yes: 46 },
      { date: '2026-03-27', yes: 44 },
      { date: '2026-03-28', yes: 43 },
      { date: '2026-03-29', yes: 45 },
      { date: '2026-03-30', yes: 42 },
      { date: '2026-03-31', yes: 43 },
      { date: '2026-04-01', yes: 41 },
      { date: '2026-04-02', yes: 43 },
      { date: '2026-04-03', yes: 45 },
      { date: '2026-04-04', yes: 44 },
    ],
  },
  {
    id: '3',
    slug: 'australia-ashes-2026',
    title: 'Will Australia win the 2026 Ashes series?',
    category: 'Sports',
    yesPrice: 61,
    noPrice: 39,
    volume: '$890K',
    closes: 'Sep 15, 2026',
    description:
      'Resolves YES if Australia wins the 2026 Ashes cricket series against England. A win is defined as having more Test victories than England at series completion. Drawn series resolves NO.',
    trending: true,
    featured: false,
    priceHistory: [
      { date: '2026-03-22', yes: 55 },
      { date: '2026-03-23', yes: 57 },
      { date: '2026-03-24', yes: 58 },
      { date: '2026-03-25', yes: 56 },
      { date: '2026-03-26', yes: 59 },
      { date: '2026-03-27', yes: 58 },
      { date: '2026-03-28', yes: 60 },
      { date: '2026-03-29', yes: 59 },
      { date: '2026-03-30', yes: 61 },
      { date: '2026-03-31', yes: 60 },
      { date: '2026-04-01', yes: 62 },
      { date: '2026-04-02', yes: 60 },
      { date: '2026-04-03', yes: 62 },
      { date: '2026-04-04', yes: 61 },
    ],
  },
  {
    id: '4',
    slug: 'apple-ar-glasses-2026',
    title: 'Will Apple release AR glasses in 2026?',
    category: 'Tech',
    yesPrice: 29,
    noPrice: 71,
    volume: '$2.1M',
    closes: 'Dec 31, 2026',
    description:
      'Resolves YES if Apple officially announces and ships a standalone AR glasses product (distinct from Vision Pro headset) to consumers before December 31, 2026. A press release or product listing with shipping date qualifies.',
    trending: false,
    featured: false,
    priceHistory: [
      { date: '2026-03-22', yes: 32 },
      { date: '2026-03-23', yes: 31 },
      { date: '2026-03-24', yes: 33 },
      { date: '2026-03-25', yes: 30 },
      { date: '2026-03-26', yes: 31 },
      { date: '2026-03-27', yes: 28 },
      { date: '2026-03-28', yes: 30 },
      { date: '2026-03-29', yes: 29 },
      { date: '2026-03-30', yes: 27 },
      { date: '2026-03-31', yes: 28 },
      { date: '2026-04-01', yes: 30 },
      { date: '2026-04-02', yes: 29 },
      { date: '2026-04-03', yes: 28 },
      { date: '2026-04-04', yes: 29 },
    ],
  },
  {
    id: '5',
    slug: 'singapore-gdp-3pct-2026',
    title: 'Will Singapore GDP grow >3% in 2026?',
    category: 'Finance',
    yesPrice: 71,
    noPrice: 29,
    volume: '$340K',
    closes: 'Dec 31, 2026',
    description:
      'Resolves YES if Singapore\'s official GDP growth rate for full-year 2026 exceeds 3.0% as reported by the Singapore Department of Statistics or Ministry of Trade and Industry.',
    trending: false,
    featured: false,
    priceHistory: [
      { date: '2026-03-22', yes: 68 },
      { date: '2026-03-23', yes: 69 },
      { date: '2026-03-24', yes: 70 },
      { date: '2026-03-25', yes: 69 },
      { date: '2026-03-26', yes: 71 },
      { date: '2026-03-27', yes: 70 },
      { date: '2026-03-28', yes: 72 },
      { date: '2026-03-29', yes: 71 },
      { date: '2026-03-30', yes: 73 },
      { date: '2026-03-31', yes: 72 },
      { date: '2026-04-01', yes: 70 },
      { date: '2026-04-02', yes: 71 },
      { date: '2026-04-03', yes: 72 },
      { date: '2026-04-04', yes: 71 },
    ],
  },
  {
    id: '6',
    slug: 'nvidia-200-q3-2026',
    title: 'Will Nvidia stock hit $200 by Q3 2026?',
    category: 'Finance',
    yesPrice: 52,
    noPrice: 48,
    volume: '$5.6M',
    closes: 'Sep 30, 2026',
    description:
      'Resolves YES if NVDA closes at or above $200 per share on any trading day before September 30, 2026. Price data sourced from NASDAQ official closing prices.',
    trending: true,
    featured: true,
    priceHistory: [
      { date: '2026-03-22', yes: 46 },
      { date: '2026-03-23', yes: 48 },
      { date: '2026-03-24', yes: 49 },
      { date: '2026-03-25', yes: 50 },
      { date: '2026-03-26', yes: 48 },
      { date: '2026-03-27', yes: 51 },
      { date: '2026-03-28', yes: 53 },
      { date: '2026-03-29', yes: 51 },
      { date: '2026-03-30', yes: 52 },
      { date: '2026-03-31', yes: 54 },
      { date: '2026-04-01', yes: 53 },
      { date: '2026-04-02', yes: 51 },
      { date: '2026-04-03', yes: 53 },
      { date: '2026-04-04', yes: 52 },
    ],
  },
  {
    id: '7',
    slug: 'us-recession-2026',
    title: 'Will there be a US recession in 2026?',
    category: 'Finance',
    yesPrice: 34,
    noPrice: 66,
    volume: '$11.2M',
    closes: 'Dec 31, 2026',
    description:
      'Resolves YES if the National Bureau of Economic Research (NBER) officially declares a US recession began in 2026 by January 31, 2027. A recession is defined as two consecutive quarters of negative GDP growth or NBER declaration.',
    trending: true,
    featured: true,
    priceHistory: [
      { date: '2026-03-22', yes: 28 },
      { date: '2026-03-23', yes: 29 },
      { date: '2026-03-24', yes: 31 },
      { date: '2026-03-25', yes: 30 },
      { date: '2026-03-26', yes: 32 },
      { date: '2026-03-27', yes: 33 },
      { date: '2026-03-28', yes: 31 },
      { date: '2026-03-29', yes: 33 },
      { date: '2026-03-30', yes: 35 },
      { date: '2026-03-31', yes: 34 },
      { date: '2026-04-01', yes: 36 },
      { date: '2026-04-02', yes: 35 },
      { date: '2026-04-03', yes: 33 },
      { date: '2026-04-04', yes: 34 },
    ],
  },
  {
    id: '8',
    slug: 'spacex-mars-2030',
    title: 'Will SpaceX land humans on Mars by 2030?',
    category: 'Science',
    yesPrice: 22,
    noPrice: 78,
    volume: '$1.8M',
    closes: 'Dec 31, 2030',
    description:
      'Resolves YES if SpaceX successfully lands at least one human on the Martian surface before December 31, 2030. Requires official confirmation from SpaceX and independent verification. Orbital missions do not count.',
    trending: false,
    featured: false,
    priceHistory: [
      { date: '2026-03-22', yes: 24 },
      { date: '2026-03-23', yes: 23 },
      { date: '2026-03-24', yes: 25 },
      { date: '2026-03-25', yes: 23 },
      { date: '2026-03-26', yes: 22 },
      { date: '2026-03-27', yes: 24 },
      { date: '2026-03-28', yes: 23 },
      { date: '2026-03-29', yes: 21 },
      { date: '2026-03-30', yes: 23 },
      { date: '2026-03-31', yes: 22 },
      { date: '2026-04-01', yes: 21 },
      { date: '2026-04-02', yes: 23 },
      { date: '2026-04-03', yes: 22 },
      { date: '2026-04-04', yes: 22 },
    ],
  },
  {
    id: '9',
    slug: 'taylor-swift-album-2026',
    title: 'Will Taylor Swift release a new album in 2026?',
    category: 'Entertainment',
    yesPrice: 81,
    noPrice: 19,
    volume: '$670K',
    closes: 'Dec 31, 2026',
    description:
      'Resolves YES if Taylor Swift releases a brand new studio album (not a re-recording or EP) with a global commercial release before December 31, 2026. Streaming and digital releases count.',
    trending: true,
    featured: false,
    priceHistory: [
      { date: '2026-03-22', yes: 75 },
      { date: '2026-03-23', yes: 77 },
      { date: '2026-03-24', yes: 76 },
      { date: '2026-03-25', yes: 78 },
      { date: '2026-03-26', yes: 79 },
      { date: '2026-03-27', yes: 78 },
      { date: '2026-03-28', yes: 80 },
      { date: '2026-03-29', yes: 79 },
      { date: '2026-03-30', yes: 81 },
      { date: '2026-03-31', yes: 80 },
      { date: '2026-04-01', yes: 82 },
      { date: '2026-04-02', yes: 81 },
      { date: '2026-04-03', yes: 80 },
      { date: '2026-04-04', yes: 81 },
    ],
  },
  {
    id: '10',
    slug: 'ai-bar-exam-top-scores',
    title: 'Will an AI score in the top 10% of bar exam takers by end of 2026?',
    category: 'Tech',
    yesPrice: 76,
    noPrice: 24,
    volume: '$920K',
    closes: 'Dec 31, 2026',
    description:
      'Resolves YES if any AI system achieves a bar exam score that would place it in the top 10% of human test-takers in any US state bar exam administered before December 31, 2026. Must be independently verified.',
    trending: false,
    featured: false,
    priceHistory: [
      { date: '2026-03-22', yes: 70 },
      { date: '2026-03-23', yes: 72 },
      { date: '2026-03-24', yes: 73 },
      { date: '2026-03-25', yes: 71 },
      { date: '2026-03-26', yes: 74 },
      { date: '2026-03-27', yes: 73 },
      { date: '2026-03-28', yes: 75 },
      { date: '2026-03-29', yes: 74 },
      { date: '2026-03-30', yes: 76 },
      { date: '2026-03-31', yes: 75 },
      { date: '2026-04-01', yes: 77 },
      { date: '2026-04-02', yes: 76 },
      { date: '2026-04-03', yes: 75 },
      { date: '2026-04-04', yes: 76 },
    ],
  },
  {
    id: '11',
    slug: 'trump-tariffs-rollback-2026',
    title: 'Will Trump roll back >50% of tariffs by end of 2026?',
    category: 'Politics',
    yesPrice: 31,
    noPrice: 69,
    volume: '$6.3M',
    closes: 'Dec 31, 2026',
    description:
      'Resolves YES if the Trump administration formally reduces, suspends, or revokes tariffs totaling more than 50% of tariff revenue collected in 2025 by December 31, 2026. Based on official Federal Register notices or executive orders.',
    trending: true,
    featured: true,
    priceHistory: [
      { date: '2026-03-22', yes: 28 },
      { date: '2026-03-23', yes: 27 },
      { date: '2026-03-24', yes: 29 },
      { date: '2026-03-25', yes: 30 },
      { date: '2026-03-26', yes: 29 },
      { date: '2026-03-27', yes: 31 },
      { date: '2026-03-28', yes: 30 },
      { date: '2026-03-29', yes: 32 },
      { date: '2026-03-30', yes: 31 },
      { date: '2026-03-31', yes: 30 },
      { date: '2026-04-01', yes: 32 },
      { date: '2026-04-02', yes: 31 },
      { date: '2026-04-03', yes: 30 },
      { date: '2026-04-04', yes: 31 },
    ],
  },
  {
    id: '12',
    slug: 'rba-rate-cut-august-2026',
    title: 'Will the RBA cut rates in August 2026?',
    category: 'Finance',
    yesPrice: 58,
    noPrice: 42,
    volume: '$780K',
    closes: 'Aug 5, 2026',
    description:
      'Resolves YES if the Reserve Bank of Australia announces a reduction in the cash rate target at its August 2026 board meeting. Resolves NO if rates are held steady or increased. Based on official RBA announcement.',
    trending: true,
    featured: false,
    priceHistory: [
      { date: '2026-03-22', yes: 52 },
      { date: '2026-03-23', yes: 54 },
      { date: '2026-03-24', yes: 53 },
      { date: '2026-03-25', yes: 55 },
      { date: '2026-03-26', yes: 54 },
      { date: '2026-03-27', yes: 56 },
      { date: '2026-03-28', yes: 55 },
      { date: '2026-03-29', yes: 57 },
      { date: '2026-03-30', yes: 56 },
      { date: '2026-03-31', yes: 58 },
      { date: '2026-04-01', yes: 57 },
      { date: '2026-04-02', yes: 59 },
      { date: '2026-04-03', yes: 58 },
      { date: '2026-04-04', yes: 58 },
    ],
  },
];

export const getCategoryColor = (category: Category): string => {
  const colors: Record<Category, string> = {
    Finance: 'bg-blue-500/20 text-blue-400',
    Politics: 'bg-red-500/20 text-red-400',
    Sports: 'bg-green-500/20 text-green-400',
    Tech: 'bg-purple-500/20 text-purple-400',
    Science: 'bg-yellow-500/20 text-yellow-400',
    Entertainment: 'bg-pink-500/20 text-pink-400',
  };
  return colors[category] || 'bg-gray-500/20 text-gray-400';
};
