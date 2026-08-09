import { Box, Stack } from '@mui/material'
import { PieChart as MuiPieChart } from '@mui/x-charts/PieChart';
import type { ChartDataCategoryTotals } from '@type/type';
import { PieChartSkeleton } from './PieChartSkeleton';
import noDataUrl from '@assets/NoData.png'
import { Image } from "@styledComponents/Image"

// const COLORS = [
//   '#A4D4AE',
//   '#C7E296',
//   '#E4ED9F',
//   '#F8D67C',
//   '#FFC27A',
//   '#FFA478',
//   '#F28F79',
//   '#E67A82',
//   '#D17291'
// ]

const COLORS = [
  // --- 緑・アースカラー（追加） ---
  '#2C5F40', // 1. 【追加】より深みのあるフォレストグリーン（パレットの始まりを強調）
  '#4B8B60', // (元: 深い緑)

  // --- 黄・オレンジへの移行（追加） ---
  '#65964D', // 2. 【追加】中間を埋める草色
  '#7BA03E', // (元: オリーブグリーン)
  '#8A942C', // (元: マスタード)
  '#A09121', // 3. 【追加】マスタードとゴールデンイエローの中間

  // --- オレンジ・暖色（追加） ---
  '#B88E1A', // (元: ゴールデンイエロー)
  '#BF841D', // 4. 【追加】アンバー（琥珀色）を加え、オレンジへの移行を滑らかに
  '#C47A20', // (元: ダークオレンジ)
  '#C66C29', // 5. 【追加】焼けたようなオレンジ

  // --- レッド・赤茶（追加） ---
  '#C85D32', // (元: テラコッタ)
  '#C35534', // 6. 【追加】テラコッタとレッドオレンジのグラデーションを補間
  '#BF4D36', // (元: レッドオレンジ)
  '#B8463F', // 7. 【追加】より深く、少し茶色みを帯びた赤

  // --- ピンク・紫（追加） ---
  '#B13F48', // (元: ローズレッド)
  '#A13E51', // 8. 【追加】ローズレッドとワインマゼンタを滑らかにつなぐ
  '#923D5A', // (元: ワインマゼンタ)

  // --- 紫の深まり（追加） ---
  '#7B385D', // 9. 【追加】ワインマゼンタの先にある、より暗い紫
  '#5F304B'  // 10.【追加】最も深く、落ち着いたプラム色（パレットの終わりを引き締める）
];

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