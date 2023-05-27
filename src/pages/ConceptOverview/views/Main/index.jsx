import React, { useContext, useState, useEffect } from 'react';

import {
  Backdrop,
  Box,
  Divider,
  IconButton,
  OutlinedInput,
  Typography,
  styled,
} from '@mui/material';

import _ from 'lodash';

// pages
import Sidebar from 'pages/ConceptOverview/components/Sidebar';
import ConceptOverviewContext from 'pages/ConceptOverview/context';
import ConceptSpecific from 'pages/ConceptOverview/views/ConceptSpecific';

import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import ReportTwoToneIcon from '@mui/icons-material/ReportTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import DangerousTwoToneIcon from '@mui/icons-material/DangerousTwoTone';
import CircularProgress from '@mui/material/CircularProgress';

import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import { updateConceptList } from 'store/reducers/projects';

const StyledBox = styled(Box)({
  minHeight: 'calc(100vh - 50px)',
  lineHeight: 'normal',
  display: 'flex',
});

const StyledInputField = styled(OutlinedInput)({
  fontSize: '0.9rem',
  borderRadius: '0.2em',
  //   paddingLeft: 15,

  '&.Mui-focused fieldset': {
    border: '1px solid #5025c4 !important',
    boxShadow: '0 0 0 4px rgb(80 37 196 / 10%)',
  },
});

const StyledIconButton = styled(IconButton)({
  borderRadius: '0.2em',
  border: '1px solid #5025c4',
  color: '#5025c4',
  ':hover': {
    backgroundColor: '#5025c4',
    color: '#fff',
  },
});

export default function Main() {
  const dispatch = useDispatch();

  const [hasMore, setHasMore] = useState(true);
  const [searchConcept, setSearchConcept] = useState(null);

  const {
    conceptList,
    conceptOverview,
    openConceptFilter,
    onSearchConceptList,
    onOpenConceptListFilter,
    onScrollToLastItem,
    errorConceptOverview,
    fetchSyncConcept,
  } = useContext(ConceptOverviewContext);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      !_.isNull(searchConcept) && onSearchConceptList(searchConcept);
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchConcept]);

  useEffect(() => {
    fetchSyncConcept && setSearchConcept('');
  }, [fetchSyncConcept]);

  return (
    <Box sx={{ minWidth: '100vw' }}>
      <StyledBox
        sx={{
          position: 'fixed',
          height: '100vh',
          width: '300px',
          backgroundColor: '#e6e6e6',
          borderRight: '1px solid #d7d7d7',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 2,
        }}
      >
        <Backdrop
          open={fetchSyncConcept}
          sx={{ position: 'absolute', zIndex: 2 }}
        >
          <CircularProgress color="secondary" />
        </Backdrop>
        <Box
          sx={{
            padding: '1em 1em',
          }}
        >
          <Typography variant="h6" fontWeight={800} mb={1} lineHeight="normal">
            Projects
          </Typography>
          <Box display="flex" justifyContent="center">
            <StyledInputField
              size="small"
              fullWidth
              autoComplete="off"
              placeholder="Search concept"
              onChange={(e) => setSearchConcept(e.target.value)}
            />
            <StyledIconButton
              sx={{ marginLeft: '4px' }}
              onClick={onOpenConceptListFilter}
            >
              {!openConceptFilter ? <TuneOutlinedIcon /> : <CloseTwoToneIcon />}
            </StyledIconButton>
          </Box>
        </Box>
        <Divider sx={{ borderColor: '#d7d7d7' }} />
        <Box
          id="scrollable-container"
          height="calc(100vh - 6.7em)"
          overflow="auto"
        >
          {_.isEmpty(conceptList?.data) ? (
            <Box
              m={2}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              textAlign="center"
            >
              <Box>
                <ReportTwoToneIcon
                  sx={{
                    width: '5em',
                    height: '5em',
                    color: ' #FFC107',
                  }}
                />
              </Box>
              <Box>
                <Typography fontWeight={700}>No concept found.</Typography>
                <Typography variant="caption" color="#949494">
                  Make sure the concept name is correct.
                </Typography>
              </Box>
            </Box>
          ) : (
            <InfiniteScroll
              dataLength={
                _.isEmpty(conceptList) ? 0 : conceptList?.data?.length
              }
              hasMore={hasMore}
              next={() => {
                onScrollToLastItem(() => {
                  setHasMore(false);
                });
              }}
              loader={<></>}
              endMessage={<></>}
              scrollableTarget="scrollable-container"
            >
              <Sidebar />
            </InfiniteScroll>
          )}
        </Box>
      </StyledBox>
      <StyledBox
        sx={{
          marginLeft: '300px',
          overflow: 'hidden',
        }}
      >
        {!_.isEmpty(errorConceptOverview?.message) && (
          <Box
            textAlign="center"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            height="calc(100vh - 6em)"
            width="-webkit-fill-available"
          >
            <DangerousTwoToneIcon
              sx={{
                width: '10em',
                height: '10em',
                color: '#f16079',
              }}
            />
            <Typography fontWeight={700} variant="h4">
              Concept not available
            </Typography>
            <Typography color="#949494">
              If it&lsquo;s newly created in the platform, Try re-pulling the
              concept manually in the filters and action.
            </Typography>
          </Box>
        )}
        {!_.isEmpty(conceptOverview) && <ConceptSpecific />}
      </StyledBox>
    </Box>
  );
}
