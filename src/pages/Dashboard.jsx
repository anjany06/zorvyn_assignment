import SummaryCards from "../components/dashboard/SummaryCards";
import BalanceTrend from "../components/dashboard/BalanceTrend";
import SpendingBreakdown from "../components/dashboard/SpendingBreakdown";
import RecentTransactions from "../components/dashboard/RecentTransactions";

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-amber-200/70 bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50 px-5 py-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-amber-900">May snapshot</p>
            <p className="text-xs text-amber-900/70">
              You are 82% toward your savings goal.
            </p>
          </div>
          <button className="inline-flex items-center justify-center rounded-full bg-amber-900 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-amber-800">
            Set new goal
          </button>
        </div>
      </section>
      <SummaryCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BalanceTrend />
        <SpendingBreakdown />
      </div>
      <RecentTransactions />
    </div>
  );
}
