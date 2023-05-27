import React, { useState } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import moment from 'moment';

import { Link, useLocation } from 'react-router-dom';

import {
  Box,
  IconButton,
  Typography,
  AvatarGroup,
  Collapse,
  styled,
  Tooltip,
  Avatar,
  Chip,
} from '@mui/material';

import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import TagTwoToneIcon from '@mui/icons-material/TagTwoTone';
import Groups2TwoToneIcon from '@mui/icons-material/Groups2TwoTone';

import SubTask from 'pages/ConceptOverview/components/SubTask';

import {
  subtaskTable,
  campaignSubtaskTable,
} from 'pages/ConceptOverview/constant';

import { stringAvatar } from 'hooks';

import { appColors } from 'theme/variables';

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

const StyledCollapse = styled(Collapse)({
  borderLeft: '1px dashed #757575',
  paddingLeft: '1em',
  marginLeft: '0.8em',
});

export default function TaskTree({ task, handlePopover, type }) {
  const location = useLocation();
  const [openCollapse, setOpenCollapse] = useState(false);

  const handleCollapse = () => {
    setOpenCollapse(!openCollapse);
  };

  return (
    <>
      <Box display="inline-flex">
        <StyledBox width={27} sx={{ backgroundColor: '#f3f5f9' }}>
          {_.isEmpty(task?.subtasks) ? (
            <IconButton size="small" disabled sx={{ opacity: 0, padding: 0 }}>
              <CheckBoxOutlineBlankOutlinedIcon />
            </IconButton>
          ) : (
            <IconButton
              size="small"
              onClick={handleCollapse}
              sx={{ padding: 0 }}
            >
              {openCollapse ? (
                <IndeterminateCheckBoxOutlinedIcon />
              ) : (
                <AddBoxOutlinedIcon />
              )}
            </IconButton>
          )}
        </StyledBox>
        {/* Name */}
        <StyledBox
          width={type === 'task' ? 300 : 272}
          borderLeft="4px solid #5C52C3"
          sx={{
            justifyContent: 'flex-start',
            textDecoration: 'none',
            ':hover': {
              backgroundColor: '#c9c6c6b0',
            },
          }}
          component={Link}
          to={{
            pathname: `/${task?.rel_type}/${task?.id}`,
            state: {
              background: location,
              type: 'task',
              subtask: false,
            },
          }}
          title={task?.name}
        >
          <StyledTypography
            noWrap
            fontSize="13px"
            sx={{
              cursor: 'pointer',
            }}
          >
            {task?.name}
          </StyledTypography>
        </StyledBox>
        {/* Status */}
        <StyledBox
          width={100}
          sx={{
            backgroundColor:
              appColors?.status[
                _.camelCase(
                  `${task?.status_name?.toString()}`?.replace(/_/g, ' ')
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
              type === 'task' ? 'task_status' : 'task_status_campaign',
              task?.status_id,
              task?.id,
              task?.channel_id
            )
          }
        >
          <StyledTypography
            fontSize="13px"
            sx={{ cursor: 'pointer' }}
            noWrap
            color="#fff"
          >
            {task?.status_name?.toString()?.replace(/_/g, ' ')}
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
          onClick={(e) =>
            handlePopover(
              e,
              'task_assignees',
              task?.assignees ?? [],
              task?.id,
              task?.channel_id
            )
          }
        >
          <StyledAvatarGroup max={7}>
            {!_.isEmpty(task?.assignees) ? (
              task?.assignees?.map((data) => (
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
                  <Avatar
                    {...stringAvatar(data?.name, {})}
                    src={data?.avatar}
                  />
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
          onClick={(e) => handlePopover(e, 'task_tags')}
        >
          {!_.isEmpty(task?.tags) ? (
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
          onClick={(e) =>
            handlePopover(
              e,
              'task_due_date',
              task?.due_date,
              task?.id,
              task?.channel_id
            )
          }
        >
          <StyledTypography
            noWrap
            fontSize="13px"
            variant="caption"
            color={'#8e8c8c'}
            sx={{ cursor: 'pointer' }}
          >
            {_.isEmpty(task?.due_date)
              ? 'MM-DD-YYYY HH:mm:ss'
              : moment(task?.due_date).format('MM-DD-YYYY HH:mm:ss')}
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
          onClick={(e) =>
            handlePopover(
              e,
              'task_delivery_date',
              task?.delivery_date,
              task?.id,
              task?.channel_id
            )
          }
        >
          <StyledTypography
            noWrap
            fontSize="13px"
            variant="caption"
            color={'#8e8c8c'}
            sx={{ cursor: 'pointer' }}
          >
            {_.isEmpty(task?.delivery_date)
              ? 'MM-DD-YYYY HH:mm:ss'
              : moment(task?.delivery_date).format('MM-DD-YYYY HH:mm:ss')}
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
          onClick={(e) =>
            handlePopover(
              e,
              'task_watchers',
              task?.watchers ?? [],
              task?.id,
              task?.channel_id
            )
          }
        >
          <StyledAvatarGroup max={7}>
            {!_.isEmpty(task?.watchers) ? (
              task?.watchers?.map((data) => (
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
                  <Avatar
                    {...stringAvatar(data?.name, {})}
                    src={data?.avatar}
                  />
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
            {_.isEmpty(task?.date_created)
              ? 'MM-DD-YYYY HH:mm:ss'
              : moment(task?.date_created).format('MM-DD-YYYY HH:mm:ss')}
          </StyledTypography>
        </StyledBox>
      </Box>
      <StyledCollapse in={openCollapse}>
        <Box mt={1}>
          {/* Header */}
          <Box display="inline-flex">
            {(type === 'task' ? subtaskTable : campaignSubtaskTable)?.map(
              (header, index) => (
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
              )
            )}
          </Box>
          {/* Subtask */}

          {!_.isEmpty(task?.subtasks) ? (
            task?.subtasks?.map((data) => (
              <SubTask
                key={data?.id}
                subTask={data}
                handlePopover={handlePopover}
                type={type}
              />
            ))
          ) : (
            <Box>No Subtask</Box>
          )}
        </Box>
      </StyledCollapse>
    </>
  );
}

TaskTree.propTypes = {
  task: PropTypes.any,
  handlePopover: PropTypes.func,
  type: PropTypes.string,
};
