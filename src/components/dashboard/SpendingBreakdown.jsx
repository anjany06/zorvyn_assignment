import { useContext } from 'react'
import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { AppContext } from '../../context/AppContext'
import { categoryColors } from '../../data/mockData'

function CustomTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null
  const data = payload[0]
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg px-3 py-2">
      <p className="text-sm font-semibold text-gray-900 dark:text-white">{data.name}</p>
      <p className="text-xs text-gray-500">${data.value.toFixed(2)}</p>
    </div>
  )
}

export default function SpendingBreakdown() {
  const { transactions } = useContext(AppContext)

  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount
      return acc
    }, {})

  const chartData = Object.entries(expensesByCategory)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)

  const total = chartData.reduce((sum, d) => sum + d.value, 0)

  if (chartData.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Spending Breakdown</h3>
        <p className="text-sm text-gray-400 text-center py-8">No expense data available</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5"
    >
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Spending Breakdown</h3>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="w-44 h-44 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
              >
                {chartData.map((entry) => (
                  <Cell key={entry.name} fill={categoryColors[entry.name] || '#94a3b8'} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-2 w-full">
          {chartData.map(item => {
            const pct = ((item.value / total) * 100).toFixed(1)
            return (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: categoryColors[item.name] || '#94a3b8' }}
                />
                <span className="text-xs text-gray-600 dark:text-gray-400 flex-1">{item.name}</span>
                <span className="text-xs font-medium text-gray-900 dark:text-white">${item.value.toFixed(0)}</span>
                <span className="text-xs text-gray-400 w-10 text-right">{pct}%</span>
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
