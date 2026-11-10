import { Box, Stack } from '@mui/material'
import { PieChart as MuiPieChart } from '@mui/x-charts/PieChart';
import type { ChartDataCategoryTotals } from '@type/type';
import { PieChartSkeleton } from './PieChartSkeleton';
import noDataUrl from '@assets/NoData.png'
import { Image } from "@styledComponents/Image"
import { COLORS } from '@src/constants/color';

const PIE_CHART_SIZE = 200; // 円グラフのサイズ
const OUTER_RADIUS = 100; // 外側の半径
const LABEL_MARK_FONT_SIZE = 10; // ラベルマークのサイズ
const LABEL_MARK_CIRCULAR_SIZE = 10; // ラベルマークの円形サイズ

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
    <Box sx={{ width: 'calc(100% - 24px)', padding: '0px 8px 0px 16px', mb: 1 }}>
      {!loading ? (
        chartData.length > 0 ?
          <MuiPieChart
            series={[
              {
                data: chartData,
                outerRadius: OUTER_RADIUS,
              },
            ]}
            colors={COLORS}
            sx={{
              display: chartData.length > 0 ? 'static' : 'none',
              mt: 1,
              ' .MuiChartsLegend-root': { gap: 1, fontSize: LABEL_MARK_FONT_SIZE },
              ' .MuiChartsLabelMark-root.MuiChartsLabelMark-circle': { height: LABEL_MARK_CIRCULAR_SIZE, width: LABEL_MARK_CIRCULAR_SIZE }
            }} // 凡例を非表示にするスタイル
            width={PIE_CHART_SIZE}
            height={PIE_CHART_SIZE}
          />
          :
          <Stack
            direction='column'
            spacing={1}
            sx={{ width: 'fit-content', m: 'auto' }}>
            <Image src={noDataUrl} alt="No data" />
          </Stack>
      ) : (
        <PieChartSkeleton />
      )}
    </Box>
  )
}