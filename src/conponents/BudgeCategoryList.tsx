import { Box, Stack, Typography } from "@mui/material"
import { List } from "./../styledComponents/List"
import type { ChartDataCategoryTotals } from "./../type"
import { BudgeCategoryListItem } from "./BudgeCategoryListItem"
import { useData } from "../DataContext";
import { BudgeCategoryListItemSkeleton } from "./BudgeCategoryListItemSkeleton";
import noDataUrl from './../assets/NoData.png'
import { Image } from "../styledComponents/Image"

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
            <Image src={noDataUrl} alt="No data" />
          </Stack>
      ) : (
        <List sx={{ px: 2, width: 'calc(100% - 32px)' }}>
          {[...Array(6)].map((_, index) => (
            <BudgeCategoryListItemSkeleton index={index} />
          ))}
        </List>
      )}
    </Box>
  )
}