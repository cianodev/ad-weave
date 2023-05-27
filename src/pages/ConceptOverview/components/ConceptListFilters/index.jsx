import React, { useContext, useState, useEffect } from 'react';

import ConceptOverviewContext from 'pages/ConceptOverview/context';

import {
  Alert,
  AlertTitle,
  Box,
  Chip,
  Divider,
  IconButton,
  Typography,
  styled,
  Backdrop,
  Tooltip,
} from '@mui/material';

import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import AutoAwesomeTwoToneIcon from '@mui/icons-material/AutoAwesomeTwoTone';
import EastTwoToneIcon from '@mui/icons-material/EastTwoTone';
import CircularProgress from '@mui/material/CircularProgress';

import UseAutocomplete from '../UseAutocomplete';
import GlobalAutoComplete from '../GlobalAutoComplete';
import _ from 'lodash';
import { formatDate } from 'utils/date';

const StyledTypography = styled(Typography)({
  lineHeight: 'normal',
});

export default function ConceptListFilters() {
  const [syncWithPartner, setSyncWithPartner] = useState(null);

  const {
    handleSyncConcept,
    partners,
    fetchPartners,
    members,
    fetchMembers,
    statuses,
    fetchStatuses,
    handlePopover,
    fetchSyncConcept,
    conceptListFilters,
    onFilterConceptList,
  } = useContext(ConceptOverviewContext);

  const handleSyncWithPartner = () => {
    handleSyncConcept(syncWithPartner);
  };

  return (
    <>
      <Backdrop
        sx={{
          color: '#fff',
          position: 'absolute',
          zIndex: 1,
          backgroundColor: 'hsla(0, 0%, 100%, 0.8)',
          backdropFilter: 'blur(2px)',
        }}
        open={fetchPartners || fetchMembers || fetchStatuses}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
      <Box
        px={2}
        py={1}
        display="flex"
        alignItems="center"
        borderBottom="1px solid #ececec"
        backgroundColor="#ececec63"
      >
        <Box lineHeight="normal" mr={1} display="flex">
          <TuneOutlinedIcon />
        </Box>
        <StyledTypography variant="button" fontWeight={800} color="primary">
          Filters and Action
        </StyledTypography>
      </Box>
      <Box mx={2} mt={1} mb={1.5}>
        <Alert
          icon={<AutoAwesomeTwoToneIcon fontSize="inherit" />}
          severity="info"
          sx={{ borderRadius: '4px 4px 0 0' }}
        >
          <AlertTitle sx={{ marginTop: 0, fontWeight: 800 }}>
            Pull new concepts&nbsp;
            <Chip
              label="New"
              size="small"
              color="secondary"
              sx={{ fontSize: '10px', height: '14px' }}
            />
          </AlertTitle>
          <StyledTypography variant="caption">
            You can now manually pull new concepts created in the platform by
            indicating a partner.
          </StyledTypography>
        </Alert>
        <Box
          sx={{
            background: '#e5f6fd',
            padding: '0 1em 1em',
            borderRadius: '0 0 4px 4px',
            display: 'flex',
          }}
        >
          <UseAutocomplete
            partners={partners}
            setSyncWithPartner={setSyncWithPartner}
            loading={fetchSyncConcept}
          />
          <Box>
            <Tooltip
              title="Sync concept"
              componentsProps={{
                tooltip: {
                  sx: { lineHeight: 'normal', margin: '0 !important' },
                },
              }}
            >
              <IconButton
                size="small"
                sx={{
                  backgroundColor: '#15a6c9',
                  color: '#fff',
                  ':hover': { backgroundColor: '#7e14e6' },
                }}
                onClick={handleSyncWithPartner}
                disabled={fetchSyncConcept}
              >
                {!fetchSyncConcept ? (
                  <EastTwoToneIcon />
                ) : (
                  <CircularProgress size={20} color="info" />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Box my={1}>
          <Divider />
        </Box>
        <Box>
          <StyledTypography variant="button" fontWeight={800} fontSize="11px">
            Partner Group
          </StyledTypography>
          <Box>
            <GlobalAutoComplete
              data={partners}
              loading={fetchPartners}
              value={conceptListFilters.partnerGroups}
              onChange={(_, value) =>
                onFilterConceptList({ partnerGroups: value })
              }
            />
          </Box>
        </Box>
        <Box>
          <StyledTypography variant="button" fontWeight={800} fontSize="11px">
            Date Created
          </StyledTypography>
          <Box>
            <Box
              sx={{
                border: '1px solid #e1e3f0',
                padding: '0.6567em 0.5em',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                cursor: 'pointer',
                ':hover': {
                  borderColor: '#7e14e6',
                },
              }}
              onClick={(e) => handlePopover(e, 'calendar_range')}
            >
              <Box>
                <Typography variant="body1" color="#9f9f9f">
                  {_.isEmpty(conceptListFilters.dateDelivered)
                    ? 'Mm Dd, YYYY'
                    : formatDate(
                        conceptListFilters.dateDelivered[0]?.raw,
                        'MMMM DD, YYYY'
                      )}
                </Typography>
              </Box>
              <EastTwoToneIcon sx={{ color: '#9f9f9f' }} />
              <Box>
                <Typography variant="body1" color="#9f9f9f">
                  {_.isEmpty(conceptListFilters.dateDelivered)
                    ? 'Mm Dd, YYYY'
                    : formatDate(
                        conceptListFilters.dateDelivered[1]?.raw,
                        'MMMM DD, YYYY'
                      )}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box>
          <StyledTypography variant="button" fontWeight={800} fontSize="11px">
            Members
          </StyledTypography>
          <Box>
            <GlobalAutoComplete
              value={conceptListFilters.members}
              data={members?.data}
              loading={fetchMembers}
              onChange={(_, value) => onFilterConceptList({ members: value })}
            />
          </Box>
        </Box>
        <Box>
          <StyledTypography variant="button" fontWeight={800} fontSize="11px">
            Statuses
          </StyledTypography>
          <Box>
            <GlobalAutoComplete
              value={conceptListFilters.statuses}
              data={statuses}
              loading={fetchStatuses}
              onChange={(_, value) => onFilterConceptList({ statuses: value })}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}
