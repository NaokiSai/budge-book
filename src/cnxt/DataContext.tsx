import React, { createContext, useState, useContext, type ReactNode, useEffect, useRef } from 'react';
import type { DataEntry } from '@type/type';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { getData, PostEditData, PostRemoveData, PostUpdateData } from '@service/DataService';

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
  openTimeoutDialog: boolean;
  setOpenTimeoutDialog: (open: boolean) => void;
  handleDeleteData: (id: string) => Promise<boolean>;
  handleAddData: (payload: DataEntry) => Promise<boolean>;
  handleUpdateData: (payload: DataEntry) => Promise<boolean>;
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
  const [openTimeoutDialog, setOpenTimeoutDialog] = useState<boolean>(false);

  // ★ 初回マウント判定用の useRef（再レンダリングを発生させずに値を保持）
  const isInitialMount = useRef(true);

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

          // ★ 初回マウント時はスキップし、2回目以降（ユーザーが月を変更したとき）だけ実行する
          if (isInitialMount.current) {
            isInitialMount.current = false; // 初回フラグをオフにする
          } else {
            // 日にちを月の初日に更新しておく
            const firstDayOfMonth = selectedMonthCtx.date(1);
            setSelectedDateCtx(firstDayOfMonth);
          }
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
      const targetEntry = dataCtx.find((item) => item.id === id);

      if (!targetEntry) {
        console.error("削除対象のデータが見つかりませんでした:", id);
        return false;
      }

      const response = await PostRemoveData(JSON.stringify(targetEntry));

      if (response?.status === 'error' && response.httpCode === 419) {
        setOpenTimeoutDialog(true);
        return false;
      }

      if (response?.status === 'success') {
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
        setDataCtx((prevData) => [payload, ...prevData]);
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
      const response = await PostUpdateData(JSON.stringify(payload));

      if (response?.status === "error" && response.httpCode === 419) {
        setOpenTimeoutDialog(true);
        return false;
      }

      if (response?.status === 'success') {
        setDataCtx((prevData) =>
          prevData.map((item) => (item.id === payload.id ? payload : item))
        );
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

  // すべての状態を安全に初期値に戻すリセット関数
  const resetContext = () => {
    setDataCtx([]);
    setLoadingCtx(false);
    setSelectedDateCtx(dayjs());
    setSelectedMonthCtx(dayjs());
    setOpenTimeoutDialog(false);
    isInitialMount.current = true; // リセット時は初回フラグも戻す
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