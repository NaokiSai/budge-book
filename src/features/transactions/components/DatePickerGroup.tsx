import React, { useState, useEffect } from 'react';
import { Select, FormControl, Typography, Stack } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { StyledMenuItem } from './forms/StyledMenuItem';

type DatePickerGroupProps = {
  range?: 'year' | 'month' | 'date';
  setSelectedDate: (d: Dayjs) => void;
  initialDate?: Dayjs;
};

export const DatePickerGroup = (props: DatePickerGroupProps) => {
  const { range = 'date', setSelectedDate, initialDate } = props;

  const [year, setYear] = useState<number>(
    Number(initialDate?.format('YYYY') ?? dayjs().format('YYYY'))
  );
  const [month, setMonth] = useState<number>(
    Number(initialDate?.format('MM') ?? dayjs().format('MM'))
  );
  const [day, setDay] = useState<number>(
    Number(initialDate?.format('DD') ?? dayjs().format('DD'))
  );

  const [maxDays, setMaxDays] = useState<number>(
    initialDate ? initialDate.daysInMonth() : 31
  );

  // ★ ユーザーの操作時のみ親に通知する関数
  const notifyDateChange = (y: number, m: number, d: number) => {
    const newDate = dayjs(`${y}-${m.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`);
    setSelectedDate(newDate);
  };

  // useEffect は「月が変わったときの最大日数の計算」と「日のパッチ（存在しない日付の補正）」だけに専念させる
  // （※ここでは絶対に setSelectedDate を呼ばない！）
  useEffect(() => {
    const lastDayOfMonth = dayjs(`${year}-${month}-01`).endOf('month').date();
    setMaxDays(lastDayOfMonth);

    if (day > lastDayOfMonth) {
      setDay(lastDayOfMonth);
    }
  }, [year, month]);

  return (
    <Stack direction="row" spacing={1} sx={{ mx: 'auto', width: 'fit-content' }}>
      {/* 年 */}
      <FormControl>
        <Select
          value={year}
          onChange={(e) => {
            const newYear = Number(e.target.value);
            setYear(newYear);
            const lastDay = dayjs(`${newYear}-${month}-01`).endOf('month').date();
            const newDay = day > lastDay ? lastDay : day;
            if (day > lastDay) setDay(newDay);
            
            // ユーザーが変更したときだけ通知
            notifyDateChange(newYear, month, newDay);
          }}
          sx={{ width: 90 }}
          size="small">
          {[2024, 2025, 2026, 2027, 2028, 2029, 2030].map(y => (
            <StyledMenuItem key={y} value={y}>{y}</StyledMenuItem>
          ))}
        </Select>
      </FormControl>

      {/* 月 */}
      {(range === 'month' || range === 'date') &&
        <React.Fragment>
          <Typography variant="h6" sx={{ alignSelf: 'center' }}>/</Typography>
          <FormControl>
            <Select
              value={month}
              onChange={(e) => {
                const newMonth = Number(e.target.value);
                setMonth(newMonth);
                const lastDay = dayjs(`${year}-${newMonth}-01`).endOf('month').date();
                const newDay = day > lastDay ? lastDay : day;
                if (day > lastDay) setDay(newDay);

                // ユーザーが変更したときだけ通知
                notifyDateChange(year, newMonth, newDay);
              }}
              size="small"
              sx={{ width: 70 }}>
              {[...Array(12)].map((_, i) => (
                <StyledMenuItem key={i + 1} value={i + 1}>{i + 1}</StyledMenuItem>
              ))}
            </Select>
          </FormControl>
        </React.Fragment>}

      {/* 日 */}
      {range === 'date' &&
        <React.Fragment>
          <Typography variant="h6" sx={{ alignSelf: 'center' }}>/</Typography>
          <FormControl>
            <Select
              value={day}
              onChange={(e) => {
                const newDay = Number(e.target.value);
                setDay(newDay);

                // ユーザーが変更したときだけ通知
                notifyDateChange(year, month, newDay);
              }}
              size="small"
              sx={{ width: 70 }}
            >
              {[...Array(maxDays)].map((_, i) => (
                <StyledMenuItem key={i + 1} value={i + 1}>{i + 1}</StyledMenuItem>
              ))}
            </Select>
          </FormControl>
        </React.Fragment>}
    </Stack>
  );
};