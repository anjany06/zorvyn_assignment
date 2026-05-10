import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import {
  Menu,
  Shield,
  Eye,
  Bell,
  UserCircle,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

const pageTitles = {
  "/": "Dashboard",
  "/transactions": "Transactions",
  "/insights": "Insights",
};

export default function Header({ onMenuClick, isCollapsed, setIsCollapsed }) {
  const { role } = useContext(AppContext);
  const location = useLocation();

  const title = pageTitles[location.pathname] || "Dashboard";

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 py-3 lg:py-4">
      <div className="flex justify-between items-center px-4 sm:px-6 relative">
        <div className="flex items-center gap-3 lg:gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Menu size={20} />
          </button>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="Toggle Sidebar"
          >
            {isCollapsed ? (
              <PanelLeftOpen size={20} />
            ) : (
              <PanelLeftClose size={20} />
            )}
          </button>

          <h1 className="text-2xl font-heading text-gray-900 dark:text-white leading-none mt-1">
            {title}
          </h1>
        </div>

        {/* Centered Welcome Message */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 px-4 py-1.5 rounded-full border border-gray-100 dark:border-gray-700 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex items-center gap-2">
            Welcome back, User <span className="text-lg leading-none">👋</span>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800">
            {role === "admin" ? (
              <Shield size={14} className="text-brand-600" />
            ) : (
              <Eye size={14} className="text-gray-500" />
            )}
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400 capitalize">
              {role}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button className="relative p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 border border-white dark:border-gray-900 rounded-full pulse-dot"></span>
            </button>
            <button className="p-1 rounded-full text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
              <UserCircle size={28} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
