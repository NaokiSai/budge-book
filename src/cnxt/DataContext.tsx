import React, { createContext, useState, useContext, type ReactNode } from 'react';
import type { DataEntry } from '@type/type';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

// 1. コンテキストで扱うデータの型を定義
interface DataContextType {
  dataCtx: DataEntry[]; // ここでデータの型を定義
  setDataCtx: (newData: DataEntry[]) => void; // データを更新する関数も定義
  loadingCtx: boolean; // ローディング状態を追加
  setLoadingCtx: (loading: boolean) => void; // ローディング状態を更新する関数も定義
  selectedDateCtx: Dayjs | undefined
  setSelectedDateCtx: (d: Dayjs) => void
  selectedMonthCtx: Dayjs | undefined
  setSelectedMonthCtx: (d: Dayjs) => void
}

// 2. 初期値は null でも良いが、型アサーションを使用して型を定義
const DataContext = createContext<DataContextType | undefined>(undefined);

// 3. プロバイダーのProps型定義
interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [dataCtx, setDataCtx] = useState<DataEntry[]>([]);
  const [loadingCtx, setLoadingCtx] = useState<boolean>(false); // ローディング状態を管理
  const [selectedDateCtx, setSelectedDateCtx] = useState<Dayjs | undefined>(dayjs())
  const [selectedMonthCtx, setSelectedMonthCtx] = useState<Dayjs | undefined>(dayjs())

  // const updateData = (newData: DataEntry[]) => {
  //   setData(newData);
  // };

  return (
    <DataContext.Provider value={{ dataCtx, setDataCtx, loadingCtx, setLoadingCtx, selectedDateCtx, setSelectedDateCtx, selectedMonthCtx, setSelectedMonthCtx }}>
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