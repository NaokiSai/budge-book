import { Box, Stack, Typography } from "@mui/material"
import { List } from "./../styledComponents/List"
import { SwipeableList, SwipeableListItem, SwipeAction } from "react-swipeable-list"
import type { DataEntry } from "./../type"
import { BudgeListItemSkelton } from "./BudgeListItemSkelton"
import { BudgeListItem } from "./BudgeListItem"
import DeleteIcon from '@mui/icons-material/Delete';
import { useData } from "./../DataContext"
import 'react-swipeable-list/dist/styles.css'; // スタイルを忘れずにインポート
import noDataUrl from './../assets/NoData.png'
import { Image } from "../styledComponents/Image"

export const BudgeList = () => {
  const { data, loading } = useData();

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
    <Box sx={{ width: 'calc(100% - 32px)', flexGrow: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', px: 2 }}>
      {loading ? (
        <List>
          {[...Array(3)].map((_, index) => (
            <BudgeListItemSkelton index={index}/>
          ))}
        </List>
      ) : null}
      {data.length > 0 ? (
        !loading &&
        <List sx={{ p: 0 }}>
          <SwipeableList>
            {data?.map((entry: DataEntry) => (
              <SwipeableListItem
                key={entry.id}
                trailingActions={trailingActions}
              >
                <BudgeListItem entry={entry} key={entry.id} />
              </SwipeableListItem>
            ))}
          </SwipeableList>
        </List>
      ) : (
        !loading &&
        <Stack direction='column' spacing={1} sx={{ width: 'fit-content', m: 'auto' }}>
          <Image src={noDataUrl} alt="No data" />
        </Stack>
      )}
    </Box>
  )
}