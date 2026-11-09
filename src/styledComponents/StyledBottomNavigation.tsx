import { BottomNavigation, styled } from "@mui/material";

export const StyledBottomNavigation = styled(BottomNavigation)(({
  overflow: 'visible',
  backgroundColor: '#F5F5F5',
  height: 64,
  '& .MuiBottomNavigationAction-root': {
    minWidth: 'auto',
    p: '3px 0',
    fontSize: '0.65rem',
    '&.Mui-selected': {
      fontSize: '0.65rem',
    }
  }
}));