import { useContext } from 'react'
import { motion } from 'framer-motion'
import { AppContext } from '../../context/AppContext'

export default function RecentTransactions() {
  const { transactions } = useContext(AppContext)

  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5"
    >
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Recent Transactions</h3>

      {recent.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-4">No transactions yet</p>
      ) : (
        <div className="space-y-3">
          {recent.map(t => {
            const isIncome = t.type === 'income'
            return (
              <div
                key={t.id}
                className={`flex items-center justify-between p-3 rounded-xl shadow-sm border transition-colors dark:bg-transparent dark:border-gray-800 dark:p-0 dark:py-3 dark:rounded-none dark:border-x-0 dark:border-t-0 dark:shadow-none ${
                  isIncome 
                    ? 'bg-emerald-500 border-emerald-500' 
                    : 'bg-rose-500 border-rose-500'
                }`}
              >
                <div>
                  <p className="text-sm font-medium text-white shadow-none dark:text-gray-100">{t.description}</p>
                  <p className="text-xs text-white/80 mt-0.5 dark:text-gray-400">{t.category} · {t.date}</p>
                </div>
                <span
                  className={`text-sm font-semibold px-3 py-1 rounded-lg bg-white shadow-sm dark:bg-transparent dark:shadow-none dark:px-0 dark:py-0 ${
                    isIncome ? 'text-emerald-600 dark:text-emerald-500' : 'text-rose-600 dark:text-rose-500'
                  }`}
                >
                  {isIncome ? '+' : '-'}${t.amount.toFixed(2)}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </motion.div>
  )
}
