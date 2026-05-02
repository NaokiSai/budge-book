import { DateCalendarServerRequest } from '@components/DateCalendarServerRequest'
import { BudgeList } from '@components/BudgeList';
import { TotalAmount } from '@components/TotalAmount';
import React, { useEffect, useRef, useState } from 'react';
import { useData } from '@cnxt/DataContext';
import { getData } from '@service/DataService';
import { Dayjs } from 'dayjs';
import { TimeoutDialog } from '@components/TimeoutDialog';

function Home() {
  const { updateData, setLoading, loading, selectedDate, setSelectedDate } = useData();
  const requestAbortController = useRef<AbortController | null>(null);
  const [highlightedDays, setHighlightedDays] = useState<number[]>([]);
  // const [value, setValue] = useState<Dayjs | null>(null);
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [openTimeoutDialog, setOpenTimeoutDialog] = useState<boolean>(false)

  const getHomeData = async (date: string) => {
    // 1. 開始時にローディングをON
    setLoading(true);

    try {
      const dataTemp = await getData(date); // これも必要に応じて呼び出してください

      if (dataTemp?.status === 'error' && dataTemp.httpCode === 419) {
        setOpenTimeoutDialog(true)
      }

      // 2. 取得したデータが存在し、かつ条件に一致する場合のみ更新を実行
      if (dataTemp?.data?.period === date) {
        // 取得した生データを入れる
        updateData(dataTemp.data.entries);
        // 生データから計算した合計金額を入れる
        const totalAmountTemp = dataTemp.data.entries?.reduce((sum, entry) => sum + Number(entry.amount), 0);
        setTotalAmount(totalAmountTemp)
        // お金を使った日を入れる
        setHighlightedDays(dataTemp.data.uniqueDates.map((d) => parseInt(d)));
      }
    } catch (error) {
      console.error('データ取得に失敗しました:', error);
      // 必要ならここでユーザーにトースト通知などを出す
    } finally {
      // 3. 成功・失敗に関わらず、最後に必ずローディングをOFF
      setLoading(false);
    }
  };

  // useeffectでデータを取得する
  useEffect(() => {
    let date: string = '';
    if (selectedDate === null || selectedDate === undefined) {
      // 日付計算（sv-SE フォーマットは YYYY-MM-DD になる）
      date = new Intl.DateTimeFormat('sv-SE', {
        timeZone: 'Asia/Tokyo'
      }).format(new Date());
    } else {
      // 1. MUI(Dayjs)からJSのDateオブジェクトに変換
      const targetDate = selectedDate.toDate();

      // 2. 日本時間で YYYY-MM-DD 形式にする (sv-SEロケールを利用)
      date = new Intl.DateTimeFormat('sv-SE', {
        timeZone: 'Asia/Tokyo'
      }).format(targetDate);
    }

    // 日付を指定してデータを取得する
    getHomeData(date);
  }, [selectedDate]);

  const handleDateChange = async (newValue: Dayjs | null) => {
    if (newValue && newValue.isValid()) {
      updateData([]);
      // setValue(newValue);
      setSelectedDate(newValue)
    }
  };

  const handleMonthChange = (date: Dayjs) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }
    setHighlightedDays([]);
    updateData([]);
    // setValue(date)
    setSelectedDate(date)
  };

  return (
    <React.Fragment>
      <DateCalendarServerRequest
        loading={loading}
        value={selectedDate}
        onChange={handleDateChange}
        onMonthChange={handleMonthChange}
        highlightedDays={highlightedDays} />
      <TotalAmount loading={loading} amount={totalAmount} />
      <BudgeList setDate={setSelectedDate} />
      <TimeoutDialog open={openTimeoutDialog} onClose={() => setOpenTimeoutDialog(false)} />
    </React.Fragment>
  )
}

export default Home
