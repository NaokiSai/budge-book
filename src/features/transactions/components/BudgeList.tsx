import { Box, Stack } from "@mui/material"
import { SwipeableList, SwipeableListItem, Type as ListType } from "react-swipeable-list"
import type { DataEntry } from "@type/type"
import { BudgeListItemSkelton } from "./list/BudgeListItemSkelton"
import { BudgeListItem } from "./list/BudgeListItem"
import 'react-swipeable-list/dist/styles.css'; // スタイルを忘れずにインポート
import noDataUrl from '@assets/NoData.webp'
import { Image } from "@styledComponents/Image"
import '@css/BudgeList.css'
import { useState } from "react"
import { DeleteDialog } from "./DeleteDialog"
import { UpdateDialog } from "./UpdateDialog"
import type { Dayjs } from "dayjs"
import { List } from "@src/styledComponents/List"
import { EditButton } from "./actions/EditButton"
import { DeleteButton } from "./actions/DeleteButton"

export type BudgeListProps = {
  // ── データ・状態系 ──
  entries: DataEntry[];           // 旧: inputData / dataCtx （家計簿の明細リスト）
  isLoading: boolean;             // 旧: loadingCtx （ローディング中かどうか）
  selectedDate: Dayjs | undefined;

  // ── セッター・状態更新系 ──
  setSelectedDate: (date: Dayjs) => void;

  // ── アクション（ハンドラ）系 ──
  onUpdate: (payload: DataEntry) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
}

export const BudgeList = (props: BudgeListProps) => {
  const {
    entries,
    isLoading,
    onUpdate,
    onDelete
  } = props

  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [willData, setWillData] = useState<DataEntry | null>(null)

  const handleEditAction = (data: DataEntry) => {
    setWillData(data)
    setEditOpen(true)
  }

  const handleEditOk = async (payload: DataEntry) => {

    const result = await onUpdate(payload)

    if (result) {
      // データの更新を実行
      setWillData(null)
      setEditOpen(false)
    }

    return result
  }

  const handleEditCancel = () => {
    setWillData(null)
    setEditOpen(false)
  }

  const handleDeleteAction = (data: DataEntry) => {
    setWillData(data)
    setDeleteOpen(true)
  }

  const handleDeleteOk = async () => {

    const result = await onDelete(willData!.id as string)

    if (result) {
      // データの削除を実行
      setWillData(null)
      setDeleteOpen(false)
    }

    return result
  }

  const handleDeleteCancel = () => {
    setWillData(null)
    setDeleteOpen(false)
  }

  return (
    <Box sx={{ width: '100vw', flexGrow: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {isLoading ? (
        <List>
          {[...Array(3)].map((_, index) => (
            <BudgeListItemSkelton key={index} index={index} />
          ))}
        </List>
      ) : null}
      {entries.length > 0 ? (
        !isLoading &&
        <List sx={{ p: 0, pb: 2 }}>
          <SwipeableList
            fullSwipe={false}
            type={ListType.IOS} // iOS風の「引っ張って止まる」挙動に
          >
            {entries?.map((entry: DataEntry) => (
              <SwipeableListItem
                key={entry.id}
                leadingActions={EditButton({ data: entry, onEdit: handleEditAction })}
                trailingActions={DeleteButton({ data: entry, onDelete: handleDeleteAction })}
                threshold={0.1}
              >
                <BudgeListItem entry={entry} key={entry.id} />
              </SwipeableListItem>
            ))}
          </SwipeableList>
        </List>
      ) : (
        !isLoading &&
        <Stack direction='column' spacing={1} sx={{ width: 'fit-content', m: 'auto' }}>
          <Image src={noDataUrl} alt="No data" />
        </Stack>
      )}
      {willData !== null &&
        <DeleteDialog
          open={deleteOpen}
          onCancel={handleDeleteCancel}
          onOk={handleDeleteOk}
          willDeleteData={willData} />}
      {willData !== null &&
        <UpdateDialog
          open={editOpen}
          onCancel={handleEditCancel}
          onOk={handleEditOk}
          willEditData={willData}
        />}
    </Box>
  )
}