import { Box, Stack } from "@mui/material"
import { List } from "@styledComponents/List"
import type { ChartDataCategoryTotals } from "@type/type"
import { BudgeCategoryListItem } from "@components/BudgeCategoryListItem"
import { useData } from "@cnxt/DataContext";
import { BudgeCategoryListItemSkeleton } from "@components/BudgeCategoryListItemSkeleton";

const SKELETON_NUMBER = 6
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
  '#4B8B60', // 深い緑
  '#7BA03E', // オリーブグリーン
  '#8A942C', // マスタード
  '#B88E1A', // ゴールデンイエロー
  '#C47A20', // ダークオレンジ
  '#C85D32', // テラコッタ
  '#BF4D36', // レッドオレンジ
  '#B13F48', // ローズレッド
  '#923D5A'  // ワインマゼンタ
]

export const BudgeCategoryList = ({ data }: { data: ChartDataCategoryTotals[] }) => {
  const { loadingCtx } = useData();

  return (
    <Box sx={{ flexGrow: 1, overflow: 'auto', width: '100%' }}>
      {!loadingCtx ? (
        data.length > 0 ?
          <List sx={{ py: 0, px: 2, width: 'calc(100% - 32px)' }}>
            {data?.map((data: ChartDataCategoryTotals) => (
              <BudgeCategoryListItem data={data} key={data.id} color={COLORS[data.id]} />
            ))}
          </List>
          :
          <Stack direction='column' spacing={1} sx={{ width: 'fit-content', m: 'auto' }}>
          </Stack>
      ) : (
        <List sx={{ px: 2, width: 'calc(100% - 32px)' }}>
          {[...Array(SKELETON_NUMBER)].map((_, index) => (
            <BudgeCategoryListItemSkeleton key={index} />
          ))}
        </List>
      )}
    </Box>
  )
}