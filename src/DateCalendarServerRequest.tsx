import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickerDay, type PickerDayProps } from '@mui/x-date-pickers/PickerDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { useData } from './DataContext';
import GASClient from './gasClient';
import type { FetchDataResponse } from './type';

function getRandomNumber(min: number, max: number) {
  // eslint-disable-next-line no-restricted-properties -- used for interactive server simulation
  return Math.round(Math.random() * (max - min) + min);
}

/**
 * Mimic fetch with abort controller https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
 * ⚠️ No IE11 support
 */
function fakeFetch(date: Dayjs, { signal }: { signal: AbortSignal }) {
  return new Promise<{ daysToHighlight: number[] }>((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = date.daysInMonth();
      const daysToHighlight = [1, 2, 3].map(() => getRandomNumber(1, daysInMonth));

      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException('aborted', 'AbortError'));
    };
  });
}

// 今日の日付を入れる
const initialValue = dayjs(new Date());

function ServerDay(props: PickerDayProps & { highlightedDays?: number[] }) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      sx={{ '.MuiBadge-badge': { top: '80%', right: '50%', padding: '0', minWidth: '4px', fontSize: '12px' } }}
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
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);
  const [value, setValue] = React.useState<Dayjs | null>(null);
  const { updateData } = useData();

  const handleDateChange = (newValue: Dayjs | null) => {
    if (newValue && newValue.isValid()) {
      // 1. MUI(Dayjs)からJSのDateオブジェクトに変換
      const targetDate = newValue.toDate();

      // 2. 日本時間で YYYY-MM-DD 形式にする (sv-SEロケールを利用)
      const formattedDate = new Intl.DateTimeFormat('sv-SE', {
        timeZone: 'Asia/Tokyo'
      }).format(targetDate);

      // 3. フォーマットされた日付を使ってイベントを実行
      console.log("整形後の日付:", formattedDate); // 例: "2026-04-26"
      setValue(newValue);
      getData(formattedDate);
    }
  };
  const getData = async (date: string) => {
    updateData([]); // データをリセットしてから新しいデータを取得する
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.error('ログインが必要です');
      return;
    }
    const gasClient = new GASClient('https://script.google.com/macros/s/AKfycbxcgW3w06EKs7Hulkr6MaFvfEWNMd6la86WG1KXzrOm9izPv8X5fsUkZVfUiER3zAxA/exec');
    const response = await gasClient.fetchData(accessToken, date, 'detail');
    const dataTemp: FetchDataResponse = JSON.parse(JSON.stringify(response)); // これで response を JSON オブジェクトとして扱えるようになります
    // console.log('取得したデータ:', dataTemp);
    updateData(dataTemp.data.entries);
  }

  const fetchHighlightedDays = (date: Dayjs) => {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== 'AbortError') {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    fetchHighlightedDays(initialValue);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date: Dayjs) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={value}
        defaultValue={initialValue}
        loading={isLoading}
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
        onChange={handleDateChange}
      />
    </LocalizationProvider>
  );
}
