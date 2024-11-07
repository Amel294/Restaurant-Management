// Path: client\src\components\Order Metrics\OrderMetrics.tsx
import ChartOrder from "./ChartOrder"
import PieChartCard from "./PieChartCard"
function OrderMetrics() {
  return (
    <div className="grid grid-cols-2 pe-4">
        
        <PieChartCard/>

        <ChartOrder/>
    </div>
  )
}
export default OrderMetrics