import { Box, Stack, Typography } from "@mui/material"
import { List } from "@styledComponents/List"
import { SwipeableList, SwipeableListItem, SwipeAction, Type as ListType } from "react-swipeable-list"
import type { DataEntry } from "@type/type"
import { BudgeListItemSkelton } from "@components/BudgeListItemSkelton"
import { BudgeListItem } from "@components/BudgeListItem"
import DeleteIcon from '@mui/icons-material/Delete';
import { useData } from "@cnxt/DataContext"
import 'react-swipeable-list/dist/styles.css'; // スタイルを忘れずにインポート
import noDataUrl from '@assets/NoData.png'
import { Image } from "@styledComponents/Image"
import '@css/BudgeList.css'
// import React from "react"

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
          minWidth: 64,
          height: '100%',
          color: 'white',
          cursor: 'pointer',
          justifyContent: 'center',
          padding: 0,
          ml: 1
        }}
      >
        <DeleteIcon />
        <Typography variant="button" sx={{ fontSize: 12 }}>削除</Typography>
      </Stack>
    </SwipeAction>
  );

  return (
    <Box sx={{ width: 'calc(100% - 32px)', flexGrow: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', px: 2 }}>
      {loading ? (
        <List>
          {[...Array(3)].map((_, index) => (
            <BudgeListItemSkelton key={index} index={index} />
          ))}
        </List>
      ) : null}
      {data.length > 0 ? (
        !loading &&
        <List sx={{ p: 0 }}>
          <SwipeableList
            fullSwipe={false}
            // threshold={0.2}
            type={ListType.IOS} // iOS風の「引っ張って止まる」挙動になります
          >
            {data?.map((entry: DataEntry) => (
              <SwipeableListItem
                key={entry.id}
                // trailingActions={trailingActions}
                leadingActions={trailingActions}
                trailingActions={trailingActions}
              // className='test'
              threshold={0.1}
              // maxSwipe={0}
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