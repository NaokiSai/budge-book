import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAllImages } from './../service/DataService'; // まとめて取得するAPI呼び出し

interface IconContextType {
  icons: Record<string, string>;
  loading: boolean;
}

const IconContext = createContext<IconContextType>({ icons: {}, loading: true });

export const IconProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [icons, setIcons] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadIcons = async () => {
      try {
        // 起動時に1回だけ一括取得
        const result = await getAllImages();

        if (result) {
          setIcons(result); // キャッシュに格納
        }
      } catch (err) {
        console.error('アイコンの一括キャッシュに失敗しました:', err);
      } finally {
        setLoading(false);
      }
    };

    loadIcons();
  }, []);

  return (
    <IconContext.Provider value={{ icons, loading }}>
      {children}
    </IconContext.Provider>
  );
};

// 簡単に呼び出すためのカスタムHook
export const useIconCache = () => useContext(IconContext);