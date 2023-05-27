import {
  Box,
  Button,
  Typography,
  styled,
  Tooltip,
  IconButton,
  Avatar,
  AvatarGroup,
  Divider,
} from '@mui/material';
import _ from 'lodash';
import CampaignOverviewContext from 'pages/Campaign/context';
import React, { useContext } from 'react';
import { appColors } from 'theme/variables';

import Groups3TwoToneIcon from '@mui/icons-material/Groups3TwoTone';

import { stringAvatar } from 'hooks';
import Overview from '../Overview';

const StyledTypography = styled(Typography)({
  lineHeight: 'normal',
  cursor: 'default',
});

export default function Main() {
  const {
    overview: { name, status, members },
    errorCampaignOverview,
  } = useContext(CampaignOverviewContext);

  return (
    !_.isEmpty(name) && (
      <>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          padding="0 1.2em 8px "
        >
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
                    _.camelCase(status?.replace(/_/g, ' ').toLowerCase())
                  ],
                ':hover': {
                  backgroundColor:
                    appColors?.status[
                      _.camelCase(status?.replace(/_/g, ' ').toLowerCase())
                    ],
                },
              }}
            >
              {status?.replace(/_/g, ' ')}
            </Button>
            <StyledTypography
              className="header__title--overlay"
              variant="h6"
              fontWeight={800}
              color="primary"
              noWrap
              sx={{ width: '400px' }}
            >
              {name}
            </StyledTypography>
          </Box>
          <Box>
            {_.isEmpty(members) ? (
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
                {members?.map((data) => (
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
        <Divider />
        <Box
          padding="1em 1.2em"
          height="calc(100vh - 8.2em)"
          sx={{
            overflowX: 'hidden',
            overflowY: 'auto',
          }}
        >
          <Overview />
        </Box>
      </>
    )
  );
}
