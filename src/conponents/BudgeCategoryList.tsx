import { Box, Stack, Typography } from "@mui/material"
import { List } from "./../styledComponents/List"
import { SwipeableList, SwipeableListItem, SwipeAction } from "react-swipeable-list"
import type { ChartDataCategoryTotals } from "./../type"
// import { BudgeListItemSkelton } from "./BudgeListItemSkelton"
// import { BudgeListItem } from "./BudgeListItem"
import DeleteIcon from '@mui/icons-material/Delete';
// import { useData } from "./../DataContext"
import 'react-swipeable-list/dist/styles.css'; // スタイルを忘れずにインポート
import { BudgeCategoryListItem } from "./BudgeCategoryListItem"

// type BudgeCategoryListProps ={

// }

export const BudgeCategoryList = ({ data }: { data: ChartDataCategoryTotals[] }) => {
  // const { data, loading } = useData();

  // 左スワイプ時に表示されるアクション部分
  const trailingActions = (
    <SwipeAction onClick={() => { }}>
      <Stack
        sx={{
          backgroundColor: 'error.main',
          display: 'flex',
          alignItems: 'center',
          px: 3,
          maxWidth: 64,
          height: '100%',
          color: 'white',
          cursor: 'pointer'
        }}
      >
        <DeleteIcon />
        <Typography variant="button" sx={{ ml: 1 }}>削除</Typography>
      </Stack>
    </SwipeAction>
  );

  return (
    <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
      <List>
        <SwipeableList>
          {data?.map((data: ChartDataCategoryTotals) => (
            <SwipeableListItem
              key={data.id}
              trailingActions={trailingActions}
            >
              <BudgeCategoryListItem data={data} key={data.id} />
            </SwipeableListItem>
          ))}
        </SwipeableList>
      </List>
    </Box>
  )
}