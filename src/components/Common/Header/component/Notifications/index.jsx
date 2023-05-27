import React, { useContext, useState } from 'react';

import HeaderContext from 'components/Common/Header/context';

import InfiniteScroll from 'react-infinite-scroll-component';

import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  Backdrop,
  styled,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItemButton,
  Tooltip,
  Chip,
} from '@mui/material';
import DoneAllTwoToneIcon from '@mui/icons-material/DoneAllTwoTone';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import CircularProgress from '@mui/material/CircularProgress';
import NotificationsOffTwoToneIcon from '@mui/icons-material/NotificationsOffTwoTone';

import _ from 'lodash';
import { stringAvatar } from 'hooks';
import moment from 'moment';
import { Link, useLocation } from 'react-router-dom';

const StyledTab = styled(Tab)({
  textTransform: 'none',
  minHeight: '35px',
  minWidth: 'auto',
});

const StyledTabs = styled(Tabs)({
  minHeight: '35px',
});

export default function Notifications() {
  const location = useLocation();

  const {
    all,
    read,
    unread,
    notificationTab,
    hasMore,
    list,
    fetchNotification,
    handleNotificationTab,
    handleNotificationScroll,
    handleMarkAllNotificationAsRead,
    handleClickNotification,
  } = useContext(HeaderContext);
  return (
    <Box overflow="hidden">
      <Box px={2} pt={2} pb={1}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <NotificationsActiveTwoToneIcon
              sx={{ fontSize: '19px', marginRight: '0.3em' }}
            />
            <Typography variant="h6" fontWeight={700}>
              Notifications
            </Typography>
          </Box>
          <Button
            size="small"
            disableElevation
            disableFocusRipple
            disableRipple
            disableTouchRipple
            startIcon={<DoneAllTwoToneIcon />}
            sx={{ textTransform: 'capitalize' }}
            color="secondary"
            onClick={handleMarkAllNotificationAsRead}
            disabled={unread === 0}
          >
            Mark all as read
          </Button>
        </Box>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Box px={2}>
          <StyledTabs value={notificationTab} onChange={handleNotificationTab}>
            <StyledTab
              value="all"
              label="All"
              disableRipple
              disableFocusRipple
              disableTouchRipple
              icon={
                _.isNull(all) || all === 0 ? (
                  <></>
                ) : (
                  <Chip
                    label={all}
                    size="small"
                    sx={{ cursor: 'pointer', fontSize: '10px' }}
                  />
                )
              }
              iconPosition="end"
            />
            <StyledTab
              value="unread"
              label="Unread"
              disableRipple
              disableFocusRipple
              disableTouchRipple
              icon={
                _.isNull(unread) || unread === 0 ? (
                  <></>
                ) : (
                  <Chip
                    label={unread}
                    size="small"
                    sx={{ cursor: 'pointer', fontSize: '10px' }}
                  />
                )
              }
              iconPosition="end"
            />
            <StyledTab
              value="read"
              label="Read"
              disableRipple
              disableFocusRipple
              disableTouchRipple
              icon={
                _.isNull(read) || read === 0 ? (
                  <></>
                ) : (
                  <Chip
                    label={read}
                    size="small"
                    sx={{ cursor: 'pointer', fontSize: '10px' }}
                  />
                )
              }
              iconPosition="end"
            />
          </StyledTabs>
        </Box>
      </Box>
      <Box
        sx={{
          height: 'calc(100vh - 6.4em)',
          overflowX: 'hidden',
          overflowY: 'auto',
        }}
        id="scrollable-notification-container"
      >
        <Backdrop
          sx={{
            position: 'absolute',
            zIndex: 1,
          }}
          open={fetchNotification}
        >
          <CircularProgress color="secondary" />
        </Backdrop>

        <InfiniteScroll
          dataLength={
            _.isEmpty(list[notificationTab])
              ? 0
              : list[notificationTab]?.data?.length
          }
          hasMore={hasMore}
          next={handleNotificationScroll}
          loader={
            !_.isEmpty(list[notificationTab]?.data) && (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                py={2}
              >
                <CircularProgress color="secondary" />
              </Box>
            )
          }
          endMessage={
            !_.isEmpty(list[notificationTab]?.data) && (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                py={2}
              >
                <CheckCircleTwoToneIcon
                  color="success"
                  sx={{ width: '3em', height: '3em' }}
                />
                <Typography variant="h5" fontWeight={700}>
                  You&apos;re all caught up!
                </Typography>
                <Typography variant="body1">
                  {`You've seen all ${
                    notificationTab === 'all' ? 'the' : notificationTab
                  } notifications.`}
                </Typography>
              </Box>
            )
          }
          scrollableTarget="scrollable-notification-container"
        >
          <List>
            {!_.isEmpty(list[notificationTab]) &&
              list[notificationTab]?.data?.map((data) => (
                <ListItem
                  alignItems="flex-start"
                  key={data?.id}
                  disablePadding
                  sx={{
                    borderBottom: '1px solid #ececec7d',
                    '& .MuiListItemText-primary': {
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      fontSize: '14px',
                      fontWeight: 700,
                    },
                    '& .MuiListItemText-secondary': {
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    },
                  }}
                  onClick={() =>
                    handleClickNotification(data?.id, data?.status)
                  }
                >
                  <ListItemButton
                    selected={data?.status === 'unread'}
                    component={Link}
                    to={{
                      pathname: `/${data?.rel_type}/${data?.rel_id}`,
                      state: {
                        background: location,
                        type: data?.rel_type,
                        subtask: data?.rel_type?.includes('subtask'),
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        variant="rounded"
                        alt={data?.create_by}
                        {...stringAvatar(data?.create_by)}
                        src={data?.avatar}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${_.capitalize(data?.rel_name)}`}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{
                              display: 'inline',
                              textTransform: 'capitalize',
                            }}
                            component="span"
                            variant="caption"
                            color="#898989"
                            noWrap
                            fontWeight={600}
                          >
                            {data?.create_by}
                            <Typography
                              variant="caption"
                              textTransform="lowercase"
                              color="#898989"
                            >
                              {` — `}
                              {data?.message?.replace(
                                `${data?.create_by} - `,
                                ''
                              )}
                            </Typography>
                          </Typography>
                          <Tooltip
                            title={data?.created}
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
                            <span
                              style={{
                                fontSize: '11px',
                                color: '#959595',
                                display: 'table-row-group',
                              }}
                            >
                              {moment(data?.created).startOf('hour').fromNow()}
                            </span>
                          </Tooltip>
                        </React.Fragment>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
          {_.isEmpty(list[notificationTab]?.data) && (
            <Box
              sx={{
                height: 'calc(100vh - 7em)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <NotificationsOffTwoToneIcon
                sx={{
                  width: '5em',
                  height: '5em',
                  color: '#bdbdbd',
                }}
              />
              <Typography variant="h6" color="#bdbdbd" fontWeight={700}>
                {`No new ${
                  notificationTab === 'all' ? ' ' : `${notificationTab} `
                }notifications`}
              </Typography>
            </Box>
          )}
        </InfiniteScroll>
      </Box>
    </Box>
  );
}
