import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickerDay, type PickerDayProps } from '@mui/x-date-pickers/PickerDay';
import { DateCalendar, type DateCalendarProps } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';

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

/**
 * DateCalendarServerRequest
 * @param props 
 * @returns 
 */
export const DateCalendarServerRequest = (props: DateCalendarServerRequestProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={props.value}
        defaultValue={initialValue}
        onMonthChange={props.onMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            // ここを修正：オブジェクト形式で highlightedDays を渡す
            highlightedDays: props.highlightedDays,
          } as any,
        }}
        sx={() => ({
          // maxHeight: props.loading ? 'unset' : 'fit-content',
          ' .Mui-selected': { backgroundColor: '#395D43' },
          ' .MuiPickerDay-root.Mui-selected': { zIndex: -1 },
          // ' .MuiPickersCalendarHeader-root': {
          //   maxHeight: 20,
          //   minHeight: 20
          // }
        })}
        onChange={props.onChange}
      />
    </LocalizationProvider>
  );
}
