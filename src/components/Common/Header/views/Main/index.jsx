import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, matchPath } from 'react-router-dom';

import HeaderContext from 'components/Common/Header/context';

import _ from 'lodash';

import {
  Box,
  AppBar,
  List,
  Divider,
  ListItemIcon,
  Button,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
  Avatar,
} from '@mui/material';

import { useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import ContactSupportTwoToneIcon from '@mui/icons-material/ContactSupportTwoTone';
import KeyboardArrowDownTwoToneIcon from '@mui/icons-material/KeyboardArrowDownTwoTone';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import Groups2TwoToneIcon from '@mui/icons-material/Groups2TwoTone';
import HandshakeTwoToneIcon from '@mui/icons-material/HandshakeTwoTone';
import MoreIcon from '@mui/icons-material/MoreVert';
import InsightsTwoToneIcon from '@mui/icons-material/InsightsTwoTone';
import TimerTwoToneIcon from '@mui/icons-material/TimerTwoTone';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

import logo from 'assets/smartly/logo-initial-white.svg';
import { logout } from 'store/reducers/auth';
import { stringAvatar } from 'hooks';
import NotificationButton from 'components/Common/Header/component/NotificationButton';

const pages = [
  {
    name: 'Dashboard',
    url: '/',
  },
  {
    name: 'Projects',
    url: '/projects',
  },
];

function Main() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { data: user } = useSelector((state) => state.user);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const {
    unread,
    openSearch,
    openPreset,
    openNotification,
    handleOpenNotification,
    handleOpenSearch,
    handleOpenPreset,
    handleTaskCreation,
  } = React.useContext(HeaderContext);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        sx: {
          top: '7px !important',
        },
      }}
    >
      <Box sx={{ display: 'flex', minWidth: '210px', padding: '18px' }}>
        <Avatar
          {...stringAvatar(user?.fullname, {
            width: 30,
            height: 30,
            fontSize: '14px',
            border: '1px solid #ffffff9c',
          })}
          variant="rounded"
          src={user?.profile_picture}
        />
        <Box>
          <Box
            sx={{
              paddingLeft: '9px',
              textAlign: 'left',
              width: '130px',
            }}
          >
            <Typography noWrap variant="body1" color="primary" fontWeight={800}>
              {user?.fullname}
            </Typography>
            <Typography variant="body2" color="#9ea4c199" noWrap>
              {user?.team_name}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
      <MenuItem
        sx={{ margin: '0.5em 1em 0em', borderRadius: '8px' }}
        component={Link}
        to="/profile"
      >
        <ListItemIcon>
          <AccountBoxTwoToneIcon sx={{ width: '1.2em', height: '1.2em' }} />
        </ListItemIcon>
        Profile
      </MenuItem>
      <MenuItem
        sx={{ margin: '0em 1em', borderRadius: '8px' }}
        component={Link}
        to="/partners"
      >
        <ListItemIcon>
          <HandshakeTwoToneIcon sx={{ width: '1.2em', height: '1.2em' }} />
        </ListItemIcon>
        Partners
      </MenuItem>
      <MenuItem
        sx={{ margin: '0em 1em', borderRadius: '8px' }}
        component={Link}
        to="/timesheet"
      >
        <ListItemIcon>
          <InsightsTwoToneIcon sx={{ width: '1.2em', height: '1.2em' }} />
        </ListItemIcon>
        Time Sheet
      </MenuItem>
      <Divider />
      <Box sx={{ margin: '9px' }}>
        <Button
          onClick={() => dispatch(logout())}
          fullWidth
          color="secondary"
          startIcon={<LockOpenTwoToneIcon />}
        >
          Sign out
        </Button>
      </Box>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleOpenNotification}>
        <IconButton aria-label="show 17 new notifications" color="inherit">
          <NotificationButton
            teamId={user?.team_id}
            userId={user?.id}
            defaultValue={unread}
          />
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem component={Link} to="/support">
        <IconButton aria-label="help center" color="inherit">
          <ContactSupportTwoToneIcon />
        </IconButton>
        <p>Contact Support</p>
      </MenuItem>
      <MenuItem component={Link} to="/profile">
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: 99 }} elevation={0}>
        <Box px={1.5} overflow="hidden">
          <Toolbar
            disableGutters
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                component={Link}
                to="/"
                sx={{
                  height: '30px',
                  width: '72px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={logo}
                  alt="ad-weave-logo"
                  style={{ height: 'auto', width: '50px' }}
                />
              </Box>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
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
                  {pages.map((page) => (
                    <MenuItem
                      key={page?.name}
                      onClick={handleCloseNavMenu}
                      component={Link}
                      to={page?.url}
                    >
                      <Typography textAlign="center">{page?.name}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <List
                component={Box}
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  position: 'relative',
                  margin: 0,
                  padding: 0,
                  listStyle: 'none',
                }}
              >
                {pages.map((page, index) => (
                  <ListItem disablePadding key={index}>
                    <ListItemButton
                      selected={
                        !_.isNull(
                          matchPath(page?.url, `/${pathname.split('/')[1]}`)
                        ) &&
                        matchPath(page?.url, `/${pathname.split('/')[1]}`)
                          .isExact
                      }
                      disableTouchRipple
                      disableRipple
                      onClick={handleCloseNavMenu}
                      component={Link}
                      to={`${page?.url.toLowerCase()}`}
                      id="nav-button"
                    >
                      <ListItemText
                        primaryTypographyProps={{
                          color: '#fff',
                          className: 'nav-label',
                          fontSize: '13px',
                        }}
                        primary={page?.name}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Tooltip
                title="Search"
                componentsProps={{
                  tooltip: {
                    sx: {
                      lineHeight: 'normal',
                      marginTop: '0.4em !important',
                    },
                  },
                }}
                arrow
              >
                <IconButton
                  aria-label="show 4 new mails"
                  color="inherit"
                  onClick={handleOpenSearch}
                  sx={{
                    padding: '8px 10px',
                    borderRadius: '10px',
                    backgroundColor: openSearch ? '#7e14e6' : 'transparent',
                    ':hover': {
                      backgroundColor: '#5601aad4',
                    },
                  }}
                >
                  <SearchTwoToneIcon />
                </IconButton>
              </Tooltip>

              <Tooltip
                title="Task Timer"
                componentsProps={{
                  tooltip: {
                    sx: {
                      lineHeight: 'normal',
                      marginTop: '0.4em !important',
                    },
                  },
                }}
                arrow
              >
                <IconButton
                  aria-label="show 4 new mails"
                  color="inherit"
                  onClick={handleOpenPreset}
                  sx={{
                    padding: '8px 10px',
                    borderRadius: '10px',
                    backgroundColor: openPreset ? '#f16079' : 'transparent',
                    ':hover': {
                      backgroundColor: '#752432',
                    },
                  }}
                >
                  <TimerTwoToneIcon />
                </IconButton>
              </Tooltip>

              <Tooltip
                title="Notifications"
                componentsProps={{
                  tooltip: {
                    sx: {
                      lineHeight: 'normal',
                      marginTop: '0.4em !important',
                    },
                  },
                }}
                arrow
              >
                <IconButton
                  aria-label="show 17 new notifications"
                  color="inherit"
                  sx={{
                    margin: '0 0.2em',
                    padding: '8px 10px',
                    borderRadius: '10px',
                    backgroundColor: openNotification
                      ? '#f6e648'
                      : 'transparent',
                    ':hover': {
                      backgroundColor: '#6d640e',
                    },
                  }}
                  onClick={handleOpenNotification}
                >
                  <NotificationButton
                    teamId={user?.team_id}
                    userId={user?.id}
                    defaultValue={unread}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip
                title="Support"
                componentsProps={{
                  tooltip: {
                    sx: {
                      lineHeight: 'normal',
                      marginTop: '0.4em !important',
                    },
                  },
                }}
                arrow
              >
                <IconButton
                  aria-label="show 4 new mails"
                  color="inherit"
                  component={Link}
                  to={'/support'}
                  sx={{
                    padding: '8px 10px',
                    borderRadius: '10px',
                    backgroundColor: pathname?.includes('support')
                      ? '#15a6c9'
                      : 'transparent',
                    ':hover': {
                      backgroundColor: '#076e87',
                    },
                  }}
                >
                  <ContactSupportTwoToneIcon />
                </IconButton>
              </Tooltip>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ margin: '0 0.3em 0 0.23em', borderColor: '#ffffff30' }}
              />
              <Tooltip
                title="Create a new task"
                componentsProps={{
                  tooltip: {
                    sx: {
                      lineHeight: 'normal',
                      marginTop: '0.4em !important',
                    },
                  },
                }}
                arrow
              >
                <Button
                  color="secondary"
                  variant="contained"
                  startIcon={<AddTwoToneIcon />}
                  sx={{
                    textTransform: 'capitalize',
                    fontWeight: 800,
                    padding: '10px 17px 10px 12px',
                  }}
                  size="small"
                  onClick={handleTaskCreation}
                >
                  New Task
                </Button>
              </Tooltip>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ margin: '0 0.5em 0 0.3em', borderColor: '#ffffff30' }}
              />
              <Button
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                sx={{
                  backgroundColor: [
                    '/profile',
                    '/users',
                    '/partners',
                    '/timesheet',
                  ].includes(pathname)
                    ? '#502c7a'
                    : 'transparent',
                  ':hover': {
                    backgroundColor: '#350565',
                  },
                }}
              >
                <Avatar
                  {...stringAvatar(user?.fullname, {
                    width: 30,
                    height: 30,
                    fontSize: '14px',
                    border: '1px solid #ffffff9c',
                  })}
                  variant="rounded"
                  src={user?.profile_picture}
                />
                <Box>
                  <Box
                    sx={{
                      paddingLeft: '9px',
                      textAlign: 'left',
                      width: '130px',
                    }}
                  >
                    <Typography
                      variant="body1"
                      color="#9ea4c1"
                      fontWeight={800}
                      fontSize={12}
                      noWrap
                    >
                      {user?.fullname}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="#9ea4c199"
                      fontSize={10}
                      noWrap
                    >
                      {user?.team_name}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'inline-flex' }}>
                  <KeyboardArrowDownTwoToneIcon
                    sx={{
                      fontSize: '1.5rem',
                      marginLeft: '9px',
                      color: '#9ea4c1',
                    }}
                  />
                </Box>
              </Button>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Box>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </>
  );
}

export default Main;
