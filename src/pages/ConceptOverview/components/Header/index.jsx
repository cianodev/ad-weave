import React, { useContext } from 'react';

import _ from 'lodash';

import ConceptOverviewContext from 'pages/ConceptOverview/context';

import {
  Box,
  Button,
  AvatarGroup,
  Avatar,
  Tooltip,
  Divider,
  Typography,
  styled,
  IconButton,
} from '@mui/material';

import Inventory2TwoToneIcon from '@mui/icons-material/Inventory2TwoTone';
import InsertLinkTwoToneIcon from '@mui/icons-material/InsertLinkTwoTone';
import Groups3TwoToneIcon from '@mui/icons-material/Groups3TwoTone';

import { stringAvatar } from 'hooks';

import {
  googleDisplay,
  googleVideo,
  metaStatic,
  metaVideo,
  youtubeVideo,
} from 'pages/ConceptOverview/constant';

import { appColors } from 'theme/variables';

import moment from 'moment';
import { useParams, Link } from 'react-router-dom';

const StyledTypography = styled(Typography)({
  lineHeight: 'normal',
  cursor: 'default',
});

export default function Header() {
  const { partnerId, conceptId, type } = useParams();

  const { conceptOverview, handlePopover } = useContext(ConceptOverviewContext);

  return (
    <Box padding="1em 1.2em 0">
      {/* Title */}
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Button
            variant="contained"
            disableElevation
            disableFocusRipple
            disableRipple
            disableTouchRipple
            size="small"
            sx={{
              marginRight: '1em',
              textTransform: 'capitalize',
              backgroundColor:
                appColors?.status[
                  _.camelCase(
                    conceptOverview?.status?.replace(/_/g, ' ').toLowerCase()
                  )
                ],
              ':hover': {
                backgroundColor:
                  appColors?.status[
                    _.camelCase(
                      conceptOverview?.status?.replace(/_/g, ' ').toLowerCase()
                    )
                  ],
              },
            }}
            onClick={(e) =>
              handlePopover(
                e,
                'concept_status',
                conceptOverview?.status_id,
                conceptId
              )
            }
          >
            {conceptOverview?.status?.replace(/_/g, ' ')}
          </Button>
          <StyledTypography
            className="header__title--overlay"
            variant="h6"
            fontWeight={800}
            color="primary"
            noWrap
            sx={{ width: '400px' }}
          >
            {conceptOverview?.name}
          </StyledTypography>
        </Box>
        <Box
          onClick={(e) =>
            handlePopover(
              e,
              'concept_followers',
              conceptOverview?.followers,
              conceptId
            )
          }
        >
          {_.isEmpty(conceptOverview?.followers) ? (
            <Tooltip
              title="Add a follower"
              componentsProps={{
                tooltip: {
                  sx: { lineHeight: 'normal', margin: '0 !important' },
                },
              }}
            >
              <IconButton sx={{ border: '1px dashed #989898' }} size="small">
                <Groups3TwoToneIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <AvatarGroup
              max={100}
              onClick={() => console.log('Members')}
              sx={{ cursor: 'pointer' }}
            >
              {conceptOverview?.followers?.map((data) => (
                <Tooltip
                  key={data?.id}
                  title={data?.name}
                  componentsProps={{
                    tooltip: {
                      sx: { lineHeight: 'normal', margin: '0 !important' },
                    },
                  }}
                >
                  <Avatar
                    {...stringAvatar(data?.name, {
                      width: 24,
                      height: 24,
                      fontSize: '12px',
                    })}
                    src={data?.avatar}
                  />
                </Tooltip>
              ))}
            </AvatarGroup>
          )}
        </Box>
      </Box>
      {/* Details */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        my={1}
      >
        <Box display="flex" alignItems="center">
          <Box>
            <Tooltip
              title="Date Created"
              componentsProps={{
                tooltip: {
                  sx: { lineHeight: 'normal', margin: '0 !important' },
                },
              }}
            >
              <StyledTypography variant="caption" noWrap>
                {moment(conceptOverview?.created_at).format('LLL')}
              </StyledTypography>
            </Tooltip>
          </Box>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{ margin: '0 0.4em' }}
          />
          <Box>
            <Tooltip
              title="Partner Group"
              componentsProps={{
                tooltip: {
                  sx: { lineHeight: 'normal', margin: '0 !important' },
                },
              }}
            >
              <Link
                to={{
                  pathname: `https://beta.ad-lib.io/concepts?partner=${partnerId}`,
                }}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <StyledTypography
                  variant="caption"
                  color="secondary"
                  sx={{
                    cursor: 'pointer',
                    ':hover': { color: '#f22176' },
                  }}
                >
                  {conceptOverview?.partner_name}
                </StyledTypography>
              </Link>
            </Tooltip>
          </Box>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{ margin: '0 0.4em' }}
          />
          {/* Channels */}
          <Box display="flex" alignItems="center">
            {conceptOverview?.brief?.channels?.google?.display && (
              <>
                <Tooltip
                  title="Google Display"
                  componentsProps={{
                    tooltip: {
                      sx: { lineHeight: 'normal', margin: '0 !important' },
                    },
                  }}
                >
                  {googleDisplay}
                </Tooltip>
                {(conceptOverview?.brief?.channels?.google?.video ||
                  conceptOverview?.brief?.channels?.facebook?.static ||
                  conceptOverview?.brief?.channels?.facebook?.video ||
                  conceptOverview?.brief?.channels?.youtube?.video) && (
                  <Divider
                    orientation="vertical"
                    variant="middle"
                    flexItem
                    sx={{ margin: '0 0.4em' }}
                  />
                )}
              </>
            )}

            {conceptOverview?.brief?.channels?.google?.video && (
              <>
                <Tooltip
                  title="Google Video"
                  componentsProps={{
                    tooltip: {
                      sx: { lineHeight: 'normal', margin: '0 !important' },
                    },
                  }}
                >
                  {googleVideo}
                </Tooltip>
                {(conceptOverview?.brief?.channels?.facebook?.static ||
                  conceptOverview?.brief?.channels?.facebook?.video ||
                  conceptOverview?.brief?.channels?.youtube?.video) && (
                  <Divider
                    orientation="vertical"
                    variant="middle"
                    flexItem
                    sx={{ margin: '0 0.4em' }}
                  />
                )}
              </>
            )}

            {conceptOverview?.brief?.channels?.facebook?.static && (
              <>
                <Tooltip
                  title="Meta Static"
                  componentsProps={{
                    tooltip: {
                      sx: { lineHeight: 'normal', margin: '0 !important' },
                    },
                  }}
                >
                  {metaStatic}
                </Tooltip>
                {(conceptOverview?.brief?.channels?.facebook?.video ||
                  conceptOverview?.brief?.channels?.youtube?.video) && (
                  <Divider
                    orientation="vertical"
                    variant="middle"
                    flexItem
                    sx={{ margin: '0 0.4em' }}
                  />
                )}
              </>
            )}
            {conceptOverview?.brief?.channels?.facebook?.video && (
              <>
                <Tooltip
                  title="Meta Video"
                  componentsProps={{
                    tooltip: {
                      sx: { lineHeight: 'normal', margin: '0 !important' },
                    },
                  }}
                >
                  {metaVideo}
                </Tooltip>
                {conceptOverview?.brief?.channels?.youtube?.video && (
                  <Divider
                    orientation="vertical"
                    variant="middle"
                    flexItem
                    sx={{ margin: '0 0.4em' }}
                  />
                )}
              </>
            )}
            {conceptOverview?.brief?.channels?.youtube?.video && (
              <Tooltip
                title="Youtube"
                componentsProps={{
                  tooltip: {
                    sx: { lineHeight: 'normal', margin: '0 !important' },
                  },
                }}
              >
                {youtubeVideo}
              </Tooltip>
            )}
          </Box>
        </Box>
        <Box>
          <Button
            disableElevation
            disableRipple
            disableFocusRipple
            disableTouchRipple
            startIcon={<Inventory2TwoToneIcon />}
            size="small"
            sx={{
              textTransform: 'capitalize',
              padding: '4px 10px',
              marginRight: '0.5em',
            }}
            component={Link}
            to={`/projects/${partnerId}/concept/${conceptId}/assets`}
            variant={type === 'assets' ? 'contained' : 'text'}
          >
            Platform Assets
          </Button>
          <Button
            disableElevation
            disableRipple
            disableFocusRipple
            disableTouchRipple
            startIcon={<InsertLinkTwoToneIcon />}
            size="small"
            sx={{ textTransform: 'capitalize', padding: '4px 10px' }}
            component={Link}
            to={`/projects/${conceptOverview?.partner_uuid}/concept/${conceptOverview?.concept_id}/links`}
            variant={type === 'links' ? 'contained' : 'text'}
          >
            Reference Links
          </Button>
        </Box>
      </Box>
      <Divider />
    </Box>
  );
}
