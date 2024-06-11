import { barChartData } from '../data'
import Chart from './BarChart'

export default function OrdersChart() {
  return <Chart data={barChartData} />
}
