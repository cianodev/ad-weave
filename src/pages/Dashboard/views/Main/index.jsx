import React, { useContext } from 'react';

import {
  Box,
  Button,
  Card,
  Grid,
  styled,
  TableContainer,
  TableHead,
  Typography,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Table,
  TablePagination,
  Avatar,
  AvatarGroup,
  Divider,
  Chip,
  Badge,
  Tooltip,
  IconButton,
  Backdrop,
  CircularProgress,
  TableSortLabel,
} from '@mui/material';

import DashboardContext from 'pages/Dashboard/context';

import GridViewTwoToneIcon from '@mui/icons-material/GridViewTwoTone';
import FormatListBulletedTwoToneIcon from '@mui/icons-material/FormatListBulletedTwoTone';
import PersonOffTwoToneIcon from '@mui/icons-material/PersonOffTwoTone';
import SpeakerNotesOffTwoToneIcon from '@mui/icons-material/SpeakerNotesOffTwoTone';
import TodayTwoToneIcon from '@mui/icons-material/TodayTwoTone';
import VolunteerActivismTwoToneIcon from '@mui/icons-material/VolunteerActivismTwoTone';
import FlagTwoToneIcon from '@mui/icons-material/FlagTwoTone';
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
import AutoModeTwoToneIcon from '@mui/icons-material/AutoModeTwoTone';

import { stringAvatar } from 'hooks';

import _ from 'lodash';
import { appColors } from 'theme/variables';
import { Link, useLocation } from 'react-router-dom';

import pie from 'assets/icons/pie.svg';
import line from 'assets/icons/line.svg';
import bar from 'assets/icons/bar.svg';
import dot from 'assets/icons/dot.svg';
import SearchInput from 'components/SearchInput';
import Sidebar from 'pages/Dashboard/components/Sidebar';

const StyledButton = styled(Button)({
  textTransform: 'capitalize',
  color: '#a19da4',
  fontWeight: 700,
  ':hover': {
    backgroundColor: 'transparent',
    color: '#7e14e6',
  },
});

const StyledCard = styled(Card)({
  padding: '1em 2em',
  borderRadius: '10px',
  boxShadow:
    'rgba(159, 162, 191, 0.18) 0px 9px 16px, rgba(159, 162, 191, 0.32) 0px 2px 2px',
});

const StyledPaper = styled(Paper)({
  borderRadius: '10px',
  boxShadow:
    'rgba(159, 162, 191, 0.18) 0px 9px 16px, rgba(159, 162, 191, 0.32) 0px 2px 2px',
  overflow: 'hidden',
  backgroundColor: '#f3f3f3',
});

