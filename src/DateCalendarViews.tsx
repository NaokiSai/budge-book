import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Box } from '@mui/material';
export default function DateCalendarViews() {
  return (
    <Box sx={{ marginTop: -3 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar views={['day']} />
      </LocalizationProvider>
    </Box>
  );
}
