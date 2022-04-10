import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const pages = ['Home', 'Create Account', 'Login'];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const accessToken = useSelector((state : RootState) => state.session.accessToken);
  const loading = useSelector((state : RootState) => state.session.loading);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function handleNavigate(route:string, 
    event: React.MouseEvent<HTMLLIElement, MouseEvent> | 
    React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event?.preventDefault();
    navigate(route);
  }

  function handleLogout(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    event.preventDefault();
    handleCloseUserMenu();
    navigate('/logout');
  }

  let sessionLinks;
  if (accessToken) {
    sessionLinks = <Box sx={{ flexGrow: 0 }}>
    <Tooltip title="Open settings">
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
      </IconButton>
    </Tooltip>
    <Menu
      sx={{ mt: '45px' }}
      id="menu-appbar"
      anchorEl={anchorElUser}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorElUser)}
      onClose={handleCloseUserMenu}
    >
        <MenuItem onClick={(event) => handleLogout(event)}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
    </Menu>
  </Box>;
  } else if (!accessToken && !loading) {
    sessionLinks = <>
      <Button
      onClick={(event) => handleNavigate("/signup", event)}
      sx={{ my: 2, color: 'white', display: 'block' }}
      >
      Create Account
      </Button>
      <Button
        onClick={(event) => handleNavigate("/login", event)}
        sx={{ my: 2, color: 'white', display: 'block' }}
        >
        Login
      </Button>
    </>;
  } else {
    sessionLinks = <></>;
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={(event) => handleNavigate("/", event)}>
                <Typography textAlign="center">Home</Typography>
              </MenuItem>              
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            WishList
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                onClick={(event) => handleNavigate("/", event)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Home
              </Button>
          </Box>
              {sessionLinks}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
