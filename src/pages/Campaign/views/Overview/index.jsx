import React, { useContext } from 'react';
import { Box, Grid, Typography, styled } from '@mui/material';
import CampaignOverviewContext from 'pages/Campaign/context';
import { overviewDetails, taskTable } from 'pages/Campaign/constant';
import _ from 'lodash';
import TaskTree from 'pages/Campaign/components/TaskTree';

const StyledTitle = styled(Typography)({
  borderBottom: '4px solid',
  display: 'inline-block',
  height: '1.4em',
  fontWeight: 800,
});

const StyledTypography = styled(Typography)({
  lineHeight: 'normal',
  cursor: 'default',
});

export default function Overview() {
  const { overview, tasks, handlePopover } = useContext(
    CampaignOverviewContext
  );

  return (
    <Box>
      <Grid container flexWrap="nowrap">
        <Grid item lg={3}>
          <StyledTitle
            variant="h6"
            mb={2}
            sx={{ borderBottomColor: 'rgb(21 166 201)' }}
          >
            Overview
          </StyledTitle>
          {overviewDetails.map((data, index) => (
            <Box mb={1} key={index}>
              <Box>
                <Typography
                  variant="caption"
                  fontWeight={800}
                  textTransform="uppercase"
                  color="#3f0b9d"
                >
                  {data?.label}
                </Typography>
              </Box>
              <Box>
                {data?.type === 'date_time' ? (
                  _.isEmpty(overview[data?.key]) ? (
                    <Typography variant="body1" color="#00000047">
                      YYYY-MM-DD HH:MM:SS
                    </Typography>
                  ) : (
                    <Typography variant="body1">
                      {overview[data?.key]}
                    </Typography>
                  )
                ) : _.isEmpty(overview[data?.key]) ? (
                  <Typography variant="body1" color="#00000047">
                    Not set in Platform
                  </Typography>
                ) : (
                  <Typography variant="body1">
                    {data?.type === 'text_replace'
                      ? _.capitalize(overview[data?.key]?.replace(/_/g, ' '))
                      : overview[data?.key]}
                  </Typography>
                )}
              </Box>
            </Box>
          ))}
        </Grid>
        <Grid item lg={9} sx={{ borderLeft: '1px solid #ececec' }}>
          <Box mx={2}>
            <StyledTitle
              variant="h6"
              mb={2}
              sx={{ borderBottomColor: 'rgb(241 96 121)' }}
            >
              Tasks
            </StyledTitle>
            <Box overflow="auto" mt={1}>
              {/* Header */}
              <Box display="inline-flex">
                {taskTable?.map((header, index) => (
                  <Box
                    width={header?.width}
                    margin="0px 2px 3px 0"
                    key={index}
                    textAlign={header?.align}
                  >
                    <StyledTypography variant="body2" fontWeight={700}>
                      {header?.label}
                    </StyledTypography>
                  </Box>
                ))}
              </Box>
              {!_.isEmpty(tasks) ? (
                tasks?.map((data, index) => (
                  <TaskTree
                    key={index}
                    task={data}
                    handlePopover={handlePopover}
                    type="task"
                  />
                ))
              ) : (
                <Box>No task created for this campaign.</Box>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
