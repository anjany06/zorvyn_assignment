import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { monthlyData } from '../../data/mockData'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload) return null
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg px-3 py-2">
      <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-sm font-semibold" style={{ color: entry.color }}>
          ${entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  )
}

export default function MonthlyComparison() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5"
    >
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Monthly Comparison</h3>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:opacity-20" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
            <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" tickFormatter={v => `$${v / 1000}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="income" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar dataKey="expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
