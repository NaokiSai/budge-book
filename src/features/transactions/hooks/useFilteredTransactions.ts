import { useMemo } from "react";
import dayjs from "dayjs";
import type { DataEntry } from "@src/type/type";

type UseFilteredTransactionsProps = {
  // ここに必要なプロパティを追加する場合は、型定義を行う
  data: DataEntry[] | null;
  selectedDate: dayjs.Dayjs | null;
};
export const useFilteredTransactions = (props: UseFilteredTransactionsProps) => {
  const { data, selectedDate } = props;

  // 1. 選択中の日付を "YYYY-MM-DD" 形式の文字列に変換
  const targetDateStr = useMemo(() => {
    const date = selectedDate || dayjs();
    return date.format("YYYY-MM-DD");
  }, [selectedDate]);

  // 2. dataCtx の中から、選択された日付と `entry.date` が一致するものだけを抽出
  const filteredEntries = useMemo(() => {
    if (!data || data.length === 0) return [];
    return data.filter((entry) => entry.date === targetDateStr);
  }, [data, targetDateStr]);

  // 3. 抽出したデータからその日の合計金額を算出
  const totalAmount = useMemo(() => {
    return filteredEntries.reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
  }, [filteredEntries]);

  // 4. カレンダーのハイライト用などに、データが存在する日（例: "DD" の数値）のリストを抽出
  const highlightedDays = useMemo(() => {
    if (!data || data.length === 0) return [];
    const days = data.map((entry) => dayjs(entry.date).date());
    return Array.from(new Set(days)); // 重複を除外
  }, [data]);

  return {
    filteredEntries, // 選択日に一致する明細リスト（BudgeListへ渡す用）
    totalAmount,     // 選択日の合計金額
    highlightedDays, // カレンダーのハイライト用配列
  };
};