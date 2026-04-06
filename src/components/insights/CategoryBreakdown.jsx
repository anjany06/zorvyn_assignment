import { motion } from 'framer-motion'
import { categoryColors } from '../../data/mockData'
import useInsights from '../../hooks/useInsights'

export default function CategoryBreakdown() {
  const { categoryData } = useInsights()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5"
    >
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Spending by Category</h3>
      <div className="space-y-3">
        {categoryData.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">No spending data</p>
        ) : (
          categoryData.map((item, i) => {
            const maxVal = categoryData[0].value
            const pct = (item.value / maxVal) * 100
            return (
              <div key={item.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600 dark:text-gray-400">{item.name}</span>
                  <span className="font-medium text-gray-900 dark:text-white">${item.value.toFixed(0)}</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
                    className="h-2 rounded-full"
                    style={{ backgroundColor: categoryColors[item.name] || '#94a3b8' }}
                  />
                </div>
              </div>
            )
          })
        )}
      </div>
    </motion.div>
  )
}
