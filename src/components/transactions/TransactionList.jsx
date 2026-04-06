import { useState, useContext, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AppContext } from '../../context/AppContext'
import { categories } from '../../data/mockData'
import TransactionModal from './TransactionModal'
import ConfirmModal from '../ui/ConfirmModal'
import { Search, Plus, Trash2, Pencil, Download, SlidersHorizontal } from 'lucide-react'

export default function TransactionList() {
  const { transactions, deleteTransaction, role } = useContext(AppContext)

  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [sortBy, setSortBy] = useState('date-desc')
  const [showModal, setShowModal] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  // Apply search, type filter, category filter, and sorting
  const filtered = useMemo(() => {
    let result = [...transactions]

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(t =>
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      )
    }

    if (filterType !== 'all') {
      result = result.filter(t => t.type === filterType)
    }

    if (filterCategory !== 'all') {
      result = result.filter(t => t.category === filterCategory)
    }

    switch (sortBy) {
      case 'date-desc':
        result.sort((a, b) => new Date(b.date) - new Date(a.date))
        break
      case 'date-asc':
        result.sort((a, b) => new Date(a.date) - new Date(b.date))
        break
      case 'amount-desc':
        result.sort((a, b) => b.amount - a.amount)
        break
      case 'amount-asc':
        result.sort((a, b) => a.amount - b.amount)
        break
    }

    return result
  }, [transactions, search, filterType, filterCategory, sortBy])

  // Generate and download CSV from currently filtered transactions
  const exportCSV = () => {
    const headers = 'Date,Description,Amount,Category,Type\n'
    const rows = filtered.map(t =>
      `${t.date},"${t.description}",${t.amount},${t.category},${t.type}`
    ).join('\n')

    const blob = new Blob([headers + rows], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'transactions.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const openAdd = () => {
    setEditingTransaction(null)
    setShowModal(true)
  }

  const openEdit = (transaction) => {
    setEditingTransaction(transaction)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingTransaction(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 w-full sm:max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <SlidersHorizontal size={14} />
            Filters
          </button>

          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <Download size={14} />
            Export
          </button>

          {role === 'admin' && (
            <button
              onClick={openAdd}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium transition-colors"
            >
              <Plus size={14} />
              Add
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>

              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="amount-desc">Highest Amount</option>
                <option value="amount-asc">Lowest Amount</option>
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="hidden sm:grid grid-cols-12 gap-2 px-5 py-3 border-b border-gray-100 dark:border-gray-800 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          <span className="col-span-2">Date</span>
          <span className="col-span-4">Description</span>
          <span className="col-span-2">Category</span>
          <span className="col-span-2 text-right">Amount</span>
          <span className="col-span-2 text-right">Actions</span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm text-gray-400">No transactions found</p>
            <p className="text-xs text-gray-400 mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {filtered.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: Math.min(i * 0.03, 0.3) }}
                className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2 px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <span className="sm:col-span-2 text-xs text-gray-500 dark:text-gray-400">
                  {new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="sm:col-span-4 text-sm font-medium text-gray-900 dark:text-white">
                  {t.description}
                </span>
                <span className="sm:col-span-2">
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                    {t.category}
                  </span>
                </span>
                <span className={`sm:col-span-2 text-sm font-semibold sm:text-right ${
                  t.type === 'income' ? 'text-emerald-500' : 'text-rose-500'
                }`}>
                  {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                </span>
                <span className="sm:col-span-2 flex justify-end gap-1">
                  {/* Edit and delete only visible to admin */}
                  {role === 'admin' && (
                    <>
                      <button
                        onClick={() => openEdit(t)}
                        className="p-1 rounded text-gray-400 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-colors"
                        title="Edit"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => setDeletingId(t.id)}
                        className="p-1 rounded text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </>
                  )}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <TransactionModal
        isOpen={showModal}
        onClose={closeModal}
        transaction={editingTransaction}
      />

      <ConfirmModal
        isOpen={deletingId !== null}
        onClose={() => setDeletingId(null)}
        onConfirm={() => deleteTransaction(deletingId)}
        title="Delete Transaction"
        message="Are you sure you want to delete this transaction? This action cannot be undone."
      />
    </div>
  )
}
