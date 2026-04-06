import SummaryCards from '../components/dashboard/SummaryCards'
import BalanceTrend from '../components/dashboard/BalanceTrend'
import SpendingBreakdown from '../components/dashboard/SpendingBreakdown'
import RecentTransactions from '../components/dashboard/RecentTransactions'

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <SummaryCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BalanceTrend />
        <SpendingBreakdown />
      </div>
      <RecentTransactions />
    </div>
  )
}
