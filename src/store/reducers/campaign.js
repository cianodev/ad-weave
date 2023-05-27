// Redux
import { createSlice } from '@reduxjs/toolkit';

import {
  requestCampaignOverview,
  requestCampaignTasks,
} from 'services/api/campaign';

const initialState = {
  overview: {},
  tasks: [],
  fetchCampaignOverview: false,
  fetchCampaignTasks: false,
  errorCampaignOverview: null,
  errorCampaignTasks: [],
};

const campaign = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    initCampaignOverview: (state) => {
      state.fetchCampaignOverview = true;
      state.errorCampaignOverview = null;
    },
    successCampaignOverview: (state, { payload }) => {
      state.overview = payload;
      state.fetchCampaignOverview = false;
      state.errorCampaignOverview = null;
    },
    errorCampaignOverview: (state, { payload }) => {
      state.fetchCampaignOverview = false;
      state.errorCampaignOverview = { message: payload };
    },
    initCampaignTasks: (state) => {
      state.fetchCampaignTasks = true;
      state.errorCampaignTasks = null;
    },
    successCampaignTasks: (state, { payload }) => {
      state.tasks = payload;
      state.fetchCampaignTasks = false;
      state.errorCampaignTasks = null;
    },
    errorCampaignTasks: (state, { payload }) => {
      state.fetchCampaignTasks = false;
      state.errorCampaignTasks = { message: payload };
    },
  },
});

export const {
  initCampaignOverview,
  successCampaignOverview,
  errorCampaignOverview,
  initCampaignTasks,
  successCampaignTasks,
  errorCampaignTasks,
} = campaign.actions;

export const getCampaignOverview = (campaignId) => async (dispatch) => {
  dispatch(initCampaignOverview());

  const { success, data, message } = await requestCampaignOverview(campaignId);

  success
    ? dispatch(successCampaignOverview(data))
    : dispatch(errorCampaignOverview(message));
};

export const getCampaignTask = (campaignId) => async (dispatch) => {
  dispatch(initCampaignTasks());

  const { success, data, message } = await requestCampaignTasks(campaignId);

  success
    ? dispatch(successCampaignTasks(data))
    : dispatch(errorCampaignTasks(message));
};

export default campaign.reducer;
