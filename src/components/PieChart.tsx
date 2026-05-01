import { Box, Stack } from '@mui/material'
import { PieChart as MuiPieChart } from '@mui/x-charts/PieChart';
import type { ChartDataCategoryTotals } from '@type/type';
import { PieChartSkeleton } from './PieChartSkeleton';
import noDataUrl from '@assets/NoData.png'
import { Image } from "@styledComponents/Image"

const COLORS = [
  '#A4D4AE',
  '#C7E296',
  '#E4ED9F',
  '#F8D67C',
  '#FFC27A',
  '#FFA478',
  '#F28F79',
  '#E67A82',
  '#D17291'
]

type PieChartProps = {
  loading: boolean
  chartData: ChartDataCategoryTotals[]
}

/**
 * PieChart
 * @param props 
 * @returns 
 */
export const PieChart = (props: PieChartProps) => {
  const { loading = false, chartData = [] } = props

  return (
    <Box sx={{ width: '100%', px: 2 }}>
      {!loading ? (
        chartData.length > 0 ?
          <MuiPieChart
            series={[
              {
                data: chartData,
                outerRadius: 100,
              },
            ]}
            colors={COLORS}
            sx={{
              display: chartData.length > 0 ? 'static' : 'none',
              mt: 1,
              ' .MuiChartsLegend-root': { gap: 1, fontSize: 10 },
              ' .MuiChartsLabelMark-root.MuiChartsLabelMark-circle': { height: 10, width: 10 }
            }} // 凡例を非表示にするスタイル
            width={200}
            height={200}
          />
          :
          <Stack direction='column' spacing={1} sx={{ width: 'fit-content', m: 'auto' }}>
            <Image src={noDataUrl} alt="No data" />
          </Stack>
      ) : (
        <PieChartSkeleton />
      )}
    </Box>
  )
}