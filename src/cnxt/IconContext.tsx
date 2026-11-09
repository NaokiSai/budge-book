import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAllImages } from './../service/DataService'; // まとめて取得するAPI呼び出し

interface IconContextType {
  icons: Record<string, string>;
  loading: boolean;
  clearIconCache: () => void; // キャッシュクリア用（セッション切れ・ログアウト時などに使用可能）
}

const IconContext = createContext<IconContextType>({ 
  icons: {}, 
  loading: true,
  clearIconCache: () => {}
});

// ローカルストレージ用のキー
const ICON_CACHE_STORAGE_KEY = 'app_icon_cache_v1';

export const IconProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. 初期化時に localStorage からキャッシュを復元（なければ空オブジェクト）
  const [icons, setIcons] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(ICON_CACHE_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (err) {
      console.error('ローカルストレージからのアイコンキャッシュ復元に失敗しました:', err);
      return {};
    }
  });

  const [loading, setLoading] = useState<boolean>(true);

  // 2. 初回マウント時に一括取得（すでにキャッシュがあれば裏でフェッチするか、無ければローディング）
  useEffect(() => {
    const loadIcons = async () => {
      try {
        // すでにローカルストレージにデータがある場合は、ローディングを瞬時に解除して体感速度を上げる
        const hasCachedData = Object.keys(icons).length > 0;
        if (!hasCachedData) {
          setLoading(true);
        }

        // 一括取得APIを実行
        const result = await getAllImages();

        if (result && typeof result === 'object') {
          setIcons(result);
          // 取得した最新データを localStorage に保存
          localStorage.setItem(ICON_CACHE_STORAGE_KEY, JSON.stringify(result));
        }
      } catch (err) {
        console.error('アイコンの一括キャッシュ取得に失敗しました:', err);
      } finally {
        setLoading(false);
      }
    };

    loadIcons();
  }, []);

  // 3. セッション切れやログアウト時にキャッシュを強制クリアする関数
  const clearIconCache = () => {
    setIcons({});
    localStorage.removeItem(ICON_CACHE_STORAGE_KEY);
  };

  return (
    <IconContext.Provider value={{ icons, loading, clearIconCache }}>
      {children}
    </IconContext.Provider>
  );
};

// 簡単に呼び出すためのカスタムHook
export const useIconCache = () => useContext(IconContext);