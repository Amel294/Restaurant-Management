// Path: client\src\components\Order Metrics\OrderMetrics.tsx
import ChartOrderWeek from "./ChartOrderWeek"
import PieChartCard from "./PieChartCard"
function OrderMetrics() {
  return (
    <div className="grid grid-cols-2  gap-5">
        
        <PieChartCard/>

        <ChartOrderWeek/>
    </div>
  )
}
export default OrderMetrics