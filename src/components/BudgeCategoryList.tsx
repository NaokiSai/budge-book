import { Box, Stack } from "@mui/material"
import { List } from "@styledComponents/List"
import type { ChartDataCategoryTotals } from "@type/type"
import { BudgeCategoryListItem } from "@components/BudgeCategoryListItem"
import { useData } from "@cnxt/DataContext";
import { BudgeCategoryListItemSkeleton } from "@components/BudgeCategoryListItemSkeleton";

export const BudgeCategoryList = ({ data }: { data: ChartDataCategoryTotals[] }) => {
  const { loading } = useData();

  return (
    <Box sx={{ flexGrow: 1, overflow: 'auto', width: '100%' }}>
      {!loading ? (
        data.length > 0 ?
          <List sx={{ py: 0, px: 2, width: 'calc(100% - 32px)' }}>
            {data?.map((data: ChartDataCategoryTotals) => (
              <BudgeCategoryListItem data={data} key={data.id} />
            ))}
          </List>
          :
          <Stack direction='column' spacing={1} sx={{ width: 'fit-content', m: 'auto' }}>
          </Stack>
      ) : (
        <List sx={{ px: 2, width: 'calc(100% - 32px)' }}>
          {[...Array(6)].map((_, index) => (
            <BudgeCategoryListItemSkeleton key={index} />
          ))}
        </List>
      )}
    </Box>
  )
}