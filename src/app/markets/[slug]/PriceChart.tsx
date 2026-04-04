'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface PriceChartProps {
  data: { date: string; yes: number }[]
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1F2937] border border-[#374151] rounded-lg px-3 py-2 shadow-xl">
        <p className="text-xs text-gray-400 mb-1">{formatDate(label)}</p>
        <p className="text-sm font-bold text-[#22C55E]">YES {payload[0].value}¢</p>
        <p className="text-sm font-bold text-[#EF4444]">NO {100 - payload[0].value}¢</p>
      </div>
    )
  }
  return null
}

export function PriceChart({ data }: PriceChartProps) {
  const formattedData = data.map(d => ({
    ...d,
    label: formatDate(d.date),
  }))

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={formattedData} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
        <XAxis
          dataKey="label"
          tick={{ fill: '#94A3B8', fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          interval={2}
        />
        <YAxis
          domain={[0, 100]}
          tick={{ fill: '#94A3B8', fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={v => `${v}¢`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="yes"
          stroke="#3B82F6"
          strokeWidth={2.5}
          dot={false}
          activeDot={{ r: 4, fill: '#3B82F6', strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
