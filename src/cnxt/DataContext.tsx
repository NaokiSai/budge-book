import React, { createContext, useState, useContext, type ReactNode } from 'react';
import type { DataEntry } from '@type/type';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

// 1. コンテキストで扱うデータの型を定義
interface DataContextType {
  data: DataEntry[]; // ここでデータの型を定義
  updateData: (newData: DataEntry[]) => void; // データを更新する関数も定義
  loading: boolean; // ローディング状態を追加
  setLoading: (loading: boolean) => void; // ローディング状態を更新する関数も定義
  selectedDate: Dayjs | undefined
  setSelectedDate: (d: Dayjs) => void
    selectedMonth: Dayjs | undefined
  setSelectedMonth: (d: Dayjs) => void
}

// 2. 初期値は null でも良いが、型アサーションを使用して型を定義
const DataContext = createContext<DataContextType | undefined>(undefined);

// 3. プロバイダーのProps型定義
interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [data, setData] = useState<DataEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // ローディング状態を管理
  const [selectedDate, setSelectedDate] = useState<Dayjs | undefined>(dayjs())
  const [selectedMonth, setSelectedMonth] = useState<Dayjs | undefined>(dayjs())

  const updateData = (newData: DataEntry[]) => {
    setData(newData);
  };

  return (
    <DataContext.Provider value={{ data, updateData, loading, setLoading, selectedDate, setSelectedDate, selectedMonth, setSelectedMonth }}>
      {children}
    </DataContext.Provider>
  );
};

// 4. カスタムフック（undefinedチェックを含めるのが一般的）
export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};