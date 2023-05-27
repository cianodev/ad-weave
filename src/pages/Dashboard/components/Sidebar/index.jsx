import React, { useContext } from 'react';
import _ from 'lodash';

import { useLocation, Link } from 'react-router-dom';

import { Box, Typography, Button, styled, Chip } from '@mui/material';

import GridViewTwoToneIcon from '@mui/icons-material/GridViewTwoTone';
import DashboardContext from 'pages/Dashboard/context';
import { sideNavigation } from 'pages/Dashboard/constant';

const StyledButton = styled(Button)({
  textTransform: 'capitalize',
  color: '#a19da4',
  fontWeight: 700,
  ':hover': {
    backgroundColor: 'transparent',
    color: '#7e14e6',
  },
});

export default function Sidebar() {
  const location = useLocation();

  const { tab, dashboard } = useContext(DashboardContext);

  return (
    <>
      <Box p={2} display="flex" alignItems="center" position="absolute">
        <Box
          sx={{
            display: 'flex',
            backgroundColor: '#7e14e61c',
            borderRadius: '9px',
            boxShadow:
              'rgba(34, 51, 84, 0.4) 0px 2px 4px -3px, rgba(34, 51, 84, 0.2) 0px 5px 16px -4px',
          }}
          px={1.5}
          py={1.3}
          mr={1}
        >
          <GridViewTwoToneIcon color="secondary" />
        </Box>
        <Typography fontWeight={800} variant="h6">
          Dashboard
        </Typography>
      </Box>

      <Box
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          {sideNavigation.map((data, index) => (
            <StyledButton
              startIcon={data.icon}
              disableElevation
              disableFocusRipple
              disableRipple
              disableTouchRipple
              endIcon={
                <Chip
                  label={_.isEmpty(dashboard) ? 0 : dashboard[data?.slug]}
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
              component={Link}
              to={{
                pathname: location.pathname,
                search: data.search,
              }}
              sx={{
                color: tab === data.key ? '#7e14e6' : '#a19da4',
              }}
              key={index}
            >
              {data.label}
            </StyledButton>
          ))}
        </Box>
      </Box>
    </>
  );
}
