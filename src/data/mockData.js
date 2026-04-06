// Sample transaction data across multiple months
export const transactions = [
  { id: 1, date: '2025-04-01', description: 'Salary Deposit', amount: 5200, category: 'Salary', type: 'income' },
  { id: 2, date: '2025-04-02', description: 'Grocery Store', amount: 85.40, category: 'Food', type: 'expense' },
  { id: 3, date: '2025-04-03', description: 'Netflix Subscription', amount: 15.99, category: 'Entertainment', type: 'expense' },
  { id: 4, date: '2025-04-04', description: 'Electric Bill', amount: 120.00, category: 'Utilities', type: 'expense' },
  { id: 5, date: '2025-04-05', description: 'Freelance Payment', amount: 800, category: 'Freelance', type: 'income' },
  { id: 6, date: '2025-04-06', description: 'Gas Station', amount: 45.00, category: 'Transport', type: 'expense' },
  { id: 7, date: '2025-04-07', description: 'Restaurant Dinner', amount: 62.50, category: 'Food', type: 'expense' },
  { id: 8, date: '2025-04-08', description: 'Gym Membership', amount: 40.00, category: 'Health', type: 'expense' },
  { id: 9, date: '2025-04-09', description: 'Uber Ride', amount: 18.75, category: 'Transport', type: 'expense' },
  { id: 10, date: '2025-04-10', description: 'Amazon Purchase', amount: 134.99, category: 'Shopping', type: 'expense' },
  { id: 11, date: '2025-04-11', description: 'Side Project Income', amount: 350, category: 'Freelance', type: 'income' },
  { id: 12, date: '2025-04-12', description: 'Phone Bill', amount: 55.00, category: 'Utilities', type: 'expense' },
  { id: 13, date: '2025-04-13', description: 'Coffee Shop', amount: 12.30, category: 'Food', type: 'expense' },
  { id: 14, date: '2025-04-14', description: 'Spotify', amount: 9.99, category: 'Entertainment', type: 'expense' },
  { id: 15, date: '2025-04-15', description: 'Internet Bill', amount: 70.00, category: 'Utilities', type: 'expense' },
  { id: 16, date: '2025-04-16', description: 'Bonus Payment', amount: 1200, category: 'Salary', type: 'income' },
  { id: 17, date: '2025-04-17', description: 'Supermarket', amount: 97.60, category: 'Food', type: 'expense' },
  { id: 18, date: '2025-04-18', description: 'Movie Tickets', amount: 28.00, category: 'Entertainment', type: 'expense' },
  { id: 19, date: '2025-04-19', description: 'Parking Fee', amount: 15.00, category: 'Transport', type: 'expense' },
  { id: 20, date: '2025-04-20', description: 'Doctor Visit', amount: 150.00, category: 'Health', type: 'expense' },
  { id: 21, date: '2025-03-01', description: 'March Salary', amount: 5200, category: 'Salary', type: 'income' },
  { id: 22, date: '2025-03-05', description: 'Rent Payment', amount: 1400, category: 'Utilities', type: 'expense' },
  { id: 23, date: '2025-03-08', description: 'Groceries', amount: 112.30, category: 'Food', type: 'expense' },
  { id: 24, date: '2025-03-12', description: 'Freelance Work', amount: 600, category: 'Freelance', type: 'income' },
  { id: 25, date: '2025-03-15', description: 'Car Insurance', amount: 180.00, category: 'Transport', type: 'expense' },
  { id: 26, date: '2025-03-20', description: 'Online Course', amount: 49.99, category: 'Shopping', type: 'expense' },
  { id: 27, date: '2025-03-25', description: 'Pharmacy', amount: 32.50, category: 'Health', type: 'expense' },
  { id: 28, date: '2025-02-01', description: 'February Salary', amount: 5200, category: 'Salary', type: 'income' },
  { id: 29, date: '2025-02-10', description: 'Valentine Dinner', amount: 95.00, category: 'Food', type: 'expense' },
  { id: 30, date: '2025-02-14', description: 'Gift Purchase', amount: 75.00, category: 'Shopping', type: 'expense' },
]

// Available transaction categories
export const categories = ['Food', 'Entertainment', 'Utilities', 'Transport', 'Shopping', 'Health', 'Salary', 'Freelance']

// Color mapping for chart visualizations
export const categoryColors = {
  Food: '#f97316',
  Entertainment: '#a855f7',
  Utilities: '#3b82f6',
  Transport: '#eab308',
  Shopping: '#ec4899',
  Health: '#10b981',
  Salary: '#6366f1',
  Freelance: '#14b8a6',
}

// Aggregated monthly data for trend charts
export const monthlyData = [
  { month: 'Jan', income: 5200, expenses: 2100 },
  { month: 'Feb', income: 5200, expenses: 2450 },
  { month: 'Mar', income: 5800, expenses: 2830 },
  { month: 'Apr', income: 7550, expenses: 960 },
]
