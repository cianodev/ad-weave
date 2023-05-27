import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import moment from 'moment';

import { Link, useLocation } from 'react-router-dom';

import {
  Box,
  IconButton,
  Typography,
  AvatarGroup,
  styled,
  Tooltip,
  Avatar,
  Chip,
} from '@mui/material';

import Groups2TwoToneIcon from '@mui/icons-material/Groups2TwoTone';
import TagTwoToneIcon from '@mui/icons-material/TagTwoTone';

import { appColors } from 'theme/variables';

import { stringAvatar } from 'hooks';

const StyledTypography = styled(Typography)({
  lineHeight: 'normal',
  cursor: 'default',
});

const StyledBox = styled(Box)({
  margin: '0px 2px 2px 0',
  padding: '6px',
  backgroundColor: '#e6e6e6',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledAvatarGroup = styled(AvatarGroup)({
  justifyContent: 'center',
  '& .MuiAvatarGroup-avatar': {
    width: 20,
    height: 20,
    fontSize: 12,
    marginLeft: '-5px',
  },
});

export default function SubTask({ subTask, handlePopover, type }) {
  const location = useLocation();

  return (
    <Box display="inline-flex">
      {/* Name */}
      <StyledBox
        width={type === 'task' ? 290 : 262}
        borderLeft="4px solid #F22076"
        sx={{
          justifyContent: 'flex-start',
          textDecoration: 'none',
          marginLeft: '11px',
          ':hover': {
            backgroundColor: '#c9c6c6b0',
          },
        }}
        component={Link}
        to={{
          pathname: `/${subTask?.rel_type}/${subTask?.id}`,
          state: {
            background: location,
            type: 'subtask',
            subtask: true,
          },
        }}
        title={subTask?.name}
      >
        <StyledTypography noWrap fontSize="13px" sx={{ cursor: 'pointer' }}>
          {subTask?.name}
        </StyledTypography>
      </StyledBox>
      {/* Status */}
      <StyledBox
        width={100}
        sx={{
          backgroundColor:
            appColors?.status[
              _.camelCase(
                `${subTask?.status_name?.toString()}`?.replace(/_/g, ' ')
              )
            ],
          color: '#fff',
          textTransform: 'capitalize',
          textAlign: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
        onClick={(e) =>
          handlePopover(
            e,
            type === 'task' ? 'subtask_status' : 'subtask_status_campaign',
            subTask?.status_id,
            subTask?.id,
            subTask?.channel_id
          )
        }
      >
        <StyledTypography
          fontSize="13px"
          sx={{
            cursor: 'pointer',
          }}
          noWrap
          color="#fff"
        >
          {subTask?.status_name?.toString()?.replace(/_/g, ' ')}
        </StyledTypography>
      </StyledBox>
      {/* Assignee */}
      <StyledBox
        width={type === 'task' ? 150 : 232}
        sx={{
          cursor: 'pointer',
          ':hover': {
            backgroundColor: '#c9c6c6b0',
          },
        }}
        onClick={(e) => handlePopover(e, 'task_assignee')}
      >
        <StyledAvatarGroup max={7}>
          {!_.isEmpty(subTask?.assignees) ? (
            subTask?.assignees?.map((data) => (
              <Tooltip
                key={data?.id}
                title={data?.name}
                componentsProps={{
                  tooltip: {
                    sx: {
                      lineHeight: 'normal',
                      margin: '0 !important',
                    },
                  },
                }}
              >
                <Avatar {...stringAvatar(data?.name, {})} src={data?.avatar} />
              </Tooltip>
            ))
          ) : (
            <Tooltip
              title="Add a follower"
              componentsProps={{
                tooltip: {
                  sx: {
                    lineHeight: 'normal',
                    margin: '0 !important',
                  },
                },
              }}
            >
              <IconButton
                sx={{
                  border: '1px dashed #989898',
                  width: '24px !important',
                  height: '24px !important',
                }}
                size="small"
              >
                <Groups2TwoToneIcon />
              </IconButton>
            </Tooltip>
          )}
        </StyledAvatarGroup>
      </StyledBox>
      {/* Tags */}
      <StyledBox
        width={150}
        sx={{
          cursor: 'pointer',
          ':hover': {
            backgroundColor: '#c9c6c6b0',
          },
        }}
        onClick={(e) => handlePopover(e, 'subtask_tags')}
      >
        {!_.isEmpty(subTask?.tags) ? (
          'tag'
        ) : (
          <Chip
            icon={<TagTwoToneIcon />}
            label="No tag set"
            size="small"
            variant="outlined"
            sx={{
              height: '18px',
              borderRadius: '5px',
              borderColor: '#d5d5d5',
              cursor: 'pointer',
              '.MuiChip-icon': {
                color: '#8e8c8c',
                fontSize: '13px',
              },
              '.MuiChip-label': {
                fontSize: '10px',
                color: '#8e8c8c',
              },
            }}
          />
        )}
      </StyledBox>
      {/* Due Date */}
      <StyledBox
        width={type === 'task' ? 180 : 200}
        sx={{
          cursor: 'pointer',
          ':hover': {
            backgroundColor: '#c9c6c6b0',
          },
        }}
        onClick={(e) => handlePopover(e, 'task_due_date')}
      >
        <StyledTypography
          noWrap
          fontSize="13px"
          variant="caption"
          color={'#8e8c8c'}
          sx={{ cursor: 'pointer' }}
        >
          {_.isEmpty(subTask?.due_date)
            ? 'MM-DD-YYYY HH:mm:ss'
            : moment(subTask?.due_date).format('MM-DD-YYYY HH:mm:ss')}
        </StyledTypography>
      </StyledBox>
      {/* Delivery Date */}
      <StyledBox
        width={type === 'task' ? 180 : 200}
        sx={{
          cursor: 'pointer',
          ':hover': {
            backgroundColor: '#c9c6c6b0',
          },
        }}
        onClick={(e) => handlePopover(e, 'task_delivery_date')}
      >
        <StyledTypography
          noWrap
          fontSize="13px"
          variant="caption"
          color={'#8e8c8c'}
          sx={{ cursor: 'pointer' }}
        >
          {_.isEmpty(subTask?.delivery_date)
            ? 'MM-DD-YYYY HH:mm:ss'
            : moment(subTask?.delivery_date).format('MM-DD-YYYY HH:mm:ss')}
        </StyledTypography>
      </StyledBox>
      {/* Watchers */}
      <StyledBox
        width={type === 'task' ? 150 : 232}
        sx={{
          cursor: 'pointer',
          ':hover': {
            backgroundColor: '#c9c6c6b0',
          },
        }}
        onClick={(e) => handlePopover(e, 'task_watcher')}
      >
        <StyledAvatarGroup max={7}>
          {!_.isEmpty(subTask?.watchers) ? (
            subTask?.watchers?.map((data) => (
              <Tooltip
                key={data?.id}
                title={data?.name}
                componentsProps={{
                  tooltip: {
                    sx: {
                      lineHeight: 'normal',
                      margin: '0 !important',
                    },
                  },
                }}
              >
                <Avatar {...stringAvatar(data?.name, {})} src={data?.avatar} />
              </Tooltip>
            ))
          ) : (
            <Tooltip
              title="Add a follower"
              componentsProps={{
                tooltip: {
                  sx: {
                    lineHeight: 'normal',
                    margin: '0 !important',
                  },
                },
              }}
            >
              <IconButton
                sx={{
                  border: '1px dashed #989898',
                  width: '24px !important',
                  height: '24px !important',
                }}
                size="small"
              >
                <Groups2TwoToneIcon />
              </IconButton>
            </Tooltip>
          )}
        </StyledAvatarGroup>
      </StyledBox>
      {/* Date Created */}
      <StyledBox width={180}>
        <StyledTypography
          noWrap
          fontSize="13px"
          variant="caption"
          color={'#8e8c8c'}
        >
          {_.isEmpty(subTask?.date_created)
            ? 'MM-DD-YYYY HH:mm:ss'
            : moment(subTask?.date_created).format('MM-DD-YYYY HH:mm:ss')}
        </StyledTypography>
      </StyledBox>
    </Box>
  );
}

SubTask.propTypes = {
  subTask: PropTypes.any,
  handlePopover: PropTypes.func,
  type: PropTypes.string,
};
