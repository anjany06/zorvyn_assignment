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
          {recent.map(t => (
            <div
              key={t.id}
              className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0"
            >
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{t.description}</p>
                <p className="text-xs text-gray-400 mt-0.5">{t.category} · {t.date}</p>
              </div>
              <span
                className={`text-sm font-semibold ${
                  t.type === 'income' ? 'text-emerald-500' : 'text-rose-500'
                }`}
              >
                {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
