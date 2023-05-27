import React from 'react';

import { Box, Card, Avatar, Typography, styled } from '@mui/material';

const StyledTypography = styled(Typography)({
  lineHeight: 'normal',
  cursor: 'default',
});

const StyledCard = styled(Card)({
  boxShadow:
    'rgba(159, 162, 191, 0.18) 0px 9px 16px, rgba(159, 162, 191, 0.32) 0px 2px 2px',
});

const steps = ['Concept Design', 'Concept Build', 'Design QA', 'Concept QA'];
const videoSteps = ['Concept Design', 'Concept Build'];

export default function TaskStepper() {
  return (
    <Box my={2}>
      <StyledCard>
        <Box
          p={2}
          display="flex"
          alignItems="center"
          justifyContent="space-around"
        >
          {/* Concept Design */}
          <Box display="flex" alignItems="center">
            <Avatar>IP</Avatar>
            <Box ml={1.8}>
              <StyledTypography fontWeight={800}>
                Concept Design
              </StyledTypography>
              <StyledTypography variant="caption">In-Progress</StyledTypography>
            </Box>
          </Box>
          {/* Concept Build */}
          <Box display="flex" alignItems="center">
            <Avatar>2</Avatar>
            <Box ml={1.8}>
              <StyledTypography fontWeight={800}>
                Concept Build
              </StyledTypography>
              {/* <StyledTypography variant="caption">
              Not Created
            </StyledTypography> */}
            </Box>
          </Box>
          {/* Design QA */}
          <Box display="flex" alignItems="center">
            <Avatar>3</Avatar>
            <Box ml={1.8}>
              <StyledTypography fontWeight={800}>Design QA</StyledTypography>
              {/* <StyledTypography variant="caption">
              Not Created
            </StyledTypography> */}
            </Box>
          </Box>
          {/* Concept QA */}
          <Box display="flex" alignItems="center">
            <Avatar>4</Avatar>
            <Box ml={1.8}>
              <StyledTypography fontWeight={800}>Concept QA</StyledTypography>
              {/* <StyledTypography variant="caption">
              Not Created
            </StyledTypography> */}
            </Box>
          </Box>
        </Box>
      </StyledCard>
    </Box>
  );
}
