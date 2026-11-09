import { Stack, styled, Typography } from "@mui/material"
import { SwipeAction } from "react-swipeable-list"
import type { DataEntry } from "@type/type"
import DeleteIcon from '@mui/icons-material/Delete';
import 'react-swipeable-list/dist/styles.css'; // スタイルを忘れずにインポート
import '@css/BudgeList.css'

const StyledStack = styled(Stack)({
  backgroundColor: '#ea5532',
  display: 'flex',
  alignItems: 'center',
  padding: '3px 0px',
  maxWidth: 64,
  minWidth: 64,
  height: '100%',
  color: 'white',
  cursor: 'pointer',
  justifyContent: 'center',
  marginLeft: 1
})

interface DeleteButtonProps {
  data: DataEntry;
  onDelete: (data: DataEntry) => void; // ★ 外からハンドラを注入できるようにする
}

export const DeleteButton = ({ data, onDelete}: DeleteButtonProps) => (
  <SwipeAction onClick={() => onDelete(data)}>
    <StyledStack>
      <DeleteIcon />
      <Typography variant="button" sx={{ fontSize: 12 }}>削除</Typography>
    </StyledStack>
  </SwipeAction>
);
