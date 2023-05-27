import React, { useEffect, useRef, useContext } from 'react';

import HeaderContext from 'components/Common/Header/context';

import { PropTypes } from 'prop-types';

import _ from 'lodash';

import {
  Dialog,
  Box,
  Typography,
  IconButton,
  Divider,
  Alert,
  Slide,
  Card,
  InputBase,
  CircularProgress,
} from '@mui/material';

import SwitchAccessShortcutTwoToneIcon from '@mui/icons-material/SwitchAccessShortcutTwoTone';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import TroubleshootTwoToneIcon from '@mui/icons-material/TroubleshootTwoTone';
import RestoreTwoToneIcon from '@mui/icons-material/RestoreTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { Link, useLocation } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

let delayDebounceFn = null;

export default function Search({ open, handleClose }) {
  const location = useLocation();

  const {
    savedSearches,
    recentSearches,
    handleSearch,
    concepts,
    campaigns,
    tasks,
    subTasks,
    fetchConcepts,
    fetchCampaigns,
    fetchTasks,
    fetchSubtasks,
    isSearching,
    handleAddSaveSearch,
  } = useContext(HeaderContext);

  const [searchQuery, setSearchQuery] = React.useState('');

  const inputRef = useRef(null);

  useEffect(() => {
    delayDebounceFn = setTimeout(() => {
      handleSearch(searchQuery);
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  useEffect(() => {
    open && inputRef.current.focus();
  }, [open]);

  // Event Handlers
  const handleSearchFieldChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handleSearchFieldEnterClick = (e) => {
    e.preventDefault();
    handleSearch(e.target.value);
    clearTimeout(delayDebounceFn);
  };

  const handleSaveAndRecent = (value) => {
    setSearchQuery(value);
  };

  return (
    <Dialog
      disableEnforceFocus
      disablePortal
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => {
        handleClose();
        setSearchQuery('');
      }}
      aria-describedby="alert-dialog-slide-description"
      sx={{
        '& .MuiDialog-container': {
          alignItems: 'flex-start',
          height: 'auto',
        },
      }}
      PaperProps={{
        sx: {
          borderRadius: '10px',
          maxHeight: 'calc(100vh - 64px)',
          overflow: 'hidden',
        },
      }}
      fullWidth={true}
      maxWidth="sm"
    >
      <Box>
        <form>
          <Box
            sx={{
              display: 'flex',
              WebkitBoxAlign: 'center',
              alignItems: 'center',
              margin: '0 18px',
            }}
          >
            <Box
              sx={{
                WebkitBoxFlex: 1,
                flexGrow: 1,
                display: 'flex',
                WebkitBoxAlign: 'center',
                alignItems: 'center',
              }}
            >
              <SearchTwoToneIcon sx={{ fontSize: '1.5rem' }} />
              <InputBase
                inputRef={inputRef}
                fullWidth
                color="primary"
                sx={{
                  padding: '18px',
                }}
                value={searchQuery}
                placeholder="Search..."
                onChange={handleSearchFieldChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearchFieldEnterClick(e);
                  }
                }}
              />
            </Box>
            <Card
              variant="outlined"
              sx={{
                padding: '4.5px 9px',
                borderRadius: '10px',
                lineHeight: '1.3em',
                boxShadow:
                  'rgba(159, 162, 191, 0.18) 0px 9px 16px, rgba(159, 162, 191, 0.32) 0px 2px 2px',
              }}
            >
              esc
            </Card>
          </Box>
        </form>
      </Box>
      <Divider />

      {!isSearching ? (
        <>
          <Box sx={{ margin: '18px' }}>
            <Alert
              severity="info"
              sx={{
                padding: '0px 8px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Start typing to see the search results...
            </Alert>
          </Box>
          <Box sx={{ maxHeight: '450px', overflowY: 'auto' }}>
            <div
              style={{
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                height: '100%',
              }}
            >
              <div
                style={{
                  inset: '0px',
                  overflow: 'auto',
                  marginRight: 0,
                  marginBottom: 0,
                }}
              >
                {/* Recent Searches */}
                {!_.isEmpty(recentSearches) && (
                  <Box sx={{ padding: '0 18px 18px' }}>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 800 }}
                      color="primary"
                    >
                      Recent searches
                    </Typography>
                    <>
                      {recentSearches?.map((data, index) => (
                        <Box
                          sx={{
                            transition:
                              'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                            border: '1px solid rgba(203, 204, 210, 0.1)',
                            borderRadius: '10px',
                            // padding: '4px 9px',
                            padding: '0.6567em 9px',
                            margin: '9px 0px',
                            cursor: 'pointer',
                            display: 'flex',
                            WebkitBoxAlign: 'center',
                            alignItems: 'center',
                            WebkitBoxPack: 'justify',
                            justifyContent: 'space-between',
                            '&:hover': {
                              backgroundColor: 'rgba(140, 124, 240, 0.08)',
                              color: 'rgb(140, 124, 240)',
                              borderColor: 'rgba(140, 124, 240, 0.3)',
                            },
                          }}
                          key={index}
                          onClick={() => handleSaveAndRecent(data)}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <RestoreTwoToneIcon
                              sx={{ fontSize: '1.25rem', marginRight: '9px' }}
                            />
                            <Typography color="inherit" variant="body1">
                              {data}
                            </Typography>
                          </Box>
                          {/* <Box>
                            <IconButton
                              size="small"
                              onClick={() => handleAddSaveSearch(data)}
                            >
                              <StarTwoToneIcon color="secondary" />
                            </IconButton>
                          </Box> */}
                        </Box>
                      ))}
                    </>
                  </Box>
                )}

                {/* Saved Searches */}
                {/* {!_.isEmpty(savedSearches) && (
                  <Box sx={{ padding: '0 18px 18px' }}>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 800 }}
                      color="primary"
                    >
                      Saved searches
                    </Typography>
                    <>
                      {savedSearches?.map((data, index) => (
                        <Box
                          sx={{
                            transition:
                              'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                            border: '1px solid rgba(203, 204, 210, 0.1)',
                            borderRadius: '10px',
                            padding: '4px 9px',
                            margin: '9px 0px',
                            cursor: 'pointer',
                            display: 'flex',
                            WebkitBoxAlign: 'center',
                            alignItems: 'center',
                            WebkitBoxPack: 'justify',
                            justifyContent: 'space-between',
                            '&:hover': {
                              backgroundColor: 'rgba(140, 124, 240, 0.08)',
                              color: 'rgb(140, 124, 240)',
                              borderColor: 'rgba(140, 124, 240, 0.3)',
                            },
                          }}
                          key={index}
                          onClick={() => handleSaveAndRecent(data)}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <StarTwoToneIcon
                              sx={{ fontSize: '1.25rem', marginRight: '9px' }}
                            />
                            <Typography color="inherit" variant="body1">
                              {data}
                            </Typography>
                          </Box>
                          <Box>
                            <IconButton size="small">
                              <CloseTwoToneIcon color="error" />
                            </IconButton>
                          </Box>
                        </Box>
                      ))}
                    </>
                  </Box>
                )} */}
              </div>
            </div>
          </Box>
        </>
      ) : (
        <>
          {fetchConcepts || fetchCampaigns || fetchTasks || fetchSubtasks ? (
            <Box
              p={3}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <CircularProgress />
            </Box>
          ) : (
            <Box p={2} height="calc(100vh - 20em)" overflow="auto">
              {/* Concepts */}
              {!_.isEmpty(concepts) && (
                <Box>
                  <Typography fontWeight={700} color="secondary">
                    Concepts
                  </Typography>
                  {concepts?.map((data) => (
                    <Box
                      sx={{
                        transition:
                          'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                        border: '1px solid rgba(203, 204, 210, 0.1)',
                        borderRadius: '10px',
                        // padding: '4px 9px',
                        padding: '0.6567em 9px',
                        margin: '9px 0px',
                        cursor: 'pointer',
                        display: 'flex',
                        WebkitBoxAlign: 'center',
                        alignItems: 'center',
                        WebkitBoxPack: 'justify',
                        justifyContent: 'space-between',
                        color: 'inherit',
                        textDecoration: 'none',
                        '&:hover': {
                          backgroundColor: 'rgba(140, 124, 240, 0.08)',
                          color: 'rgb(140, 124, 240)',
                          borderColor: 'rgba(140, 124, 240, 0.3)',
                        },
                      }}
                      key={data?.id}
                      component={Link}
                      to={`/projects/${data?.partner_id}/concept/${data?.id}/overview`}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <SwitchAccessShortcutTwoToneIcon
                          sx={{ fontSize: '1.25rem', marginRight: '9px' }}
                        />
                        <Typography
                          color="inherit"
                          variant="body1"
                          noWrap
                          width="450px"
                          title={data?.name}
                        >
                          {data?.name}
                        </Typography>
                      </Box>
                      {/* <Box>
                        <IconButton
                          size="small"
                          onClick={() => handleAddSaveSearch(data?.name)}
                        >
                          <StarTwoToneIcon color="secondary" />
                        </IconButton>
                      </Box> */}
                    </Box>
                  ))}
                </Box>
              )}
              {/* campaigns */}
              {!_.isEmpty(campaigns) && (
                <Box>
                  <Typography fontWeight={700} color="secondary">
                    Campaigns
                  </Typography>
                  {campaigns?.map((data) => (
                    <Box
                      sx={{
                        transition:
                          'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                        border: '1px solid rgba(203, 204, 210, 0.1)',
                        borderRadius: '10px',
                        // padding: '4px 9px',
                        padding: '0.6567em 9px',
                        margin: '9px 0px',
                        cursor: 'pointer',
                        display: 'flex',
                        WebkitBoxAlign: 'center',
                        alignItems: 'center',
                        WebkitBoxPack: 'justify',
                        justifyContent: 'space-between',
                        color: 'inherit',
                        textDecoration: 'none',
                        '&:hover': {
                          backgroundColor: 'rgba(140, 124, 240, 0.08)',
                          color: 'rgb(140, 124, 240)',
                          borderColor: 'rgba(140, 124, 240, 0.3)',
                        },
                      }}
                      key={data?.id}
                      component={Link}
                      to={`/projects/${data?.partner_id}/concept/${data?.concept_id}/campaign?campaignId=${data?.id}`}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <SwitchAccessShortcutTwoToneIcon
                          sx={{ fontSize: '1.25rem', marginRight: '9px' }}
                        />
                        <Typography
                          color="inherit"
                          variant="body1"
                          noWrap
                          width="450px"
                          title={data?.name}
                        >
                          {data?.name}
                        </Typography>
                      </Box>
                      {/* <Box>
                        <IconButton
                          size="small"
                          onClick={() => handleAddSaveSearch(data?.name)}
                        >
                          <StarTwoToneIcon color="secondary" />
                        </IconButton>
                      </Box> */}
                    </Box>
                  ))}
                </Box>
              )}

              {/* tasks */}
              {!_.isEmpty(tasks) && (
                <Box>
                  <Typography fontWeight={700} color="secondary">
                    Tasks
                  </Typography>
                  {tasks?.map((data) => (
                    <Box
                      sx={{
                        transition:
                          'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                        border: '1px solid rgba(203, 204, 210, 0.1)',
                        borderRadius: '10px',
                        // padding: '4px 9px',
                        margin: '9px 0px',
                        cursor: 'pointer',
                        display: 'flex',
                        WebkitBoxAlign: 'center',
                        alignItems: 'center',
                        WebkitBoxPack: 'justify',
                        justifyContent: 'space-between',
                        color: 'inherit',
                        textDecoration: 'none',
                        padding: '0.6567em 9px',
                        '&:hover': {
                          backgroundColor: 'rgba(140, 124, 240, 0.08)',
                          color: 'rgb(140, 124, 240)',
                          borderColor: 'rgba(140, 124, 240, 0.3)',
                        },
                      }}
                      key={data?.id}
                      component={Link}
                      to={{
                        pathname: `/${data?.type?.toLowerCase()}/${data?.id}`,
                        state: {
                          background: location,
                          type: data?.type,
                          subtask: data?.type?.includes('subtask'),
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <SwitchAccessShortcutTwoToneIcon
                          sx={{ fontSize: '1.25rem', marginRight: '9px' }}
                        />
                        <Typography
                          color="inherit"
                          variant="body1"
                          noWrap
                          width="450px"
                          title={data?.name}
                        >
                          {data?.name}
                        </Typography>
                      </Box>
                      {/* <Box>
                        <IconButton
                          size="small"
                          onClick={() => handleAddSaveSearch(data?.name)}
                        >
                          <StarTwoToneIcon color="secondary" />
                        </IconButton>
                      </Box> */}
                    </Box>
                  ))}
                </Box>
              )}

              {/* subtasks */}
              {!_.isEmpty(subTasks) && (
                <Box>
                  <Typography fontWeight={700} color="secondary">
                    Subtasks
                  </Typography>
                  {subTasks?.map((data) => (
                    <Box
                      sx={{
                        transition:
                          'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                        border: '1px solid rgba(203, 204, 210, 0.1)',
                        borderRadius: '10px',
                        // padding: '4px 9px',
                        margin: '9px 0px',
                        cursor: 'pointer',
                        display: 'flex',
                        WebkitBoxAlign: 'center',
                        alignItems: 'center',
                        WebkitBoxPack: 'justify',
                        justifyContent: 'space-between',
                        color: 'inherit',
                        textDecoration: 'none',
                        padding: '0.6567em 9px',
                        '&:hover': {
                          backgroundColor: 'rgba(140, 124, 240, 0.08)',
                          color: 'rgb(140, 124, 240)',
                          borderColor: 'rgba(140, 124, 240, 0.3)',
                        },
                      }}
                      key={data?.id}
                      component={Link}
                      to={{
                        pathname: `/${data?.type?.toLowerCase()}/${data?.id}`,
                        state: {
                          background: location,
                          type: data?.type,
                          subtask: data?.type?.includes('subtask'),
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <SwitchAccessShortcutTwoToneIcon
                          sx={{ fontSize: '1.25rem', marginRight: '9px' }}
                        />
                        <Typography
                          color="inherit"
                          variant="body1"
                          noWrap
                          width="450px"
                          title={data?.name}
                        >
                          {data?.name}
                        </Typography>
                      </Box>
                      {/* <Box>
                        <IconButton
                          size="small"
                          onClick={() => handleAddSaveSearch(data?.name)}
                        >
                          <StarTwoToneIcon color="secondary" />
                        </IconButton>
                      </Box> */}
                    </Box>
                  ))}
                </Box>
              )}

              {/* Empty result */}
              {_.isEmpty(concepts) &&
                _.isEmpty(campaigns) &&
                _.isEmpty(tasks) &&
                _.isEmpty(subTasks) && (
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                    height="inherit"
                    pb={10}
                  >
                    <TroubleshootTwoToneIcon
                      sx={{
                        width: '5em',
                        height: '5em',
                        color: '#bdbdbd',
                      }}
                    />
                    <Typography
                      variant="h5"
                      color="#bdbdbd"
                    >{`No results found`}</Typography>
                    <Typography color="#bdbdbd">
                      Check the spelling and try again.
                    </Typography>
                  </Box>
                )}
            </Box>
          )}
        </>
      )}
    </Dialog>
  );
}

Search.propTypes = {
  open: PropTypes.any.isRequired,
  handleClose: PropTypes.func,
};
