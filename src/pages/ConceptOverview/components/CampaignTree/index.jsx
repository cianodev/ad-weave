import React, { useState } from 'react';

import _ from 'lodash';

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import {
  Box,
  AvatarGroup,
  Avatar,
  Typography,
  Tooltip,
  styled,
  IconButton,
  Chip,
  Collapse,
} from '@mui/material';

import TaskTree from 'pages/ConceptOverview/components/TaskTree';

import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';

import AutoModeTwoToneIcon from '@mui/icons-material/AutoModeTwoTone';
import Groups2TwoToneIcon from '@mui/icons-material/Groups2TwoTone';
import TagTwoToneIcon from '@mui/icons-material/TagTwoTone';

import { appColors } from 'theme/variables';
import { stringAvatar } from 'hooks';

import { campaignTaskTable, channels } from 'pages/ConceptOverview/constant';

import moment from 'moment';

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

const StyledTypography = styled(Typography)({
  lineHeight: 'normal',
  cursor: 'default',
});

const StyledCollapse = styled(Collapse)({
  borderLeft: '1px dashed #757575',
  paddingLeft: '1em',
  marginLeft: '0.8em',
});

export default function CampaignTree({
  campaign,
  handlePopover,
  handleCampaignTasks,
}) {
  const [openCollapse, setOpenCollapse] = useState(false);

  const handleCollapse = (campaignId) => {
    !openCollapse && handleCampaignTasks(campaignId);
    setOpenCollapse(!openCollapse);
  };

  return (
    <>
      <Box key={campaign?.id} display="inline-flex">
        <StyledBox width={27} sx={{ backgroundColor: '#f3f5f9' }}>
          {campaign?.tasks_count <= 0 ? (
            <IconButton size="small" disabled sx={{ opacity: 0, padding: 0 }}>
              <CheckBoxOutlineBlankOutlinedIcon />
            </IconButton>
          ) : (
            <IconButton
              size="small"
              onClick={() => handleCollapse(campaign?.id)}
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
          width={300}
          borderLeft="4px solid #25165b"
          sx={{
            justifyContent: 'flex-start',
            textDecoration: 'none',
            ':hover': {
              backgroundColor: '#c9c6c6b0',
            },
          }}
          component={Link}
          to={`/projects/${campaign?.partner_id}/concept/${campaign?.concept_id}/campaign?campaignId=${campaign?.id}`}
        >
          <StyledTypography noWrap fontSize="13px" sx={{ cursor: 'pointer' }}>
            {campaign?.name}
          </StyledTypography>
        </StyledBox>

        {/* Status */}
        <StyledBox
          width={100}
          sx={{
            backgroundColor:
              appColors?.status[
                _.camelCase(`${campaign?.status}`?.replace(/_/g, ' '))
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
              'campaign_status',
              campaign?.status_id,
              campaign?.id
            )
          }
        >
          <StyledTypography
            fontSize="13px"
            sx={{ cursor: 'pointer' }}
            noWrap
            color="#fff"
          >
            {campaign?.status?.replace(/_/g, ' ')}
          </StyledTypography>
        </StyledBox>

        {/* Channel */}
        <StyledBox width={80}>
          {!_.isEmpty(campaign?.channel) &&
          campaign?.channel?.toLowerCase() !== 'no channel' ? (
            <Tooltip
              title={_.startCase(
                _.filter(
                  channels,
                  (channel) => channel?.label === campaign?.channel
                )[0]?.label
              )}
              componentsProps={{
                tooltip: {
                  sx: { lineHeight: 'normal', margin: '0 !important' },
                },
              }}
            >
              {
                _.filter(
                  channels,
                  (channel) => channel?.label === campaign?.channel
                )[0]?.content
              }
            </Tooltip>
          ) : (
            <Typography variant="caption" color="#9f9f9f">
              No Channel
            </Typography>
          )}
        </StyledBox>

        {/* Watchers */}
        <StyledBox
          width={150}
          sx={{
            cursor: 'pointer',
            ':hover': {
              backgroundColor: '#c9c6c6b0',
            },
          }}
          onClick={(e) =>
            handlePopover(
              e,
              'campaign_followers',
              campaign?.followers,
              campaign?.id
            )
          }
        >
          <StyledAvatarGroup max={7}>
            {!_.isEmpty(campaign?.followers) ? (
              campaign?.followers?.map((follower) => (
                <Tooltip
                  key={follower?.id}
                  title={follower?.name}
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
                    {...stringAvatar(follower?.name, {})}
                    src={follower?.avatar}
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
          onClick={(e) => handlePopover(e, 'campaign_tags')}
        >
          {!_.isEmpty(campaign?.tags) ? (
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

        {/* Delivery Type */}
        <StyledBox width={120} sx={{ textTransform: 'capitalize' }}>
          <StyledTypography
            noWrap
            fontSize="13px"
            color={
              _.isEmpty(campaign?.delivery_type)
                ? 'error'
                : campaign?.delivery_type?.toLowerCase() === 'non_trafficked'
                ? '#7e14e6'
                : '#4caf50'
            }
          >
            {_.isEmpty(campaign?.delivery_type)
              ? 'Not Set'
              : campaign?.delivery_type?.toLowerCase()?.replace(/_/g, ' ')}
          </StyledTypography>
        </StyledBox>

        {/* Delivery Date */}
        <StyledBox
          width={180}
          sx={{
            cursor: 'pointer',
            ':hover': {
              backgroundColor: '#c9c6c6b0',
            },
          }}
          onClick={(e) =>
            handlePopover(
              e,
              'campaign_delivery_date',
              campaign?.delivery_date,
              campaign?.id
            )
          }
        >
          <StyledTypography
            noWrap
            fontSize="13px"
            variant="caption"
            color={_.isEmpty(campaign?.delivery_date) ? '#8e8c8c' : 'primary'}
            sx={{ cursor: 'pointer' }}
          >
            {_.isEmpty(campaign?.delivery_date)
              ? 'MM-DD-YYYY HH:mm:ss'
              : moment(campaign?.delivery_date).format('MM-DD-YYYY HH:mm:ss')}
          </StyledTypography>
        </StyledBox>

        {/* Personalization Type */}
        <StyledBox width={150} sx={{ textTransform: 'capitalize' }}>
          <StyledTypography
            noWrap
            fontSize="13px"
            color={
              _.isEmpty(campaign?.personalization_type) ? 'error' : 'normal'
            }
          >
            {_.isEmpty(campaign?.personalization_type)
              ? 'Not Set'
              : campaign?.personalization_type
                  ?.toLowerCase()
                  ?.replace(/_/g, ' ')}
          </StyledTypography>
        </StyledBox>

        {/* Launch Date */}
        <StyledBox
          width={180}
          sx={{
            cursor: 'pointer',
            ':hover': {
              backgroundColor: '#c9c6c6b0',
            },
          }}
          onClick={(e) =>
            handlePopover(
              e,
              'campaign_launch_date',
              campaign?.launch_date,
              campaign?.id
            )
          }
        >
          <StyledTypography
            noWrap
            fontSize="13px"
            variant="caption"
            color={_.isEmpty(campaign?.launch_date) ? '#8e8c8c' : 'primary'}
            sx={{ cursor: 'pointer' }}
          >
            {_.isEmpty(campaign?.launch_date)
              ? 'MM-DD-YYYY HH:mm:ss'
              : moment(campaign?.launch_date).format('MM-DD-YYYY HH:mm:ss')}
          </StyledTypography>
        </StyledBox>

        {/* Date Created */}
        <StyledBox width={180}>
          <StyledTypography
            noWrap
            fontSize="13px"
            variant="caption"
            color={'#8e8c8c'}
          >
            {_.isEmpty(campaign?.date_created)
              ? 'MM-DD-YYYY HH:mm:ss'
              : moment(campaign?.date_created).format('MM-DD-YYYY HH:mm:ss')}
          </StyledTypography>
        </StyledBox>
      </Box>

      <StyledCollapse in={openCollapse}>
        {/* Task List */}
        <Box mt={1}>
          {/* Header */}
          <Box display="inline-flex">
            {campaignTaskTable?.map((header, index) => (
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

          {campaign?.tasks_count > 0 ? (
            campaign?.tasks?.map((data) => (
              <TaskTree
                key={data?.id}
                task={data}
                handlePopover={handlePopover}
                type="campaign"
              />
            ))
          ) : (
            <Box>No Value</Box>
          )}
        </Box>
      </StyledCollapse>
    </>
  );
}

CampaignTree.propTypes = {
  campaign: PropTypes.any,
  handlePopover: PropTypes.func,
  handleCampaignTasks: PropTypes.func,
};
