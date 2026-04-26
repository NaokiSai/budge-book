import React, { createContext, useState, useContext, type ReactNode } from 'react';

// 1. コンテキストで扱うデータの型を定義
interface UserContextType {
  userImage: string;
  updateUserImage: (newImageUrl: string) => void;
}

// 2. 初期値は null でも良いが、型アサーションを使用して型を定義
const UserContext = createContext<UserContextType | undefined>(undefined);

// 3. プロバイダーのProps型定義
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userImage, setUserImage] = useState<string>("https://via.placeholder.com/150");

  const updateUserImage = (newImageUrl: string) => {
    setUserImage(newImageUrl);
  };

  return (
    <UserContext.Provider value={{ userImage, updateUserImage }}>
      {children}
    </UserContext.Provider>
  );
};

// 4. カスタムフック（undefinedチェックを含めるのが一般的）
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};