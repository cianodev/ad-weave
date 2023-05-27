import React, { createContext, useEffect, useState } from 'react';

import JSZip from 'jszip';

import { saveAs } from 'file-saver';

import PropTypes from 'prop-types';
import { useOnMount } from 'hooks';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'components/Common/Loader';
import GlobalDrawer from 'components/Common/Drawer';
import GlobalPopover from 'components/Common/Popover';

import ConceptListFilters from '../components/ConceptListFilters';
import {
  getConceptList,
  getConceptOverview,
  updateCampaignList,
  getReferences,
  getNewCampaigns,
  getPartners,
  getNewConcepts,
  getMembers,
  getStatus,
  getCampaignTask,
  getChannelTask,
  updateGlobal,
  resetNotification,
  addReferenceLink,
  deleteReferenceLink,
  updateReferenceLink,
  getInputDatasources,
  updateConceptList,
} from 'store/reducers/projects';
import { useParams } from 'react-router-dom';
import _, { filter } from 'lodash';
import { Alert, AlertTitle, Slide, Snackbar } from '@mui/material';
import GlobalDialog from '../components/GlobalDialog';
import Status from 'pages/ConceptOverview/components/common/Status';
import Users from 'pages/ConceptOverview/components/common/Users';
import DateTime from 'pages/ConceptOverview/components/common/DateTime';
import FilterAsset from '../components/FilterAsset';
import RangeDate from '../components/common/RangeDate';
import ReferenceContent from '../components/ReferenceContent';
import { formatDate } from 'utils/date';

const ConceptOverviewContext = createContext();

function TransitionRight(props) {
  return <Slide {...props} direction="left" />;
}

