import React, { useContext } from 'react';

import CountUp from 'react-countup';

import {
  Avatar,
  Box,
  Card,
  Chip,
  Grid,
  Button,
  Pagination,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import SmartlyContext from 'pages/Smartly/context';

import ConfirmationNumberTwoToneIcon from '@mui/icons-material/ConfirmationNumberTwoTone';
import LocalActivityTwoToneIcon from '@mui/icons-material/LocalActivityTwoTone';
import AirplaneTicketTwoToneIcon from '@mui/icons-material/AirplaneTicketTwoTone';
import TimerTwoToneIcon from '@mui/icons-material/TimerTwoTone';
import TuneTwoToneIcon from '@mui/icons-material/TuneTwoTone';
import AddIcon from '@mui/icons-material/Add';

import _ from 'lodash';
import { smartlyHeader } from 'pages/Smartly/constant';
import CardList from 'pages/Smartly/components/CardList';

const StyledCard = styled(Card)({
  boxShadow:
    'rgba(159, 162, 191, 0.18) 0px 9px 16px, rgba(159, 162, 191, 0.32) 0px 2px 2px',
  borderRadius: '10px',
});

export default function Main() {
  const { list, errorList, statistics, errorStatistics } =
    useContext(SmartlyContext);
  return (
    <Grid
      container
      sx={{ overflow: 'hidden', height: '100vh', backgroundColor: '#f7f8fa' }}
    >
      {/* left panel */}
      <Grid item xs={9}>
        <Box
          px={5}
          py={4}
          sx={{
            height: '100vh',
            overflowY: 'auto',
          }}
        >
          {/* Summary  */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Box sx={{ marginBottom: '-15px' }}>
              <Typography variant="h6" fontWeight={800} lineHeight={0}>
                Brief Summary
              </Typography>
              <Typography variant="caption">
                Overall summary for this week.
              </Typography>
            </Box>
            <Box>
              <Button
                variant="contained"
                disableElevation
                disableFocusRipple
                disableRipple
                disableTouchRipple
                color="secondary"
                startIcon={<AddIcon />}
              >
                Create task
              </Button>
            </Box>
          </Box>

          {/* Summary list */}
          <Grid container spacing={2} mb={4}>
            <Grid item xs={4}>
              <StyledCard
                elevation={0}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  padding: '2em',
                }}
              >
                <ConfirmationNumberTwoToneIcon
                  sx={{ fontSize: '2.5em' }}
                  color="secondary"
                />
                <Typography variant="h3" fontWeight={800}>
                  {_.isEmpty(list) ||
                  _.isUndefined(statistics?.created_tasks_this_week) ? (
                    0
                  ) : (
                    <CountUp
                      start={0}
                      end={statistics?.created_tasks_this_week}
                      duration={1}
                    />
                  )}
                </Typography>
                <Typography variant="body1" fontWeight={700}>
                  Created tasks
                </Typography>
                <Typography variant="caption" color="#929292">
                  {_.isEmpty(list) ||
                  _.isUndefined(statistics?.created_tasks_last_week)
                    ? 0
                    : statistics?.created_tasks_last_week}
                  &nbsp;tasks created last week
                </Typography>
              </StyledCard>
            </Grid>
            <Grid item xs={4}>
              <StyledCard
                elevation={0}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  padding: '2em',
                }}
              >
                <LocalActivityTwoToneIcon
                  sx={{ fontSize: '2.5em' }}
                  color="success"
                />
                <Typography variant="h3" fontWeight={800}>
                  {_.isEmpty(list) ||
                  _.isUndefined(statistics?.completed_this_week) ? (
                    0
                  ) : (
                    <CountUp
                      start={0}
                      end={statistics?.completed_this_week}
                      duration={1}
                    />
                  )}
                </Typography>
                <Typography variant="body1" fontWeight={700}>
                  Completed tasks
                </Typography>
                <Typography variant="caption" color="#929292">
                  {_.isUndefined(statistics?.completed_tasks_last_week)
                    ? 0
                    : statistics?.completed_tasks_last_week}
                  &nbsp;tasks completed last week
                </Typography>
              </StyledCard>
            </Grid>
            <Grid item xs={4}>
              <StyledCard
                elevation={0}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  padding: '2.65em',
                }}
              >
                <AirplaneTicketTwoToneIcon
                  sx={{ fontSize: '2.5em' }}
                  color="warning"
                />
                <Typography variant="h3" fontWeight={800}>
                  {_.isUndefined(statistics?.task_in_progress) ? (
                    0
                  ) : (
                    <CountUp
                      start={0}
                      end={statistics?.task_in_progress}
                      duration={1}
                    />
                  )}
                </Typography>
                <Typography variant="body1" fontWeight={700}>
                  Tasks In-Progress
                </Typography>
              </StyledCard>
            </Grid>
          </Grid>

          {/* All task */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Box marginBottom="-14px">
              <Typography
                variant="h6"
                fontWeight={800}
                lineHeight={0}
                sx={{ paddingTop: '0.4em 0 0' }}
              >
                All Tasks
              </Typography>
              <Typography variant="caption">
                List of tasks created by smartly.
              </Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Grid
                container
                spacing={1}
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <Grid item>
                  <TextField size="small" placeholder="Search..." />
                </Grid>
                <Grid item>
                  <Button variant="outlined" startIcon={<TuneTwoToneIcon />}>
                    Filter
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>

          {/* task list header */}
          <Grid container spacing={1}>
            {smartlyHeader?.map((data, index) => (
              <Grid item xs={data?.grid} key={index}>
                <Typography variant="button" fontWeight={800}>
                  {data?.label}
                </Typography>
              </Grid>
            ))}
          </Grid>

          {/* Car list */}
          <Grid container spacing={1}>
            {list?.data?.map((data) => (
              <Grid item xs={12} key={data?.id}>
                <CardList data={data} />
              </Grid>
            ))}
          </Grid>

          {/* footer paginate */}
          <Box
            mt={2}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="caption" fontWeight={700} color="#929292">
              Showing {list?.from} - {list?.to} of {list?.total}
            </Typography>
            <Pagination
              count={list?.last_page}
              variant="outlined"
              shape="rounded"
            />
          </Box>
        </Box>
      </Grid>

      {/* right panel */}
      <Grid item xs={3} sx={{ padding: '2em 2em 2em 0' }}>
        <StyledCard
          elevation={0}
          sx={{
            background: '#fff',
            height: 'calc(100vh - 4em)',
            padding: '0.5em 1.5em',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              padding: '2em 0',
            }}
          >
            <TimerTwoToneIcon sx={{ fontSize: '5em' }} color="error" />
            <Typography variant="h3" fontWeight={800}>
              {_.isUndefined(statistics?.total_time_log)
                ? '00:00:00'
                : statistics?.total_time_log}
            </Typography>
            <Typography variant="body1" fontWeight={700}>
              Total time log
            </Typography>
            <Typography variant="caption" color="secondary" fontWeight={700}>
              View summary
            </Typography>
          </Box>
          <Box>
            <Typography variant="button" fontWeight={800}>
              Recent task handled
            </Typography>
            <Box>
              <Typography variant="caption">
                Template Upload - tiktok - test campaign name
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption">
                Template Upload - tiktok - test campaign name
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption">
                Template Upload - tiktok - test campaign name
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="button" fontWeight={800}>
              Available Resources
            </Typography>
            <Box>
              <Typography variant="caption">
                Template Upload - tiktok - test campaign name
              </Typography>
            </Box>
          </Box>
        </StyledCard>
      </Grid>
    </Grid>
  );
}
