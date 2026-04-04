import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'verdikt-bg': '#0A0F1E',
        'verdikt-card': '#111827',
        'verdikt-border': '#1F2937',
        'verdikt-blue': '#3B82F6',
        'verdikt-yes': '#22C55E',
        'verdikt-no': '#EF4444',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
