import { useContext, useMemo } from 'react'
import { AppContext } from '../context/AppContext'
import { monthlyData } from '../data/mockData'

// Derives financial insights from transaction data
export default function useInsights() {
  const { transactions } = useContext(AppContext)

  return useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense')
    const income = transactions.filter(t => t.type === 'income')

    const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0)
    const totalIncome = income.reduce((sum, t) => sum + t.amount, 0)
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100) : 0

    // Group expenses by category for breakdown charts
    const byCategory = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount
      return acc
    }, {})

    const topCategory = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0]

    const avgTransaction = expenses.length > 0
      ? totalExpenses / expenses.length
      : 0

    // Month-over-month comparison
    const currentMonth = monthlyData[monthlyData.length - 1]
    const prevMonth = monthlyData[monthlyData.length - 2]
    const expenseChange = prevMonth
      ? ((currentMonth.expenses - prevMonth.expenses) / prevMonth.expenses * 100)
      : 0

    const categoryData = Object.entries(byCategory)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)

    return {
      topCategory,
      avgTransaction,
      savingsRate,
      expenseChange,
      totalExpenses,
      totalIncome,
      transactionCount: transactions.length,
      categoryData,
    }
  }, [transactions])
}