export default function Main() {
  const location = useLocation();
  const {
    tab,
    statusCount,
    totalTime,
    dashboard: {
      all_tasks,
      due_today,
      all_task,
      my_tasks,
      unresponded,
      unassigned,
    },
    state,
    resources,
    handlePaginationPageChange,
    handlePaginationRowPageChange,
    handleSearch,
    handleRepullDashboard,
    fetchRepullDashboard,
    handlePopover,
    page,
    counter,
    handleTableSort,
    errorStatusCount,
    errorTotalTime,
    errorDashboard,
    errorResources,
  } = useContext(DashboardContext);

  return (
    <Box sx={{ height: 'calc(100vh - 50px)', overflow: 'hidden' }}>
      <Grid container height="inherit">
        <Grid item xs={1.5} sx={{ borderRight: '1px solid #e6e6e6' }}>
          <Sidebar />

          <Box
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <StyledButton
                startIcon={<FormatListBulletedTwoToneIcon />}
                disableElevation
                disableFocusRipple
                disableRipple
                disableTouchRipple
                endIcon={
                  <Chip
                    label={_.isEmpty(all_tasks) ? 0 : all_task}
                    size="small"
                    sx={{
                      height: '14px',
                      paddingTop: '2px',
                      color: tab === null ? '#fff' : 'inherit',
                      backgroundColor: tab === null ? '#7e14e6' : '#00000014',
                      fontWeight: 700,
                      '& .MuiChip-label': {
                        padding: '0 5px',
                        fontSize: '9px',
                      },
                    }}
                  />
                }
                onClick={() => console.log(location)}
                component={Link}
                to={{
                  pathname: location.pathname,
                  search: '',
                }}
                sx={{
                  color: tab === 'dashboard' ? '#7e14e6' : '#a19da4',
                }}
              >
                All Tasks
              </StyledButton>
              <StyledButton
                startIcon={<PersonOffTwoToneIcon />}
                disableElevation
                disableFocusRipple
                disableRipple
                disableTouchRipple
                endIcon={
                  <Chip
                    label={_.isEmpty(all_tasks) ? 0 : unassigned}
                    size="small"
                    sx={{
                      height: '14px',
                      paddingTop: '2px',
                      color: tab === 'unassigned' ? '#fff' : 'inherit',
                      backgroundColor:
                        tab === 'unassigned' ? '#7e14e6' : '#00000014',
                      fontWeight: 700,
                      '& .MuiChip-label': {
                        padding: '0 5px',
                        fontSize: '9px',
                      },
                    }}
                  />
                }
                component={Link}
                to={{
                  pathname: location.pathname,
                  search: 'queue=unassigned',
                }}
                sx={{
                  color: tab === 'unassigned' ? '#7e14e6' : '#a19da4',
                }}
              >
                Unassigned
              </StyledButton>
              <StyledButton
                startIcon={<SpeakerNotesOffTwoToneIcon />}
                disableElevation
                disableFocusRipple
                disableRipple
                disableTouchRipple
                endIcon={
                  <Chip
                    label={_.isEmpty(all_tasks) ? 0 : unresponded}
                    size="small"
                    sx={{
                      height: '14px',
                      paddingTop: '2px',
                      color: tab === 'unanswered' ? '#fff' : 'inherit',
                      backgroundColor:
                        tab === 'unanswered' ? '#7e14e6' : '#00000014',
                      fontWeight: 700,
                      '& .MuiChip-label': {
                        padding: '0 5px',
                        fontSize: '9px',
                      },
                    }}
                  />
                }
                component={Link}
                to={{
                  pathname: location.pathname,
                  search: 'queue=unanswered',
                }}
                sx={{
                  color: tab === 'unanswered' ? '#7e14e6' : '#a19da4',
                }}
              >
                Unanswered
              </StyledButton>
              <StyledButton
                startIcon={<TodayTwoToneIcon />}
                disableElevation
                disableFocusRipple
                disableRipple
                disableTouchRipple
                endIcon={
                  <Chip
                    label={_.isEmpty(all_tasks) ? 0 : due_today}
                    size="small"
                    sx={{
                      height: '14px',
                      paddingTop: '2px',
                      color: tab === 'due-today' ? '#fff' : 'inherit',
                      backgroundColor:
                        tab === 'due-today' ? '#7e14e6' : '#00000014',
                      fontWeight: 700,
                      '& .MuiChip-label': {
                        padding: '0 5px',
                        fontSize: '9px',
                      },
                    }}
                  />
                }
                component={Link}
                to={{
                  pathname: location.pathname,
                  search: 'queue=due-today',
                }}
                sx={{
                  color: tab === 'due-today' ? '#7e14e6' : '#a19da4',
                }}
              >
                Due Today
              </StyledButton>
              <StyledButton
                startIcon={<VolunteerActivismTwoToneIcon />}
                disableElevation
                disableFocusRipple
                disableRipple
                disableTouchRipple
                endIcon={
                  <Chip
                    label={_.isEmpty(all_tasks) ? 0 : my_tasks}
                    size="small"
                    sx={{
                      height: '14px',
                      paddingTop: '2px',
                      color: tab === 'my-tasks' ? '#fff' : 'inherit',
                      backgroundColor:
                        tab === 'my-tasks' ? '#7e14e6' : '#00000014',
                      fontWeight: 700,
                      '& .MuiChip-label': {
                        padding: '0 5px',
                        fontSize: '9px',
                      },
                    }}
                  />
                }
                component={Link}
                to={{
                  pathname: location.pathname,
                  search: 'queue=my-tasks',
                }}
                sx={{
                  color: tab === 'my-tasks' ? '#7e14e6' : '#a19da4',
                }}
              >
                My Tasks
              </StyledButton>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={8} sx={{ borderRight: '1px solid #e6e6e6' }}>
          <Box pt={2} px={2}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <StyledCard
                  sx={{
                    backgroundColor: '#402176',
                    color: '#fff',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage: `url(${pie})`,
                    backgroundSize: '74px',
                    backgroundPosition: 'right',
                    backgroundPositionX: '9em',
                    backgroundPositionY: '0.8em',
                  }}
                >
                  <Typography
                    variant="button"
                    fontWeight={700}
                    textTransform="capitalize"
                    noWrap
                  >
                    Not Started
                  </Typography>

                  <Typography variant="h4" fontWeight={800}>
                    {_.isEmpty(statusCount) ? 0 : statusCount?.not_started}
                  </Typography>
                </StyledCard>
              </Grid>
              <Grid item xs={3}>
                <StyledCard
                  sx={{
                    backgroundColor: '#15a6c9',
                    color: '#fff',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage: `url(${line})`,
                    backgroundSize: '74px',
                    backgroundPosition: 'right',
                    backgroundPositionX: '9em',
                    backgroundPositionY: '0.8em',
                  }}
                >
                  <Typography
                    variant="button"
                    fontWeight={700}
                    textTransform="capitalize"
                    noWrap
                  >
                    In-Progress
                  </Typography>

                  <Typography variant="h4" fontWeight={800}>
                    {_.isEmpty(statusCount) ? 0 : statusCount?.in_progress}
                  </Typography>
                </StyledCard>
              </Grid>
              <Grid item xs={3}>
                <StyledCard
                  sx={{
                    backgroundColor: '#f2b601',
                    color: '#fff',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage: `url(${dot})`,
                    backgroundSize: '74px',
                    backgroundPosition: 'right',
                    backgroundPositionX: '9em',
                    backgroundPositionY: '0.8em',
                  }}
                >
                  <Typography
                    variant="button"
                    fontWeight={700}
                    textTransform="capitalize"
                    noWrap
                  >
                    Completed
                  </Typography>
                  <Typography variant="h4" fontWeight={800}>
                    {_.isEmpty(statusCount) ? 0 : statusCount?.completed}
                  </Typography>
                </StyledCard>
              </Grid>
              <Grid item xs={3}>
                <StyledCard
                  sx={{
                    backgroundColor: '#f16079',
                    color: '#fff',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage: `url(${bar})`,
                    backgroundSize: '74px',
                    backgroundPosition: 'right',
                    backgroundPositionX: '9em',
                    backgroundPositionY: '0.8em',
                  }}
                >
                  <Typography
                    variant="button"
                    fontWeight={700}
                    textTransform="capitalize"
                    noWrap
                  >
                    On-Hold
                  </Typography>
                  <Typography variant="h4" fontWeight={800}>
                    {_.isEmpty(statusCount) ? 0 : statusCount?.on_hold}
                  </Typography>
                </StyledCard>
              </Grid>
            </Grid>
          </Box>
          <Box
            p={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center" justifyContent="center">
              <Typography variant="h6" fontWeight={800}>
                Tasks
              </Typography>
              <Tooltip
                title="Reload table"
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
                <IconButton size="small" onClick={handleRepullDashboard}>
                  <Badge
                    badgeContent={counter}
                    color="secondary"
                    sx={{
                      '& .MuiBadge-badge': {
                        fontSize: '8px',
                        padding: 0,
                        height: '13px',
                        top: '8px',
                        left: '9px',
                      },
                    }}
                  >
                    <AutoModeTwoToneIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <SearchInput
                placeholder="Search Task"
                onChange={(e) => handleSearch(e.target.value)}
              />
              <Tooltip
                title="Filters"
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
                  sx={{ marginLeft: '2px' }}
                  onClick={(e) => handlePopover(e, 'table_filter')}
                >
                  <Badge color="warning" variant="dot">
                    <FilterAltTwoToneIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Box pb={2} px={2}>
            <StyledPaper sx={{ position: 'relative' }}>
              <Backdrop
                open={fetchRepullDashboard}
                sx={{
                  position: 'absolute',
                  zIndex: 3,
                }}
              >
                <CircularProgress color="secondary" />
              </Backdrop>
              <TableContainer
                sx={{
                  maxHeight: 'calc(100vh - 20.5em)',
                  minHeight: 'calc(100vh - 20.5em)',
                }}
              >
                <Table
                  stickyHeader
                  sx={{ minWidth: 'max-content' }}
                  aria-label="simple table"
                  size="small"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">ID</TableCell>
                      <TableCell align="left">
                        <TableSortLabel
                          active={
                            state.sort.includes('name') ||
                            state.sort.includes('-name')
                          }
                          direction={
                            state.sort.includes('name') ? 'asc' : 'desc'
                          }
                          onClick={() =>
                            handleTableSort(
                              state.sort.includes('-name') ? 'name' : '-name'
                            )
                          }
                        >
                          Name
                        </TableSortLabel>
                      </TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="center">Priority</TableCell>
                      <TableCell align="center">Assignee</TableCell>
                      <TableCell align="center">
                        <TableSortLabel
                          active={
                            state.sort.includes('due_date') ||
                            state.sort.includes('-due_date')
                          }
                          direction={
                            state.sort.includes('due_date') ? 'asc' : 'desc'
                          }
                          onClick={() =>
                            handleTableSort(
                              state.sort.includes('-due_date')
                                ? 'due_date'
                                : '-due_date'
                            )
                          }
                        >
                          Due Date
                        </TableSortLabel>
                      </TableCell>
                      <TableCell align="center">
                        <TableSortLabel
                          active={
                            state.sort.includes('delivery_date') ||
                            state.sort.includes('-delivery_date')
                          }
                          direction={
                            state.sort.includes('delivery_date')
                              ? 'asc'
                              : 'desc'
                          }
                          onClick={() =>
                            handleTableSort(
                              state.sort.includes('-delivery_date')
                                ? 'delivery_date'
                                : '-delivery_date'
                            )
                          }
                        >
                          Delivery Date
                        </TableSortLabel>
                      </TableCell>
                      <TableCell align="center">Channel</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {all_tasks?.data?.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          cursor: 'pointer',
                          backgroundColor: `${
                            appColors.dashboard.health[
                              _.camelCase(row?.tracker_status?.trim())
                            ]
                          }`,
                          ':hover': {
                            backgroundColor: `${
                              appColors.dashboard.health[
                                `${_.camelCase(
                                  row?.tracker_status?.trim()
                                )}Hover`
                              ]
                            }`,
                          },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ padding: 0 }}
                        >
                          <Box
                            component={Link}
                            to={{
                              pathname: `/${row?.rel_type}/${row?.id}`,
                              state: {
                                background: location,
                                type: row?.rel_type,
                                subtask: row?.rel_type?.includes('subtask'),
                              },
                            }}
                            sx={{ textDecoration: 'none', color: 'inherit' }}
                          >
                            <Box
                              sx={{ padding: '6px 16px', cursor: 'pointer' }}
                            >
                              {row.id}
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ padding: 0 }}
                        >
                          <Box
                            component={Link}
                            to={{
                              pathname: `/${row?.rel_type}/${row?.id}`,
                              state: {
                                background: location,
                                type: row?.rel_type,
                                subtask: row?.rel_type?.includes('subtask'),
                              },
                            }}
                            sx={{ textDecoration: 'none', color: 'inherit' }}
                          >
                            <Box
                              sx={{ padding: '6px 16px', cursor: 'pointer' }}
                            >
                              <Chip
                                label={
                                  row.rel_type === 'task'
                                    ? 'Parent'
                                    : row.rel_type
                                }
                                size="small"
                                sx={{
                                  height: 'auto',
                                  backgroundColor:
                                    row.rel_type === 'task'
                                      ? '#5c52c3'
                                      : '#f22076',
                                  color: '#fff',
                                  fontSize: 10,
                                  textTransform: 'capitalize',
                                  marginRight: '10px',
                                  cursor: 'pointer',
                                }}
                              />
                              {row.name}
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell
                          sx={{
                            padding: 0,
                            backgroundColor: `${
                              appColors.status[_.camelCase(row?.status?.trim())]
                            }`,
                            width: '110px',
                            color: '#fff',
                          }}
                          align="center"
                          onClick={(e) =>
                            handlePopover(
                              e,
                              'task_status',
                              row?.status_id,
                              row?.id,
                              null,
                              row?.rel_type === 'task'
                            )
                          }
                        >
                          {row.status}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: '20px',
                            display: 'flex',
                            color: `${
                              appColors.priority[row?.priority?.toLowerCase()]
                            }`,
                          }}
                          align="center"
                          onClick={(e) =>
                            handlePopover(
                              e,
                              'task_priority',
                              row?.priority_id,
                              row?.id,
                              null,
                              row?.rel_type === 'task'
                            )
                          }
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <FlagTwoToneIcon />
                            <Typography variant="caption" ml={1}>
                              {row?.priority}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ padding: 0 }}
                          onClick={(e) =>
                            handlePopover(
                              e,
                              'task_assignees',
                              row?.assignees,
                              row?.id,
                              null,
                              row?.rel_type === 'task'
                            )
                          }
                        >
                          <AvatarGroup sx={{ justifyContent: 'center' }}>
                            {row?.assignees?.map((assignee) => (
                              <Tooltip
                                key={assignee?.user_id}
                                title={assignee?.username}
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
                                <Avatar
                                  {...stringAvatar(assignee?.username, {
                                    width: '2em',
                                    height: '2em',
                                    fontSize: '11px',
                                  })}
                                  src={assignee?.avatar}
                                />
                              </Tooltip>
                            ))}
                          </AvatarGroup>
                        </TableCell>
                        <TableCell
                          align="center"
                          onClick={(e) =>
                            handlePopover(
                              e,
                              'task_due_date',
                              row?.due_date,
                              row?.id,
                              null,
                              row?.rel_type === 'task'
                            )
                          }
                        >
                          {row.due_date}
                        </TableCell>
                        <TableCell
                          align="center"
                          onClick={(e) =>
                            handlePopover(
                              e,
                              'task_delivery_date',
                              row?.delivery_date,
                              row?.id,
                              null,
                              row?.rel_type === 'task'
                            )
                          }
                        >
                          {row.delivery_date}
                        </TableCell>
                        <TableCell align="center">{row.channel}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                sx={{
                  borderTop: '1px solid #ececec',
                }}
                component="div"
                count={_.isEmpty(all_tasks) ? 0 : Number(all_tasks?.total)}
                page={page}
                onPageChange={handlePaginationPageChange}
                rowsPerPageOptions={[20, 40, 60, 80, 100]}
                rowsPerPage={
                  _.isEmpty(all_tasks) ? 20 : Number(all_tasks?.per_page)
                }
                onRowsPerPageChange={handlePaginationRowPageChange}
              />
            </StyledPaper>
          </Box>
        </Grid>
        <Grid item xs={2.5} sx={{ backgroundColor: '#f3f3f3' }}>
          <Box px={3} py={1}>
            <Typography variant="h6" fontWeight={800} mb={1}>
              Summary
            </Typography>
            <Card
              elevation={0}
              sx={{
                borderRadius: '12px',
                backgroundColor: '#e8e8e887',
                border: '1px solid #e4e4e4',
              }}
            >
              <Box
                py={2}
                px={3}
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <Typography variant="button">
                  This week&apos;s Timelog
                </Typography>
                <Box>
                  <Typography variant="h3" fontWeight={800}>
                    {_.isEmpty(totalTime)
                      ? '00:00:00'
                      : totalTime?.user_this_week_total_time}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Box>
          <Box px={3} mt={1}>
            <Typography variant="h6" fontWeight={800} mb={1}>
              Resources
            </Typography>
          </Box>
          <Box sx={{ height: 'calc(100vh - 17.3em)', overflow: 'auto' }}>
            {resources?.data?.map((resource) => (
              <Box key={resource?.id}>
                <Box px={3} display="flex">
                  <Avatar
                    {...stringAvatar(resource?.fullname)}
                    variant="rounded"
                  />
                  <Box display="flex" flexDirection="column" ml={1.5}>
                    <Typography variant="button" fontWeight={700}>
                      {resource?.fullname}
                    </Typography>
                    <Typography variant="caption">
                      {resource?.team_name}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ margin: '0.5em 0', color: '#dedede' }} />
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
