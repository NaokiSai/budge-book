import React, { createContext, useState, useContext, type ReactNode, useEffect } from 'react';
import type { DataEntry } from '@type/type';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { getData, PostEditData, PostRemoveData, PostUpdateData } from '@service/DataService'; // ← 実際のデータ取得関数をインポート

// 1. コンテキストで扱うデータの型を定義
interface DataContextType {
  dataCtx: DataEntry[];
  setDataCtx: (newData: DataEntry[]) => void;
  loadingCtx: boolean;
  setLoadingCtx: (loading: boolean) => void;
  selectedDateCtx: Dayjs | undefined;
  setSelectedDateCtx: (d: Dayjs) => void;
  selectedMonthCtx: Dayjs | undefined;
  setSelectedMonthCtx: (d: Dayjs) => void;
  openTimeoutDialog: boolean; // タイムアウトダイアログの状態をContextで共有すると便利です
  setOpenTimeoutDialog: (open: boolean) => void;
  handleDeleteData: (id: string) => Promise<boolean>; // データ削除のインターフェース
  handleAddData: (payload: DataEntry) => Promise<boolean>; // データ追加のインターフェース
  handleUpdateData: (payload: DataEntry) => Promise<boolean>; // データ更新のインターフェース
  resetContext: () => void;
}

// 2. 初期値は undefined
const DataContext = createContext<DataContextType | undefined>(undefined);

// 3. プロバイダーのProps型定義
interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [dataCtx, setDataCtx] = useState<DataEntry[]>([]);
  const [loadingCtx, setLoadingCtx] = useState<boolean>(false);
  const [selectedDateCtx, setSelectedDateCtx] = useState<Dayjs | undefined>(dayjs());
  const [selectedMonthCtx, setSelectedMonthCtx] = useState<Dayjs | undefined>(dayjs());
  const [openTimeoutDialog, setOpenTimeoutDialog] = useState<boolean>(false); // タイムアウト用

  // 4. 月が変わったときに自動でGASからフェッチする処理
  useEffect(() => {
    if (!selectedMonthCtx) return;

    const monthStr = selectedMonthCtx.format('YYYY-MM');

    const fetchMonthData = async (targetMonth: string) => {
      setLoadingCtx(true);
      try {
        const response = await getData(targetMonth);

        // タイムアウト（HTTP 419など）のハンドリング
        if (response?.status === 'error' && response.httpCode === 419) {
          setOpenTimeoutDialog(true);
          return;
        }

        if (response !== null && response.data !== undefined && response.data.period === targetMonth) {
          // 取得したエントリーをコンテキストのキャッシュに保存
          setDataCtx(response.data.entries);

          // 日にちを更新しておく
          const firstDayOfMonth = selectedMonthCtx.date(1);
          setSelectedDateCtx(firstDayOfMonth);
        }
      } catch (error) {
        // エラーハンドリング
      } finally {
        setLoadingCtx(false);
      }
    };

    fetchMonthData(monthStr);

  }, [selectedMonthCtx]);

  // データ削除のインターフェース
  const handleDeleteData = async (id: string): Promise<boolean> => {
    setLoadingCtx(true);
    try {
      // 1. 現在手元にある dataCtx（キャッシュ）から、対象の行データを id で探す
      const targetEntry = dataCtx.find((item) => item.id === id);

      if (!targetEntry) {
        console.error("削除対象のデータが見つかりませんでした:", id);
        return false;
      }

      const response = await PostRemoveData(JSON.stringify(targetEntry));

      // タイムアウト（419エラー等）のハンドリング
      if (response?.status === 'error' && response.httpCode === 419) {
        setOpenTimeoutDialog(true);
        return false;
      }

      if (response?.status === 'success') {
        // 3. 削除が成功したら、手元のコンテキストのステートからも除外して即時反映
        setDataCtx((prevData) => prevData.filter((item) => item.id !== id));
        return true;
      }

      return false;
    } catch (error) {
      console.error("データの削除に失敗しました:", error);
      return false;
    } finally {
      setLoadingCtx(false);
    }
  };

  // 新規追加用
  const handleAddData = async (payload: DataEntry): Promise<boolean> => {
    setLoadingCtx(true);
    try {
      const response = await PostEditData(JSON.stringify(payload));

      if (response?.status === "error" && response.httpCode === 419) {
        setOpenTimeoutDialog(true);
        return false;
      }

      if (response?.status === 'success') {
        setDataCtx((prevData) => [payload, ...prevData]); // リストに追加
        // showSnackbar("データを追加しました");
        return true;
      }
      return false;
    } catch (error) {
      console.error("追加失敗:", error);
      return false;
    } finally {
      setLoadingCtx(false);
    }
  };

  // 編集（更新）用
  const handleUpdateData = async (payload: DataEntry): Promise<boolean> => {
    setLoadingCtx(true);
    try {
      // ★ 更新用のAPIを叩く
      const response = await PostUpdateData(JSON.stringify(payload));

      if (response?.status === "error" && response.httpCode === 419) {
        setOpenTimeoutDialog(true);
        return false;
      }

      if (response?.status === 'success') {
        setDataCtx((prevData) =>
          prevData.map((item) => (item.id === payload.id ? payload : item)) // 該当データを置き換え
        );
        // showSnackbar("データを更新しました");
        return true;
      }
      return false;
    } catch (error) {
      console.error("更新失敗:", error);
      return false;
    } finally {
      setLoadingCtx(false);
    }
  };

  // ★ すべての状態を安全に初期値に戻すリセット関数
  const resetContext = () => {
    setDataCtx([]);
    setLoadingCtx(false);
    setSelectedDateCtx(dayjs());
    setSelectedMonthCtx(dayjs());
    setOpenTimeoutDialog(false);
  };

  return (
    <DataContext.Provider
      value={{
        dataCtx,
        setDataCtx,
        loadingCtx,
        setLoadingCtx,
        selectedDateCtx,
        setSelectedDateCtx,
        selectedMonthCtx,
        setSelectedMonthCtx,
        openTimeoutDialog,
        setOpenTimeoutDialog,
        handleDeleteData,
        handleAddData,
        handleUpdateData,
        resetContext
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// 5. カスタムフック
export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};