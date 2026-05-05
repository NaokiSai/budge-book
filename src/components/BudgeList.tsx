import { Box, Stack, Typography } from "@mui/material"
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
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react"
import { MessageDialog } from "./MessageDialog"
import { UpdateDialog } from "./UpdateDialog"
import type { Dayjs } from "dayjs"
import { List } from "@src/styledComponents/List"
import dayjs from "dayjs"

type BudgeListProps = {
  setSelectedDate: (date: Dayjs | undefined) => void
  setOpenTimeoutDialog: (flag: boolean) => void
}

export const BudgeList = (props: BudgeListProps) => {
  const { setSelectedDate, setOpenTimeoutDialog } = props
  const { dataCtx, loadingCtx, selectedDateCtx } = useData();

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

    // 日時を再設定して、再読み込みをする
    setSelectedDate(dayjs(selectedDateCtx))
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

    // 日時を再設定して、再読み込みをする
    setSelectedDate(dayjs(selectedDateCtx))
  }

  const handleDeleteCancel = () => {
    setWillData(null)
    setDeleteOpen(false)
  }

  return (
    <Box sx={{ width: 'calc(100% - 32px)', flexGrow: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', px: 2 }}>
      {loadingCtx ? (
        <List>
          {[...Array(3)].map((_, index) => (
            <BudgeListItemSkelton key={index} index={index} />
          ))}
        </List>
      ) : null}
      {dataCtx.length > 0 ? (
        !loadingCtx &&
        <List sx={{ p: 0 }}>
          <SwipeableList
            fullSwipe={false}
            type={ListType.IOS} // iOS風の「引っ張って止まる」挙動に
          >
            {dataCtx?.map((entry: DataEntry) => (
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
        !loadingCtx &&
        <Stack direction='column' spacing={1} sx={{ width: 'fit-content', m: 'auto' }}>
          <Image src={noDataUrl} alt="No data" />
        </Stack>
      )}
      {willData !== null &&
        <MessageDialog
          open={deleteOpen}
          onCancel={handleDeleteCancel}
          onOk={handleDeleteOk}
          willDeleteData={willData}
          setOpenTimeoutDialog={setOpenTimeoutDialog} />}
      {willData !== null &&
        <UpdateDialog
          open={editOpen}
          onCancel={handleEditCancel}
          onOk={handleEditOk}
          willEditData={willData}
          setSelectedDate={setSelectedDate}
          setOpenTimeoutDialog={setOpenTimeoutDialog} />}
    </Box>
  )
}