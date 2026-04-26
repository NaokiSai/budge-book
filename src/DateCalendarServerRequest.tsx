import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickerDay, type PickerDayProps } from '@mui/x-date-pickers/PickerDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { useData } from './DataContext';
import { getDayData } from './DataService';

const initialValue = dayjs(new Date());

function ServerDay(props: PickerDayProps & { highlightedDays?: number[] }) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      sx={{ '.MuiBadge-badge': { top: '80%', right: '50%', padding: '0', minWidth: '4px', fontSize: '12px', zIndex: -1 } }}
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? '●' : undefined}
    >
      <PickerDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

export default function DateCalendarServerRequest() {
  const requestAbortController = React.useRef<AbortController | null>(null);
  const [highlightedDays, setHighlightedDays] = React.useState<number[]>([]);
  const [value, setValue] = React.useState<Dayjs | null>(null);
  const { updateData, setLoading } = useData();

  const getData = async (date: string) => {
    // 1. 開始時にローディングをON
    setLoading(true);

    try {
      const dataTemp = await getDayData(date); // これも必要に応じて呼び出してください
      dataTemp !== null && dataTemp.data !== undefined && updateData(dataTemp.data.entries);
      dataTemp !== null && dataTemp.data !== undefined && setHighlightedDays(dataTemp.data.uniqueDates.map((d) => parseInt(d)));

    } catch (error) {
      console.error('データ取得に失敗しました:', error);
      // 必要ならここでユーザーにトースト通知などを出す
    } finally {
      // 3. 成功・失敗に関わらず、最後に必ずローディングをOFF
      setLoading(false);
    }
  };

  // useeffectでデータを取得する
  React.useEffect(() => {
    // 日付計算（sv-SE フォーマットは YYYY-MM-DD になる）
    const date = new Intl.DateTimeFormat('sv-SE', {
      timeZone: 'Asia/Tokyo'
    }).format(new Date());

    getData(date);
  }, []);

  const handleDateChange = async (newValue: Dayjs | null) => {
    if (newValue && newValue.isValid()) {
      // 1. MUI(Dayjs)からJSのDateオブジェクトに変換
      const targetDate = newValue.toDate();

      // 2. 日本時間で YYYY-MM-DD 形式にする (sv-SEロケールを利用)
      const formattedDate = new Intl.DateTimeFormat('sv-SE', {
        timeZone: 'Asia/Tokyo'
      }).format(targetDate);

      // 3. フォーマットされた日付を使ってイベントを実行
      setValue(newValue);

      getData(formattedDate);
    }
  };

  const handleMonthChange = (date: Dayjs) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }
    setHighlightedDays([]);
    getData(date.format('YYYY-MM-DD'));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={value}
        defaultValue={initialValue}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays,
          } as any,
        }}
        sx={{ '.MuiPickerDay-root.Mui-selected': { zIndex: -1 } }}
        onChange={handleDateChange}
      />
    </LocalizationProvider>
  );
}
