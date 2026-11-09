// src/features/transactions/components/EditButton.tsx (パスは一例です)
import { Stack, styled, Typography } from "@mui/material"
import { SwipeAction } from "react-swipeable-list"
import type { DataEntry } from "@type/type"
import 'react-swipeable-list/dist/styles.css';
import '@css/BudgeList.css'
import EditIcon from '@mui/icons-material/Edit';

const StyledStack = styled(Stack)({
  backgroundColor: 'green',
  display: 'flex',
  alignItems: 'center',
  padding: '3px 0px',
  maxWidth: 64,
  minWidth: 64,
  height: '100%',
  color: 'white',
  cursor: 'pointer',
  justifyContent: 'center',
  marginRight: 1
})

interface EditButtonProps {
  data: DataEntry;
  onEdit: (data: DataEntry) => void; // ★ 外からハンドラを注入できるようにする
}

export const EditButton = ({ data, onEdit }: EditButtonProps) => (
  <SwipeAction onClick={() => onEdit(data)}>
    <StyledStack>
      <EditIcon />
      <Typography variant="button" sx={{ fontSize: 12 }}>編集</Typography>
    </StyledStack>
  </SwipeAction>
);