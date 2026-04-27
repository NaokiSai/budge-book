import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useData } from '../DataContext';

type Props = {
  // ここに必要なpropsを定義してください
  setSelectedDate: (date: string) => void; // 例: 親コンポーネントから日付を受け取るための関数
};
export const SelectYYYYMM = (props: Props) => {
  const { updateData } = useData();
  const [yyyy, setYyyy] = React.useState('');
  const [mm, setMm] = React.useState('');

  React.useEffect(() => {
    // 今日の日付から年と月を取得して、セレクトボックスの初期値に設定
    const today = new Date();
    const currentYear = today.getFullYear().toString();
    const currentMonth = (today.getMonth() + 1).toString();
    setYyyy(currentYear);
    setMm(currentMonth);

    props.setSelectedDate(`${currentYear}-${currentMonth.padStart(2, '0')}`); // 例: 2024-06-01 の形式で親コンポーネントに日付を渡す

    // GASからcurrentYearとcurrentMonthを指定してデータを取得する

  }, []);

  const YYYY = {
    2020: '2020',
    2021: '2021',
    2022: '2022',
    2023: '2023',
    2024: '2024',
    2025: '2025',
    2026: '2026'
  };
  const MM = {
    1: '01',
    2: '02',
    3: '03',
    4: '04',
    5: '05',
    6: '06',
    7: '07',
    8: '08',
    9: '09',
    10: '10',
    11: '11',
    12: '12'
  };

  const handleChangeYyyy = (event: SelectChangeEvent) => {
    setYyyy(event.target.value);
  };
  const handleChangeMm = (event: SelectChangeEvent) => {
    setMm(event.target.value);
  };
  return (
    <Stack direction="row" spacing={1} sx={{ mt: 2, mb: 1, mx: 'auto', width: 'fit-content' }}>
      <Select
        sx={{ width: 100 }}
        size="small"
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={yyyy}
        onChange={handleChangeYyyy}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {Object.entries(YYYY).map(([key, value]) => (
          <MenuItem key={key} value={key}>
            {value}
          </MenuItem>
        ))}
      </Select>
      <Typography variant="h6" sx={{ alignSelf: 'center' }}>
        /
      </Typography>
      <Select
        sx={{ width: 80 }}
        size="small"
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={mm}
        onChange={handleChangeMm}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {Object.entries(MM).map(([key, value]) => (
          <MenuItem key={key} value={key}>
            {value}
          </MenuItem>
        ))}
      </Select>
      <Button
        variant="contained"
        size="small"
        sx={{ ml: 2 }}
        onClick={() => {
          updateData([]);
          props.setSelectedDate(`${yyyy}-${mm.padStart(2, '0')}`)
        }}>
        Submit
      </Button>
    </Stack>
  );
}
