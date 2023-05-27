import React from 'react';

import _ from 'lodash';

import { Link, useLocation } from 'react-router-dom';

import PropTypes from 'prop-types';

import { Avatar, Card, Chip, Grid, Typography, styled } from '@mui/material';
import FlagTwoToneIcon from '@mui/icons-material/FlagTwoTone';

import { stringAvatar } from 'hooks';

const StyledCard = styled(Card)({
  boxShadow:
    'rgba(159, 162, 191, 0.18) 0px 9px 16px, rgba(159, 162, 191, 0.32) 0px 2px 2px',
  borderRadius: '10px',
});

export default function CardList({ data }) {
  const location = useLocation();

  return (
    <Link
      to={{
        pathname: `/smartly/${data?.rel_type}/${data?.id}`,
        state: {
          background: location,
          type: data?.rel_type,
          subtask: data?.rel_type === 'subtask',
        },
      }}
      style={{ textDecoration: 'none' }}
    >
      <StyledCard
        elevation={0}
        sx={{
          padding: '1em',
          borderLeft: '3px solid',
          borderColor: data?.rel_type === 'task' ? '#5025C4' : '#F22076',
        }}
        className="smartly-task-card"
      >
        <Grid container spacing={2}>
          {/* task name */}
          <Grid
            item
            xs={3}
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              alignItems: 'center',
            }}
          >
            <Typography variant="caption" fontWeight={700}>
              {data?.name}
            </Typography>
          </Grid>
          {/* status */}
          <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="caption">
              <Chip
                label={data?.status}
                color="primary"
                size="small"
                sx={{ borderRadius: '4px' }}
              />
            </Typography>
          </Grid>
          {/* Assignee */}
          <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
            {_.isEmpty(data?.assignees) ? (
              <Typography variant="caption">No assignee</Typography>
            ) : (
              data?.assignees?.map((data) => (
                <Avatar
                  key={data?.user_id}
                  {...stringAvatar(data?.user, {
                    width: 24,
                    height: 24,
                    fontSize: '12px',
                  })}
                />
              ))
            )}
          </Grid>
          {/* Priority */}
          <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
            <Chip
              icon={<FlagTwoToneIcon />}
              label={data?.priority}
              size="small"
              sx={{ textTransform: 'capitalize' }}
              variant="outlined"
            />
          </Grid>
          {/* due date */}
          <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="caption">{data?.due_date}</Typography>
          </Grid>
          {/* followers */}
          <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
            {_.isEmpty(data?.followers) ? (
              <Typography variant="caption">No follower</Typography>
            ) : (
              data?.assignees?.map((data) => (
                <Avatar
                  key={data?.user_id}
                  {...stringAvatar(data?.user, {
                    width: 24,
                    height: 24,
                    fontSize: '12px',
                  })}
                />
              ))
            )}
          </Grid>
        </Grid>
      </StyledCard>
    </Link>
  );
}

CardList.propTypes = {
  data: PropTypes.any,
};
