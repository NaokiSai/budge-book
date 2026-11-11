import { DateCalendar } from '@features/transactions/components/DateCalendar'
import { BudgeList } from '@features/transactions/components/BudgeList';
import { TotalAmount } from '@styledComponents/TotalAmount';
import React, { useRef, useEffect } from 'react';
import { useData } from '@cnxt/DataContext';
import dayjs, { Dayjs } from 'dayjs';
import { useFilteredTransactions } from '@src/features/transactions/hooks/useFilteredTransactions';

function Home() {
  const {
    dataCtx,
    setDataCtx,
    loadingCtx,
    selectedDateCtx,
    setSelectedDateCtx,
    handleUpdateData,
    handleDeleteData,
    setSelectedMonthCtx,
    selectedMonthCtx
  } = useData();

  const requestAbortController = useRef<AbortController | null>(null);

  useEffect(() => {
    // すでに日付や月がセットされている場合は、Home画面に戻ってきたときの強制上書き・再フェッチを防ぐ
    if (!selectedDateCtx) {
      setSelectedDateCtx(dayjs());
    }
    if (!selectedMonthCtx) { // ※selectedMonthCtxをDataContextから取得している場合
      const currentMonth = dayjs().startOf('month');
      setSelectedMonthCtx(currentMonth);
    }
  }, []);

  // コンテキストから得た dataCtx と selectedDateCtx を純粋な計算フックに渡す
  const {
    filteredEntries, // 選択日に一致する明細リスト（BudgeListへ渡す用）
    totalAmount,     // 選択日の合計金額
    highlightedDays, // カレンダーのハイライト用配列
  } = useFilteredTransactions({
    data: dataCtx,
    selectedDate: selectedDateCtx || null
  });

  const handleDateChange = async (newValue: Dayjs | null) => {
    if (newValue && newValue.isValid()) {
      if (requestAbortController.current) {
        requestAbortController.current.abort();
      }
      setSelectedDateCtx(newValue);
    }
  };

  const handleMonthChange = (month: Dayjs) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }
    setDataCtx([]);

    // 1. 渡された月の「1日」の Dayjs オブジェクトを作る
    const firstDayOfMonth = month.date(1);

    // 2. 選択日（selectedDateCtx）をその月の1日に更新する
    setSelectedDateCtx(firstDayOfMonth);

    // 3. 選択月（selectedMonthCtx）も更新する
    setSelectedMonthCtx(month);
  };

  return (
    <React.Fragment>
      <DateCalendar
        loading={loadingCtx}
        value={selectedDateCtx}
        onChange={handleDateChange}
        onMonthChange={handleMonthChange}
        highlightedDays={highlightedDays}
      />
      <TotalAmount loading={loadingCtx} amount={totalAmount} />
      <BudgeList
        entries={filteredEntries} // フィルタリングされた当日のデータ
        isLoading={loadingCtx}
        selectedDate={selectedDateCtx}
        setSelectedDate={setSelectedDateCtx}
        onUpdate={handleUpdateData}
        onDelete={handleDeleteData}
      />
    </React.Fragment>
  );
}

export default Home;