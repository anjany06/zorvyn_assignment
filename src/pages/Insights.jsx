import InsightCards from '../components/insights/InsightCards'
import MonthlyComparison from '../components/insights/MonthlyComparison'
import CategoryBreakdown from '../components/insights/CategoryBreakdown'
import QuickSummary from '../components/insights/QuickSummary'

export default function Insights() {
  return (
    <div className="space-y-4">
      <InsightCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <MonthlyComparison />
        <CategoryBreakdown />
      </div>
      <QuickSummary />
    </div>
  )
}
