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
        className="bg-rose-500 dark:bg-gray-900 rounded-xl border border-rose-500 dark:border-gray-800 p-5 transition-colors shadow-sm"
      >
        <div className="w-9 h-9 rounded-lg bg-white dark:bg-rose-900/20 shadow-sm flex items-center justify-center mb-3">
          <AlertCircle size={18} className="text-rose-500" />
        </div>
        <p className="text-xs font-medium text-white/90 dark:text-gray-400">Highest Spending</p>
        <p className="text-xl font-bold mt-1 text-white dark:text-rose-500">
          {topCategory ? topCategory[0] : 'N/A'}
        </p>
        <p className="text-xs text-white/80 dark:text-gray-400 mt-1">
          {topCategory ? `$${topCategory[1].toFixed(2)} total` : 'No data'}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`rounded-xl border p-5 transition-colors shadow-sm ${
          expenseChange > 0 
            ? 'bg-rose-500 border-rose-500 dark:bg-gray-900 dark:border-gray-800' 
            : 'bg-emerald-500 border-emerald-500 dark:bg-gray-900 dark:border-gray-800'
        }`}
      >
        <div className={`w-9 h-9 rounded-lg bg-white shadow-sm flex items-center justify-center mb-3 ${
          expenseChange > 0 ? 'dark:bg-rose-900/20' : 'dark:bg-emerald-900/20'
        }`}>
          <TrendingUp size={18} className={expenseChange > 0 ? 'text-rose-500' : 'text-emerald-500'} />
        </div>
        <p className="text-xs font-medium text-white/90 dark:text-gray-400">Monthly Change</p>
        <p className={`text-xl font-bold mt-1 text-white ${expenseChange > 0 ? 'dark:text-rose-500' : 'dark:text-emerald-500'}`}>
          {expenseChange > 0 ? '+' : ''}{expenseChange.toFixed(1)}%
        </p>
        <p className="text-xs mt-1 text-white/80 dark:text-gray-400">Expenses vs last month</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-brand-500 dark:bg-gray-900 rounded-xl border border-brand-500 dark:border-gray-800 p-5 transition-colors shadow-sm"
      >
        <div className="w-9 h-9 rounded-lg bg-white dark:bg-brand-900/20 shadow-sm flex items-center justify-center mb-3">
          <PiggyBank size={18} className="text-brand-600" />
        </div>
        <p className="text-xs font-medium text-white/90 dark:text-gray-400">Savings Rate</p>
        <p className="text-xl font-bold mt-1 text-white dark:text-brand-500">{savingsRate.toFixed(1)}%</p>
        <p className="text-xs text-white/80 dark:text-gray-400 mt-1">Of total income saved</p>
      </motion.div>
    </div>
  )
}