export function ConceptOverviewProvider({ children }) {
  const dispatch = useDispatch();
  const [openConceptFilter, setOpenConceptFilter] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [isDownloadSuccess, setIsDownloadSuccess] = useState('none');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // concept list filters
  const [conceptListFilters, setConceptListFilters] = useState({
    name: '',
    partnerGroups: [],
    members: [],
    statuses: [],
    dateDelivered: [],
  });

  // popper
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverType, setPopoverType] = useState(null);
  const [value, setValue] = useState(null);
  const [updateId, setUpdateId] = useState(null);
  const [taskChannel, setTaskChannel] = useState(null);

  const {
    fetchConceptOverview,
    fetchCampaignList,
    conceptOverview,
    conceptTaskList,
    conceptList,
    campaignList,
    fetchUpdateCampaignList,
    errorConceptOverview,
    referenceLinks,
    fetchReferenceLinks,
    errorReferenceLinks,
    fetchSyncCampaign,
    partners,
    fetchPartners,
    members,
    fetchMembers,
    statuses,
    fetchStatuses,
    fetchConceptTaskList,
    fetchCampaignTask,
    fetchSyncConcept,
    isNotify,
    notification,
    inputDatasources,
    fetchInputDatasources,
  } = useSelector((state) => state.projects);

  const { partnerId, conceptId, type } = useParams();

  // useOnMount(() => {
  //   loadConceptList();
  // });

  useEffect(() => {
    dispatch(
      getConceptOverview({
        conceptId,
        partnerId,
      })
    );
  }, [conceptId, partnerId, type]);

  useEffect(() => {
    !_.isEmpty(conceptOverview) &&
      (document.title = `${conceptOverview?.name} - Ad-Weave.io`);
  }, [conceptOverview]);

  useEffect(() => {
    loadConceptList();
  }, [conceptListFilters]);

  const loadMoreCampaigns = (conceptId, page) => {
    dispatch(updateCampaignList(conceptId, page));
  };

  const loadConceptList = (page = 1, wantsToPaginate = false) => {
    const params = {
      filter: {
        name: conceptListFilters.name,
        partner_uuid: conceptListFilters.partnerGroups.map((i) => i.id),
        'userPartners.user_id': conceptListFilters.members.map((i) => i.id),
        status: conceptListFilters.statuses.map((i) => i.id),
        delivery_date: conceptListFilters.dateDelivered.map((i) => i.parsed),
      },
    };

    wantsToPaginate
      ? dispatch(updateConceptList(page, params))
      : dispatch(getConceptList(params, page));
  };

  const downloadAllAssets = (assetUrls, assetName) => {
    setIsDownloadSuccess('none');
    const zip = new JSZip();

    const assetLinks = assetUrls.map(async (item) => {
      if (
        item?.name?.includes('pdf') ||
        item?.name?.includes('psd') ||
        item?.name?.includes('mp4')
      ) {
        return null;
      } else {
        const response = await fetch(item.url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/octet-stream; charset=utf-8',
          },
        });
        const data = response.blob();

        zip.file(item.name, data);

        return data;
      }
    });

    Promise.all(assetLinks)
      .then(() => {
        zip.generateAsync({ type: 'blob' }).then((content) => {
          saveAs(content, `${assetName}.zip`);
        });
      })
      .then(() => {
        setOpenNotification(true);
        setIsDownloadSuccess('yes');
      })
      .catch(() => {
        setOpenNotification(true);
        setIsDownloadSuccess('no');
      });
  };

  const onSearchConceptList = (query) => {
    setConceptListFilters((prev) => ({ ...prev, name: query }));
  };

  const onFilterConceptList = (filter) => {
    setConceptListFilters((prev) => ({ ...prev, ...filter }));
  };

  const onOpenConceptListFilter = () => {
    setOpenConceptFilter(!openConceptFilter);

    openConceptFilter !== true && dispatch(getPartners());
    openConceptFilter !== true && dispatch(getMembers());
    openConceptFilter !== true && dispatch(getStatus(1));
  };

  const onOpenReferenceLink = (conceptId) => {
    dispatch(getReferences(conceptId));
    dispatch(getInputDatasources());
  };

  const onScrollToLastItem = (lastItem) => {
    const nextPage = conceptList?.current_page + 1;
    if (nextPage <= conceptList?.last_page) {
      loadConceptList(nextPage, true);
    } else {
      lastItem();
    }
  };

  const handleCloseNotification = () => {
    dispatch(resetNotification());
  };

  const handleSyncCampaign = () => {
    dispatch(getNewCampaigns(conceptId));
  };

  const handleSyncConcept = (partnerId) => {
    dispatch(getNewConcepts(partnerId));
  };

  const handlePopover = (_e, _type, _value, _id, _channel) => {
    setAnchorEl(_e.currentTarget);
    setPopoverType(_type);
    setValue(_value); // default data
    setUpdateId(_id); // task/rel id

    const channel =
      _channel === 1
        ? 'googleDisplay'
        : _channel === 2
        ? 'googleVideo'
        : _channel === 3
        ? 'metaStatic'
        : _channel === 4
        ? 'metaVideo'
        : 'youtubeVideo';

    setTaskChannel(channel);

    switch (_type) {
      case 'concept_status':
        dispatch(getStatus(1));
        break;
      case 'campaign_status':
        dispatch(getStatus(2));
        break;
      case 'task_status':
      case 'subtask_status':
      case 'task_status_campaign':
      case 'subtask_status_campaign':
        dispatch(getStatus(3));
        break;
      case 'campaign_followers':
      case 'concept_followers':
      case 'task_assignees':
      case 'task_watchers':
        dispatch(getMembers());
        break;
    }
  };

  const handleChannelTask = (channelId) => {
    dispatch(getChannelTask(conceptId, channelId));
  };

  const handleCampaignTasks = (campaignId) => {
    dispatch(getCampaignTask(campaignId));
  };

  const handleDialogOpen = (_value) => {
    setIsDialogOpen(!isDialogOpen);
    setValue(_value);
  };

  const handleUpdateGlobal = (_value, _data) => {
    const label = popoverType?.split('_')[0];

    dispatch(
      updateGlobal(
        {
          is_parent: label === 'task' ? 1 : 0,
          id: updateId,
          key: popoverType.replace('_campaign', ''),
          value: _value,
        },
        {
          data: _data, // any form of data e.g string/object/array
          channel: taskChannel,
        }
      )
    );
  };

  const handleAddReferenceLink = (inputs) => {
    const params = { ...inputs, rel_id: conceptId, rel_type: 1 };
    dispatch(addReferenceLink(conceptId, params));
  };

  const handleUpdateReferenceLink = (inputs) => {
    const params = { ...inputs, rel_id: conceptId, rel_type: 1 };
    dispatch(updateReferenceLink(conceptId, params));
  };

  const handleDeleteReferenceLink = (referenceLinkId) => {
    const params = { id: [referenceLinkId] };
    dispatch(deleteReferenceLink(conceptId, params));
  };

  return (
    <ConceptOverviewContext.Provider
      value={{
        conceptOverview,
        conceptList,
        campaignList,
        referenceLinks,
        partners,
        fetchPartners,
        conceptTaskList,
        fetchConceptTaskList,
        fetchUpdateCampaignList,
        openConceptFilter,
        errorConceptOverview,
        fetchReferenceLinks,
        errorReferenceLinks,
        fetchSyncCampaign,
        fetchSyncConcept,
        members,
        fetchMembers,
        statuses,
        fetchStatuses,
        fetchCampaignTask,
        loadMoreCampaigns,
        onSearchConceptList,
        onOpenConceptListFilter,
        onOpenReferenceLink,
        onFilterConceptList,
        onScrollToLastItem,
        downloadAllAssets,
        conceptListFilters,
        inputDatasources,
        fetchInputDatasources,
        handleSyncCampaign,
        handleSyncConcept,
        handlePopover,
        handleCampaignTasks,
        handleChannelTask,
        handleDialogOpen,
        handleUpdateGlobal,
        handleAddReferenceLink,
        handleDeleteReferenceLink,
        handleUpdateReferenceLink,
      }}
    >
      {children}
      {(fetchConceptOverview || fetchCampaignList || fetchConceptTaskList) && (
        <Loader />
      )}
      <GlobalDrawer
        content={<ConceptListFilters />}
        transitionDuration={{ enter: 300, exit: 400 }}
        name="drawer"
        isOpen={openConceptFilter}
        anchor="left"
        BackdropProps={{
          invisible: true,
          sx: { backgroundColor: '#25175aa3' },
        }}
        sx={{
          width: 300,
          zIndex: 1,
          '& .MuiDrawer-paper': {
            boxShadow: '10px 0 13px 1px #00000045',
            left: '300px',
            width: 300,
            marginTop: '50px',
          },
        }}
        hideBackdrop={true}
      />

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={6000}
        open={isNotify}
        onClose={handleCloseNotification}
        sx={{ width: 400 }}
        TransitionComponent={TransitionRight}
      >
        <Alert
          severity={notification?.type}
          sx={{ width: '100%' }}
          elevation={9}
          onClose={handleCloseNotification}
        >
          <AlertTitle sx={{ textTransform: 'capitalize' }}>
            {notification?.type}
          </AlertTitle>
          {notification?.message}
        </Alert>
      </Snackbar>

      <GlobalPopover
        id={`${popoverType}-popover`}
        isOpen={Boolean(anchorEl)}
        anchorEl={anchorEl}
        popperHorizontal="left"
        content={
          <>
            {popoverType?.toLowerCase()?.includes('status') ? (
              <Status
                data={statuses}
                fetch={fetchStatuses}
                value={value}
                handleUpdateGlobal={handleUpdateGlobal}
              />
            ) : popoverType?.toLowerCase()?.includes('date') ? (
              <DateTime value={value} handleUpdateGlobal={handleUpdateGlobal} />
            ) : popoverType?.toLowerCase()?.includes('tag') ? (
              popoverType
            ) : popoverType
                ?.toLowerCase()
                ?.includes('filter_reference_link') ? (
              popoverType
            ) : popoverType
                ?.toLowerCase()
                ?.includes('filter_platform_assets') ? (
              <FilterAsset assets={conceptOverview?.brief?.assets} />
            ) : popoverType?.toLowerCase()?.includes('range') ? (
              <RangeDate
                onChange={(ranges) =>
                  onFilterConceptList({
                    dateDelivered: [
                      {
                        raw: ranges[0].startDate,
                        parsed: formatDate(ranges[0].startDate, 'YYYY-MM-DD'),
                      },
                      {
                        raw: ranges[0].endDate,
                        parsed: formatDate(ranges[0].endDate, 'YYYY-MM-DD'),
                      },
                    ],
                  })
                }
              />
            ) : (
              <Users
                data={members?.data}
                fetch={fetchMembers}
                value={value}
                onSelect={handleUpdateGlobal}
              />
            )}
          </>
        }
        handleClose={() => setAnchorEl(null)}
      />
      <GlobalDialog
        open={isDialogOpen}
        handleClose={() => handleDialogOpen(null)}
        content={
          <ReferenceContent
            open={isDialogOpen}
            value={value}
            onClose={() => handleDialogOpen(null)}
          />
        }
      />
    </ConceptOverviewContext.Provider>
  );
}

ConceptOverviewProvider.propTypes = {
  children: PropTypes.any,
};

export default ConceptOverviewContext;
