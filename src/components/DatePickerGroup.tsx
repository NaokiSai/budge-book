import React, { useState, useEffect } from 'react';
import { Select, FormControl, Typography, Stack } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { MenuItem } from '@src/styledComponents/MenuItem';

type DatePickerGroupProps = {
  // ここに必要なpropsを定義してください
  range?: 'year' | 'month' | 'date'
  // setSelectedDate: (date: string) => void; // 例: 親コンポーネントから日付を受け取るための関数
  setSelectedDate: (d: Dayjs) => void
  initialDate?: Dayjs
};

/**
 * DatePickerGroup
 * @param props 
 * @returns 
 */
export const DatePickerGroup = (props: DatePickerGroupProps) => {
  const { range = 'date', setSelectedDate, initialDate } = props

  // 2. 分割して数値に変換
  // const parts = initialDateStr !== undefined ? initialDateStr.split('-') : '';
  // const initialYear = initialDateStr !== undefined ? Number(parts[0]) : dayjs().year();  // 2024
  // const initialMonth = initialDateStr !== undefined ? Number(parts[1]) : dayjs().month() + 1; // 6
  // const initialDay = initialDateStr !== undefined ? Number(parts[2]) : dayjs().date();   // 1

  // const [year, setYear] = useState<number>(Number((initialDate as Dayjs).format('YYYY')));
  // const [month, setMonth] = useState<number>(Number((initialDate as Dayjs).format('MM'))); // 1-12
  // const [day, setDay] = useState<number>(Number(initialDate?.format('DD')));
  // const [maxDays, setMaxDays] = useState<Number>(31);

  // initialDateがDayjs型であることを前提としますが、
  // undefinedなどの可能性も考慮してオプショナルチェイニング(?.)を使います。

  const [year, setYear] = useState<number>(
    Number(initialDate?.format('YYYY') ?? dayjs().format('YYYY'))
  );

  const [month, setMonth] = useState<number>(
    Number(initialDate?.format('MM') ?? dayjs().format('MM'))
  );

  const [day, setDay] = useState<number>(
    Number(initialDate?.format('DD') ?? dayjs().format('DD'))
  );

  // 型は小文字の number。初期値は initialDate に基づいて計算すると正確です。
  const [maxDays, setMaxDays] = useState<number>(
    initialDate ? initialDate.daysInMonth() : 31
  );

  // 年・月が変更されたら、その月の最大日数を再計算する
  useEffect(() => {
    const lastDayOfMonth = dayjs(`${year}-${month}-01`).endOf('month').date();
    setMaxDays(lastDayOfMonth);

    // もし現在の「日」が、新しい月の最大日数を超えていたら補正する
    // 例: 3月31日の状態で月を2月に変えたら、28日（または29日）に落とす
    if (day > lastDayOfMonth) {
      setDay(lastDayOfMonth);
    }

    setSelectedDate(dayjs(`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`))
    // range === 'year' && setSelectedDate(`${year}`); // 例: 2024 の形式で親コンポーネントに日付を渡す
    // range === 'month' && setSelectedDate(`${year}-${month.toString().padStart(2, '0')}`); // 例: 2024-06 の形式で親コンポーネントに日付を渡す
    // range === 'date' && setSelectedDate(`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`); // 例: 2024-06-01 の形式で親コンポーネントに日付を渡す
  }, [year, month, day]);

  return (
    <Stack direction="row" spacing={1} sx={{ mx: 'auto', width: 'fit-content' }}>
      {/* 年 */}
      <FormControl>
        <Select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          sx={{ width: 90 }}
          size="small">
          {[2024, 2025, 2026, 2027, 2028, 2029, 2030].map(y => <MenuItem key={y} value={y}>{y}</MenuItem>)}
        </Select>
      </FormControl>
      {/* 月 */}
      {(range === 'month' || range === 'date') &&
        <React.Fragment>
          <Typography variant="h6" sx={{ alignSelf: 'center' }}>
            /
          </Typography>
          <FormControl>
            <Select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              size="small"
              sx={{ width: 70 }}>
              {[...Array(12)].map((_, i) => <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>)}
            </Select>
          </FormControl>
        </React.Fragment>}
      {/* 日 */}
      {range === 'date' &&
        <React.Fragment>
          <Typography variant="h6" sx={{ alignSelf: 'center' }}>
            /
          </Typography>
          <FormControl>
            <Select
              value={day}
              onChange={(e) => setDay(Number(e.target.value))}
              size="small"
              sx={{ width: 70 }}
            >
              {[...Array(maxDays)].map((_, i) => <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>)}
            </Select>
          </FormControl>
        </React.Fragment>}
    </Stack>
  );
};