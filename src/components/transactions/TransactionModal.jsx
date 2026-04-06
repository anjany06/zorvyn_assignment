import { useState, useEffect, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AppContext } from '../../context/AppContext'
import { categories } from '../../data/mockData'
import { X } from 'lucide-react'

const emptyForm = {
  description: '',
  amount: '',
  category: 'Food',
  type: 'expense',
  date: new Date().toISOString().split('T')[0],
}

// Shared modal for adding and editing transactions
export default function TransactionModal({ isOpen, onClose, transaction }) {
  const { addTransaction, updateTransaction } = useContext(AppContext)
  const isEditing = !!transaction

  const [form, setForm] = useState(emptyForm)

  // Pre-fill form when editing, reset when adding
  useEffect(() => {
    if (transaction) {
      setForm({
        description: transaction.description,
        amount: String(transaction.amount),
        category: transaction.category,
        type: transaction.type,
        date: transaction.date,
      })
    } else {
      setForm({ ...emptyForm, date: new Date().toISOString().split('T')[0] })
    }
  }, [transaction, isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.description || !form.amount) return

    const data = { ...form, amount: parseFloat(form.amount) }

    if (isEditing) {
      updateTransaction(transaction.id, data)
    } else {
      addTransaction(data)
    }

    setForm({ ...emptyForm, date: new Date().toISOString().split('T')[0] })
    onClose()
  }

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                  {isEditing ? 'Edit Transaction' : 'Add Transaction'}
                </h3>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={form.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="e.g. Grocery shopping"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Amount ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0.01"
                      value={form.amount}
                      onChange={(e) => handleChange('amount', e.target.value)}
                      placeholder="0.00"
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => handleChange('date', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Category
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) => handleChange('category', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Type
                    </label>
                    <select
                      value={form.type}
                      onChange={(e) => handleChange('type', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="expense">Expense</option>
                      <option value="income">Income</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  {isEditing ? 'Save Changes' : 'Add Transaction'}
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
