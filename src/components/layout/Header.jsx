import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import { Menu, Shield, Eye } from 'lucide-react'

const pageTitles = {
  '/': 'Dashboard',
  '/transactions': 'Transactions',
  '/insights': 'Insights',
}

export default function Header({ onMenuClick }) {
  const { role } = useContext(AppContext)
  const location = useLocation()

  const title = pageTitles[location.pathname] || 'Dashboard'

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-2xl font-heading text-gray-900 dark:text-white">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800">
          {role === 'admin' ? (
            <Shield size={14} className="text-brand-600" />
          ) : (
            <Eye size={14} className="text-gray-500" />
          )}
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400 capitalize">
            {role}
          </span>
        </div>
      </div>
    </header>
  )
}
