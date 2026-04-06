import { motion } from 'framer-motion'
import useInsights from '../../hooks/useInsights'

export default function QuickSummary() {
  const { transactionCount, avgTransaction, totalIncome, totalExpenses } = useInsights()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5"
    >
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Quick Summary</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-brand-500 dark:bg-gray-800/50 rounded-lg">
          <p className="text-2xl font-bold text-white">{transactionCount}</p>
          <p className="text-xs text-white mt-1">Total Transactions</p>
        </div>
        <div className="text-center p-3 bg-gray-200 dark:bg-gray-800/50 rounded-lg">
          <p className="text-2xl font-bold text-gray-800 dark:text-white">${avgTransaction.toFixed(0)}</p>
          <p className="text-xs text-gray-500 mt-1">Avg. Expense</p>
        </div>
        <div className="text-center p-3 bg-emerald-500 dark:bg-gray-800/50 rounded-lg">
          <p className="text-2xl font-bold text-white">${totalIncome.toLocaleString()}</p>
          <p className="text-xs text-white mt-1">Total Income</p>
        </div>
        <div className="text-center p-3 bg-rose-500 dark:bg-gray-800/50 rounded-lg">
          <p className="text-2xl font-bold text-white">${totalExpenses.toLocaleString()}</p>
          <p className="text-xs text-white mt-1">Total Spent</p>
        </div>
      </div>
    </motion.div>
  )
}
