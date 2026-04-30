import * as React from 'react';
import Stack from '@mui/material/Stack';
import { useData } from '../DataContext';
import { DatePickerGroup } from './DatePickerGroup'
import { Button } from '../styledComponents/Button';

type Props = {
  // ここに必要なpropsを定義してください
  setSelectedDate: (date: string) => void; // 例: 親コンポーネントから日付を受け取るための関数
};
export const SelectYYYYMM = (props: Props) => {
  const { updateData } = useData();
  const [selectedDateTemp, setSelectedDateTemp] = React.useState('')

  return (
    <Stack direction="row" spacing={1} sx={{ mt: 2, mb: 1, mx: 'auto', width: 'fit-content' }}>
      <DatePickerGroup range='month' setSelectedDate={setSelectedDateTemp} />
      <Button
        variant="contained"
        size="small"
        sx={{ px: 1, height: '100%', ml: 2 }}
        onClick={() => {
          updateData([]);
          props.setSelectedDate(selectedDateTemp)
        }}>
        表示する
      </Button>
    </Stack>
  );
}
