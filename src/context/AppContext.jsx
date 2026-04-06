import { createContext, useState, useEffect } from 'react'
import { transactions as initialTransactions } from '../data/mockData'

export const AppContext = createContext()

// Provides global state for role, transactions, and theme

export function AppProvider({ children }) {
  // Load saved preferences from localStorage on first render
  const [role, setRole] = useState(() => {
    return localStorage.getItem('fintrack-role') || 'admin'
  })

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('fintrack-transactions')
    return saved ? JSON.parse(saved) : initialTransactions
  })

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('fintrack-theme') === 'dark'
  })


  // Persist state changes to localStorage
  useEffect(() => {
    localStorage.setItem('fintrack-transactions', JSON.stringify(transactions))
  }, [transactions])

  useEffect(() => {
    localStorage.setItem('fintrack-role', role)
  }, [role])

  // Toggle dark class on html element for Tailwind dark mode
  useEffect(() => {
    localStorage.setItem('fintrack-theme', darkMode ? 'dark' : 'light')
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now(),
    }
    setTransactions(prev => [newTransaction, ...prev])
  }

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id))
  }

  const updateTransaction = (id, updated) => {
    setTransactions(prev =>
      prev.map(t => t.id === id ? { ...t, ...updated } : t)
    )
  }

  const value = {
    role,
    setRole,
    transactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    darkMode,
    setDarkMode,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
