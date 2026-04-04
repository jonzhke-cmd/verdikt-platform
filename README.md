# Verdikt — Prediction Markets Platform

> "Make your call. Back it with real conviction."

A Kalshi-style prediction market demo platform built with Next.js 14, TypeScript, Tailwind CSS, and Recharts.

## Stack

- **Framework:** Next.js 14 (App Router, TypeScript)
- **Styling:** Tailwind CSS v3 (dark theme)
- **Icons:** Lucide React
- **Charts:** Recharts
- **Data:** Mock data (no database)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, featured markets, how it works, trending, CTA |
| `/markets` | Browseable + filterable market grid |
| `/markets/[slug]` | Market detail — price chart, order book, trade panel |
| `/portfolio` | Mock portfolio dashboard |
| `/how-it-works` | Educational page + FAQ |
| `/sign-in` | Authentication UI |

## Getting Started

```bash
npm install
npm run dev
```

## Deploy on Vercel

1. Push this repo to GitHub ✅
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import `jonzhke-cmd/verdikt-platform`
4. Leave all settings as default (Next.js auto-detected)
5. Click **Deploy**

No environment variables required. No database needed.

---

⚠️ *Not financial advice. For entertainment only.*
