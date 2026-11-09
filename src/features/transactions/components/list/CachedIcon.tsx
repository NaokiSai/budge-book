import React from 'react';
import { useIconCache } from '@cnxt/IconContext';
import { Skeleton } from '@mui/material';

interface CachedIconProps {
  fileName: string; // 例: "food.png" や "nodata.png"
  alt?: string;
  style?: React.CSSProperties;
}

export const CachedIcon: React.FC<CachedIconProps> = ({ fileName, alt = 'icon', style }) => {
  const { icons, loading } = useIconCache();

  if (loading) {
    return <Skeleton variant="rectangular" width={36} height={36} sx={{ my: 'auto !important' }} />; // 読込中のプレースホルダー
  }

  // キャッシュから該当するBase64データを取得（なければデフォルトやNoDataにフォールバック）
  const imgSrc = icons[fileName] || icons['default.png'] || '';

  if (!imgSrc) {
    return null;
  }

  return <img src={imgSrc} alt={alt} style={{ width: '24px', height: '24px', ...style }} />;
};