import React, { createContext, useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { useOnMount } from 'hooks';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'components/Common/Loader';

import { getCampaignOverview, getCampaignTask } from 'store/reducers/campaign';
import { useLocation } from 'react-router-dom';

const CampaignOverviewContext = createContext();

export function CampaignOverviewProvider({ children }) {
  const location = useLocation();

  const urlParams = new URLSearchParams(location.search);

  const campaignId = urlParams.get('campaignId');

  const dispatch = useDispatch();

  // popper
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverType, setPopoverType] = useState(null);
  const [value, setValue] = useState(null);

  const {
    overview,
    tasks,
    fetchCampaignTasks,
    errorCampaignTasks,
    fetchCampaignOverview,
    errorCampaignOverview,
  } = useSelector((state) => state.campaign);

  useEffect(() => {
    dispatch(getCampaignOverview(campaignId));
    dispatch(getCampaignTask(campaignId));
  }, [campaignId]);

  const handlePopover = () => {};

  return (
    <CampaignOverviewContext.Provider
      value={{
        overview,
        errorCampaignOverview,
        tasks,
        fetchCampaignTasks,
        errorCampaignTasks,
        handlePopover,
      }}
    >
      {children}
      {fetchCampaignOverview && <Loader />}
    </CampaignOverviewContext.Provider>
  );
}

CampaignOverviewProvider.propTypes = {
  children: PropTypes.any,
};

export default CampaignOverviewContext;
