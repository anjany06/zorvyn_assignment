import { motion } from 'framer-motion'
import { TrendingUp, AlertCircle, PiggyBank } from 'lucide-react'
import useInsights from '../../hooks/useInsights'

export default function InsightCards() {
  const { topCategory, expenseChange, savingsRate } = useInsights()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5"
      >
        <div className="w-9 h-9 rounded-lg bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center mb-3">
          <AlertCircle size={18} className="text-rose-500" />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">Highest Spending</p>
        <p className="text-xl font-bold mt-1 text-rose-500">
          {topCategory ? topCategory[0] : 'N/A'}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {topCategory ? `$${topCategory[1].toFixed(2)} total` : 'No data'}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5"
      >
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${
          expenseChange > 0 ? 'bg-rose-50 dark:bg-rose-900/20' : 'bg-emerald-50 dark:bg-emerald-900/20'
        }`}>
          <TrendingUp size={18} className={expenseChange > 0 ? 'text-rose-500' : 'text-emerald-500'} />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">Monthly Change</p>
        <p className={`text-xl font-bold mt-1 ${expenseChange > 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
          {expenseChange > 0 ? '+' : ''}{expenseChange.toFixed(1)}%
        </p>
        <p className="text-xs text-gray-400 mt-1">Expenses vs last month</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5"
      >
        <div className="w-9 h-9 rounded-lg bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center mb-3">
          <PiggyBank size={18} className="text-brand-600" />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">Savings Rate</p>
        <p className="text-xl font-bold mt-1 text-brand-600">{savingsRate.toFixed(1)}%</p>
        <p className="text-xs text-gray-400 mt-1">Of total income saved</p>
      </motion.div>
    </div>
  )
}
