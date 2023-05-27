import React, { useContext, useEffect, useState } from 'react';

import _ from 'lodash';

import ConceptOverviewContext from 'pages/ConceptOverview/context';

import { Box, Button, Collapse } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import SearchInput from 'pages/ConceptOverview/components/SearchInput';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import CloudSyncTwoToneIcon from '@mui/icons-material/CloudSyncTwoTone';

import PlatformInfo from 'pages/ConceptOverview/views/PlatformInfo';
import Campaigns from 'pages/ConceptOverview/views/Campaigns';
import ConceptTask from 'pages/ConceptOverview/views/ConceptTask';

export default function Overview() {
  const [openOverview, setOpenOverview] = useState(false);

  const {
    conceptOverview: { brief },
    campaignList: campaign,
    fetchConceptTaskList,
    handleSyncCampaign,
    fetchSyncCampaign,
  } = useContext(ConceptOverviewContext);

  useEffect(() => {
    setOpenOverview(false);
  }, [brief]);

  return (
    <Box>
      {/* Search and overview */}
      <Box
        my={1}
        display="flex"
        justifyContent="space-between"
        padding="0 1.2em"
      >
        <Box display="flex">
          <SearchInput placeholder="Search..." />
        </Box>
        <Box>
          <LoadingButton
            size="small"
            loadingPosition="start"
            startIcon={<CloudSyncTwoToneIcon />}
            sx={{ textTransform: 'capitalize', marginRight: '0.5em' }}
            onClick={handleSyncCampaign}
            loading={fetchSyncCampaign}
            variant="outlined"
          >
            Sync Campaign
          </LoadingButton>
          <Button
            startIcon={
              openOverview ? <CloseTwoToneIcon /> : <InfoTwoToneIcon />
            }
            sx={{
              textTransform: 'capitalize',
              backgroundColor: openOverview ? '#7e14e6' : '#f22176',
            }}
            size="small"
            variant="contained"
            disableElevation
            onClick={() => setOpenOverview(!openOverview)}
          >
            Overview
          </Button>
        </Box>
      </Box>
      {/* Overview */}
      <Box
        sx={{
          overflowY: 'auto',
          height: 'calc(100vh - 12.4em)',
          padding: '0 1.2em 1em 1.2em',
        }}
      >
        <Collapse
          in={openOverview}
          sx={{
            '.MuiCollapse-wrapper': {
              padding: '1em',
              backgroundColor: '#ececec54',
              borderRadius: '1em',
            },
          }}
        >
          <PlatformInfo />
        </Collapse>
        {/* Campaigns */}
        {!_.isEmpty(campaign?.data) && (
          <Box>
            <Campaigns />
          </Box>
        )}

        {/* Channel task */}
        {!fetchConceptTaskList && <ConceptTask />}
      </Box>
    </Box>
  );
}
