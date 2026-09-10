import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickerDay, type PickerDayProps } from '@mui/x-date-pickers/PickerDay';
import { DateCalendar, type DateCalendarProps } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { useLayoutEffect, useRef, useState } from 'react';

const initialValue = dayjs(new Date());

function ServerDay(props: PickerDayProps & { highlightedDays?: number[] }) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      sx={{ '.MuiBadge-badge': { top: '80%', right: '50%', padding: '0', minWidth: '4px', fontSize: '12px', zIndex: -1, color: '#D86C40' } }}
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? '●' : undefined}
    >
      <PickerDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

type DateCalendarServerRequestProps = Pick<DateCalendarProps, "value" | "onMonthChange" | "onChange"> & {
  highlightedDays: number[]
  loading: boolean
}

// 
/**
 * DateCalendarServerRequest
 * @param props 
 * @returns 
 */
export const DateCalendarServerRequest = (props: DateCalendarServerRequestProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [boxHeight, setBoxHeight] = useState<number | string>('auto');

  // 1行（ヘッダー・日付）あたりの推定高さ（px）
  // ※デザインやPaddingに応じて数値を調整してください
  const ROW_HEIGHT = 40;

  // DOM描画後・月変更時・ローディング状態変更時に aria-rowindex をチェックして高さを計算
  useLayoutEffect(() => {
    if (props.loading || !containerRef.current) return;

    // DOM描画の確定を確実にするため requestAnimationFrame を使用
    const timer = requestAnimationFrame(() => {
      if (!containerRef.current) return;

      // aria-rowindex属性を持つ要素を取得
      const dayElements = containerRef.current.querySelectorAll('[aria-rowindex]');

      if (dayElements.length > 0) {
        const indexes = Array.from(dayElements)
          .map((el) => parseInt(el.getAttribute('aria-rowindex') || '0', 10))
          .filter((num) => !isNaN(num));

        const maxRowIndex = Math.max(...indexes);

        // aria-rowindex の最大行数に応じて高さを計算
        const calculatedHeight = maxRowIndex * ROW_HEIGHT;
        setBoxHeight(calculatedHeight);
      }
    });

    return () => cancelAnimationFrame(timer);
  }, [props.value, props.loading]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        ref={containerRef}
        value={props.value}
        defaultValue={initialValue}
        onMonthChange={(newMonth) => {
          if (props.onMonthChange) {
            props.onMonthChange(newMonth);
          }
        }}
        // loading={props.loading}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays: props.highlightedDays,
          } as any,
        }}
        sx={() => ({
          height: 'fit-content',
          '& .MuiPickersSlideTransition-root': {
            minHeight: `${boxHeight}px`,
            height: `${boxHeight}px`,
            transition: 'height 0.2s ease', // 月切り替え時のスムーズなアニメーション
          },
          minHeight: props.loading ? 'unset' : 'fit-content',
          ' .Mui-selected': { backgroundColor: '#395D43' },
          ' .MuiPickersDay-root.Mui-selected': { zIndex: -1 },
        })}
        onChange={props.onChange}
      />
      {/* </Box> */}
    </LocalizationProvider>
  );
};