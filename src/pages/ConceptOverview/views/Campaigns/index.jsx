import React, { useContext, useState } from 'react';

import _ from 'lodash';

import { useParams, Link } from 'react-router-dom';

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

import ConceptOverviewContext from 'pages/ConceptOverview/context';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';

import AutoModeTwoToneIcon from '@mui/icons-material/AutoModeTwoTone';
import Groups2TwoToneIcon from '@mui/icons-material/Groups2TwoTone';
import TagTwoToneIcon from '@mui/icons-material/TagTwoTone';

import { LoadingButton } from '@mui/lab';

import { appColors } from 'theme/variables';
import { stringAvatar } from 'hooks';

import { campaignTable, channels } from 'pages/ConceptOverview/constant';

import moment from 'moment';
import CampaignTree from 'pages/ConceptOverview/components/CampaignTree';

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
  marginLeft: '0.5em',
});

export default function Campaigns() {
  const { conceptId } = useParams();
  const [openCollapse, setOpenCollapse] = useState(true);

  const {
    campaignList: campaign,
    fetchUpdateCampaignList,
    loadMoreCampaigns,
    handlePopover,
    handleCampaignTasks,
    fetchCampaignTask,
  } = useContext(ConceptOverviewContext);

  const handleCollapseCampaigns = () => {
    setOpenCollapse(!openCollapse);
  };

  return (
    <>
      <Box
        mt={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center">
          <IconButton
            size="small"
            onClick={handleCollapseCampaigns}
            sx={{ padding: 0, marginRight: '0.5em' }}
          >
            {openCollapse ? (
              <IndeterminateCheckBoxOutlinedIcon />
            ) : (
              <AddBoxOutlinedIcon />
            )}
          </IconButton>
          <StyledTypography variant="h6" fontWeight={800} color="primary">
            ({campaign?.total})&nbsp;
            {campaign?.total === 1 ? 'Campaign' : `Campaigns`}
          </StyledTypography>
        </Box>
      </Box>

      <StyledCollapse in={openCollapse}>
        {/* Campaign List */}
        <Box overflow="auto" mt={1}>
          {/* Header */}
          <Box display="inline-flex">
            {campaignTable?.map((header, index) => (
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

          {/* List */}
          {!_.isEmpty(campaign) &&
            campaign?.data?.map((data) => (
              <CampaignTree
                campaign={data}
                key={data?.id}
                handlePopover={handlePopover}
                handleCampaignTasks={handleCampaignTasks}
                fetchCampaignTask={fetchCampaignTask}
              />
            ))}
        </Box>

        {/* More */}
        {campaign?.total !== campaign?.data?.length && (
          <Box my={1} display="flex" justifyContent="center">
            <LoadingButton
              size="small"
              variant="contained"
              disableElevation
              disableFocusRipple
              sx={{ textTransform: 'initial' }}
              startIcon={<AutoModeTwoToneIcon />}
              loading={fetchUpdateCampaignList}
              loadingPosition="start"
              onClick={() =>
                loadMoreCampaigns(conceptId, campaign?.current_page + 1)
              }
            >
              Load more campaigns
            </LoadingButton>
          </Box>
        )}
      </StyledCollapse>
    </>
  );
}
