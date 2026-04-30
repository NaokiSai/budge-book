import { styled } from '@mui/material/styles';
import Box, { type BoxProps } from '@mui/material/Box';

export const PageContainer = styled((props: BoxProps) => (
  <Box component="main" {...props} />
))({
  // 画面全体の高さからAppBarの高さを引く
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden', // 親はスクロールさせない
});