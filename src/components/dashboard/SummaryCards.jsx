import { useContext } from "react";
import { motion } from "framer-motion";
import { AppContext } from "../../context/AppContext";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export default function SummaryCards() {
  const { transactions } = useContext(AppContext);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-brand-500 dark:bg-gray-900 rounded-xl border border-brand-500 dark:border-gray-800 p-5 transition-colors shadow-sm"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-white dark:text-gray-400">
            Total Balance
          </span>
          <div className="w-9 h-9 rounded-lg bg-white dark:bg-brand-900/40 shadow-sm dark:shadow-none flex items-center justify-center">
            <Wallet size={18} className="text-brand-600" />
          </div>
        </div>
        <p className="text-2xl font-bold text-white dark:text-white">
          ${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </p>
        <div className="flex items-center gap-1 mt-2">
          <ArrowUpRight
            size={14}
            className="text-white dark:text-emerald-500"
          />
          <span className="text-xs font-semibold text-white dark:text-emerald-500">
            +12.5%
          </span>
          <span className="text-xs text-white/80 dark:text-gray-400">
            since last month
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-emerald-500 dark:bg-gray-900 rounded-xl border border-emerald-500 dark:border-gray-800 p-5 transition-colors shadow-sm"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-white dark:text-gray-400">
            Total Income
          </span>
          <div className="w-9 h-9 rounded-lg bg-white dark:bg-emerald-900/40 shadow-sm dark:shadow-none flex items-center justify-center">
            <TrendingUp size={18} className="text-emerald-600" />
          </div>
        </div>
        <p className="text-2xl font-bold text-white dark:text-white">
          ${totalIncome.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </p>
        <div className="flex items-center gap-1 mt-2">
          <ArrowUpRight
            size={14}
            className="text-white dark:text-emerald-500"
          />
          <span className="text-xs font-semibold text-white dark:text-emerald-500">
            +8.2%
          </span>
          <span className="text-xs text-white/80 dark:text-gray-400">
            since last month
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-rose-500 dark:bg-gray-900 rounded-xl border border-rose-500 dark:border-gray-800 p-5 transition-colors shadow-sm"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-white dark:text-gray-400">
            Total Expenses
          </span>
          <div className="w-9 h-9 rounded-lg bg-white dark:bg-rose-900/40 shadow-sm dark:shadow-none flex items-center justify-center">
            <TrendingDown size={18} className="text-rose-600" />
          </div>
        </div>
        <p className="text-2xl font-bold text-white dark:text-white">
          ${totalExpenses.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </p>
        <div className="flex items-center gap-1 mt-2">
          <ArrowDownRight size={14} className="text-white dark:text-rose-500" />
          <span className="text-xs font-semibold text-white dark:text-rose-500">
            -3.1%
          </span>
          <span className="text-xs text-white/80 dark:text-gray-400">
            since last month
          </span>
        </div>
      </motion.div>
    </div>
  );
}
