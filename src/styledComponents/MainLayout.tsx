import React from 'react';
import { Outlet } from 'react-router-dom';
import { MenuAppBar } from './MenuAppBar';
import { BottomNavigation } from './BottomNavigation';
import { TimeoutDialog } from './TimeoutDialog';
import { useData } from '@cnxt/DataContext';

export const MainLayout = () => {
  const { loadingCtx, openTimeoutDialog, setOpenTimeoutDialog, resetContext } = useData();

  return (
    <React.Fragment>
      <MenuAppBar />
      {/* 子ルート（Home, Analytics, Addなど）がここに描画される */}
      <Outlet /> 
      <BottomNavigation loadingCtx={loadingCtx} />
      <TimeoutDialog 
        open={openTimeoutDialog} 
        onClose={() => setOpenTimeoutDialog(false)} 
        resetContext={resetContext}
      />
    </React.Fragment>
  );
};