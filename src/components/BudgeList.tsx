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
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react"
import { MessageDialog } from "./MessageDialog"
import { EditDialog } from "./EditDialog"
export const BudgeList = () => {
  const { data, loading } = useData();
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [willData, setWillData] = useState<DataEntry | null>(null)

  // 左スワイプ時に表示されるアクション部分
  const editAction = (data: DataEntry) => (
    <SwipeAction onClick={() => handleEditAction(data)}>
      <Stack
        sx={{
          backgroundColor: 'green',
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
          mr: 1
        }}
      >
        <EditIcon />
        <Typography variant="button" sx={{ fontSize: 12 }}>編集</Typography>
      </Stack>
    </SwipeAction >
  );

  const handleEditAction = (data: DataEntry) => {
    setWillData(data)
    setEditOpen(true)
  }

  const handleEditOk = () => {
    // データの削除を実行

    setWillData(null)
    setEditOpen(false)
  }

  const handleEditCancel = () => {
    setWillData(null)
    setEditOpen(false)
  }

  const deleteAction = (data: DataEntry) => (
    <SwipeAction onClick={() => handleDeleteAction(data)}>
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

  const handleDeleteAction = (data: DataEntry) => {
    setWillData(data)
    setDeleteOpen(true)
  }

  const handleDeleteOk = () => {
    // データの削除を実行

    setWillData(null)
    setDeleteOpen(false)
  }

  const handleDeleteCancel = () => {
    setWillData(null)
    setDeleteOpen(false)
  }

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
            type={ListType.IOS} // iOS風の「引っ張って止まる」挙動に
          >
            {data?.map((entry: DataEntry) => (
              <SwipeableListItem
                key={entry.id}
                leadingActions={editAction(entry)}
                trailingActions={deleteAction(entry)}
                threshold={0.1}
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
      <MessageDialog open={deleteOpen} onCancel={handleDeleteCancel} onOk={handleDeleteOk} willDeleteData={willData} />
      <EditDialog open={editOpen} onCancel={handleEditCancel} onOk={handleEditOk} willEditData={willData} />
    </Box>
  )
}