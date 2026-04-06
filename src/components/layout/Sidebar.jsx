import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import {
  LayoutDashboard,
  ArrowLeftRight,
  Lightbulb,
  Sun,
  Moon,
  X,
  Landmark,
  ChevronDown,
} from 'lucide-react'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { to: '/insights', label: 'Insights', icon: Lightbulb },
]

export default function Sidebar({ mobileOpen, setMobileOpen, isCollapsed }) {
  const { darkMode, setDarkMode, role, setRole } = useContext(AppContext)

  return (
    <>
      {/* Dark overlay when mobile menu is open */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full overflow-hidden
          bg-brand-600 dark:bg-gray-900 shadow-xl
          flex flex-col transition-all duration-300
          lg:translate-x-0 lg:static lg:z-auto border dark:border-gray-800  
          ${mobileOpen ? 'translate-x-0 w-64' : '-translate-x-full'}
          ${!mobileOpen && isCollapsed ? 'lg:w-20' : 'lg:w-64'}
        `}
      >
        {/* Logo Header (distinct background exception per request) */}
        <div className="bg-white dark:bg-gray-900 flex items-center justify-between px-5 py-[18px] border-b border-gray-100 dark:border-gray-800 shrink-0">
          <div className="flex items-center gap-2.5 overflow-hidden w-full">
            <div className={`w-8 h-8 rounded-lg outline outline-2 outline-brand-600 bg-brand-600 flex items-center justify-center shrink-0 transition-all ${isCollapsed ? 'mx-auto' : ''}`}>
              <Landmark size={18} className="text-white" />
            </div>
            <span className={`text-lg font-bold text-gray-900 dark:text-white whitespace-nowrap transition-opacity duration-300 ${isCollapsed ? 'lg:opacity-0 lg:w-0 lg:hidden' : 'opacity-100'}`}>
              FinTrack
            </span>
          </div>
          
          <button
            className="lg:hidden text-gray-500 hover:text-gray-700 shrink-0 ml-2"
            onClick={() => setMobileOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-2">
          {navItems.map(item => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) => `
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                  transition-colors duration-150 relative group
                  ${isActive
                    ? 'bg-white text-gray-900 dark:bg-gray-800 dark:text-white shadow-sm'
                    : 'text-brand-100 hover:bg-brand-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
                  }
                  ${isCollapsed ? 'justify-center' : ''}
                `}
                title={isCollapsed ? item.label : ''}
              >
                <Icon size={18} className="shrink-0" />
                <span className={`whitespace-nowrap transition-opacity ${isCollapsed ? 'lg:hidden' : 'block'}`}>
                  {item.label}
                </span>
              </NavLink>
            )
          })}
        </nav>

        {/* Role switcher and theme toggle */}
        <div className={`px-3 pb-6 space-y-3`}>
          <div className={`transition-opacity ${isCollapsed ? 'lg:hidden' : 'block'}`}>
            <label className="text-xs font-medium text-brand-200 dark:text-gray-400 uppercase tracking-wider">
              Role
            </label>
            <div className="relative mt-1">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-lg border-none bg-brand-700 dark:bg-gray-800 text-sm text-white dark:text-gray-300 pl-3 pr-8 py-2.5 outline-none focus:ring-2 focus:ring-white/20 cursor-pointer appearance-none"
              >
                <option value="admin">Admin</option>
                <option value="viewer">Viewer</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 pointer-events-none" />
            </div>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`
              w-full flex items-center gap-3 py-2.5 rounded-lg text-sm font-medium transition-colors
              text-brand-100 hover:bg-brand-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white
              ${isCollapsed ? 'justify-center px-0' : 'px-3'}
            `}
            title={isCollapsed ? (darkMode ? 'Light Mode' : 'Dark Mode') : ''}
          >
            {darkMode ? <Sun size={18} className="shrink-0" /> : <Moon size={18} className="shrink-0" />}
            <span className={`whitespace-nowrap transition-opacity ${isCollapsed ? 'lg:hidden' : 'block'}`}>
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>
        </div>
      </aside>
    </>
  )
}
