import dayjs, { Dayjs } from 'dayjs';
import React, { createContext, useState, useContext, type ReactNode } from 'react';

// type modeType = 'home' | 'add' | 'analytics' | 'setting'
// 1. コンテキストで扱うデータの型を定義
interface AppContextType {
  userImage: string;
  updateUserImage: (newImageUrl: string) => void;
  selectedDate: Dayjs | undefined
  setSelectedDate: (d: Dayjs) => void
  selectedMonth: Dayjs | undefined
  setSelectedMonth: (d: Dayjs) => void
}

// 2. 初期値は null でも良いが、型アサーションを使用して型を定義
const AppContext = createContext<AppContextType | undefined>(undefined);

// 3. プロバイダーのProps型定義
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [userImage, setUserImage] = useState<string>("https://via.placeholder.com/150");
  const [selectedDate, setSelectedDate] = useState<Dayjs | undefined>(dayjs())
  const [selectedMonth, setSelectedMonth] = useState<Dayjs | undefined>(dayjs())

  const updateUserImage = (newImageUrl: string) => {
    setUserImage(newImageUrl);
  };

  return (
    <AppContext.Provider value={{ userImage, updateUserImage, selectedDate, setSelectedDate, selectedMonth,setSelectedMonth }}>
      {children}
    </AppContext.Provider>
  );
};

// 4. カスタムフック（undefinedチェックを含めるのが一般的）
export const useUser = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};