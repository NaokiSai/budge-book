import { Box } from '@mui/material'
import { PieChart as MuiPieChart } from '@mui/x-charts/PieChart';
import type { ChartDataCategoryTotals } from './type';
import { PieChartSkeleton } from './PieChartSkeleton';

type PieChartProps = {
  loading: boolean
  chartData: ChartDataCategoryTotals[]
}

export const PieChart = (props: PieChartProps) => {
  const { loading = false, chartData = [] } = props

  return (
    <Box sx={{ width: '100%', px: 2 }}>
      {!loading ? (
        <MuiPieChart
          series={[
            {
              data: chartData,
              outerRadius: 100,
            },
          ]}
          sx={{
            display: chartData.length > 0 ? 'static' : 'none',
            mt: 1,
            ' .MuiChartsLegend-root': { gap: 1, fontSize: 10 },
            ' .MuiChartsLabelMark-root.MuiChartsLabelMark-circle': { height: 10, width: 10 }
          }} // 凡例を非表示にするスタイル
          width={200}
          height={200}
        />
      ) : (
        <PieChartSkeleton />
      )}
    </Box>
  )
}