import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Image } from '@styledComponents/Image';
import LogoImage from '@assets/Logo.png'
import { Divider, Stack } from '@mui/material';

export const MenuAppBar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const savedUser = localStorage.getItem('user');
  const savedUserName = localStorage.getItem('user_name');

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ minHeight: '48px', backgroundColor: '#F8D67C' }}>
      <Toolbar variant="dense" sx={{ minHeight: '48px', py: 0.5 }}>
        <IconButton
          size="small"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 1 }}
        >
          <Image src={LogoImage} sx={{ width: 40, height: 40 }} referrerPolicy="no-referrer"/>
        </IconButton>
        <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1, fontSize: '1rem', color: '#4B2814' }}>
          おうち家計簿
        </Typography>
        {savedUser && (
          <div>
            <IconButton
              size='large'
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              sx={{ p: 0.25 }}
            >
              {/* <AccountCircle fontSize="small" /> */}
              <img src={savedUser} alt="User Avatar" style={{ width: 30, height: 30, borderRadius: '50%' }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Stack direction='row' sx={{ padding: 1 }}>
                <img src={savedUser} alt="User Avatar" style={{ width: 60, height: 60, borderRadius: '50%' }} />
                <Typography sx={{ mx: 1, my: 'auto', fontSize: 20 }}>{savedUserName}</Typography>
              </Stack>
              <Divider variant="middle"/>
              <MenuItem onClick={handleClose}>ログアウト</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
