import { createSlice } from '@reduxjs/toolkit';

import {
  fetchUserTimeLogsRequest,
  fetchActiveTimerRequest,
  fetchPartnersRequest,
  fetchCampaignsRequest,
  fetchConceptsequest,
  fetchCategoriesRequest,
  fetchCategoriesWithRequiredFieldsRequest,
  startTimerRequest,
  playRunningTimerRequest,
  stopRunningTimerRequest,
  updateTimerRequest,
  deleteTimerRequest,
} from 'services/api/timer';

import _ from 'lodash';

const initialState = {
  list: [],
  categories: [],
  logs: {},
  active: {},
  partners: [],
  campaigns: [],
  concepts: [],
  isUpdatingTimer: false,
  isFetching: false,
  isFetchingActiveTimer: false,
  isFetchingWithPagination: false,
  isFetchingCategoriesWithRequiredFields: false,
  error: null,
};

const timer = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    reset: (state) => {
      state.list = [];
      state.categories = [];
      state.logs = [];
      state.active = {};
      state.partners = [];
      state.campaigns = [];
      state.concepts = [];
      state.isFetching = false;
      state.isUpdatingTimer = false;
      state.isFetchingActiveTimer = false;
      state.isFetchingCategoriesWithRequiredFields = false;
      state.error = null;
    },
    initPresetCategories: (state) => {
      state.error = null;
    },
    initCategoriesWithRequiredFields: (state) => {
      state.error = null;
      state.isFetchingCategoriesWithRequiredFields = true;
    },
    initTimeLogs: (state, { payload }) => {
      state.isFetching = payload;
      state.error = null;
    },
    initPaginatedTimeLogs: (state, { payload }) => {
      state.isFetchingWithPagination = payload;
      state.error = null;
    },
    initActiveTimer: (state) => {
      state.isFetchingActiveTimer = true;
    },
    startTimerStart: (state) => {
      state.isUpdatingTimer = true;
    },
    stopTimerStart: (state) => {
      state.isUpdatingTimer = true;
    },
    initPresetCategoriesSuccess: (state, { payload }) => {
      state.list = payload;
    },
    initCategoriesWithRequiredFieldsSuccess: (state, { payload }) => {
      state.categories = payload;
      state.isFetchingCategoriesWithRequiredFields = false;
    },
    initTimelogSuccess: (state, { payload }) => {
      state.logs = payload;
      state.error = null;
      state.isFetching = false;
    },
    initPaginatedTimelogSuccess: (state, { payload }) => {
      state.isFetchingWithPagination = false;
      state.logs = {
        ...payload,
        data: [...(state.logs.data ?? []), ...payload.data],
      };
      state.error = null;
    },
    initActiveTimerSuccess: (state, { payload }) => {
      state.active = payload;
      state.error = null;
      state.isFetchingActiveTimer = false;
    },
    initPartnersSuccess: (state, { payload }) => {
      state.partners = payload;
      state.error = null;
    },
    initCampaignsSuccess: (state, { payload }) => {
      state.campaigns = payload;
      state.error = null;
    },
    initConceptsSuccess: (state, { payload }) => {
      state.concepts = payload;
      state.error = null;
    },
    startTimerSuccess: (state, { payload }) => {
      state.isUpdatingTimer = false;
      state.active = payload;
    },
    stopTimerSuccess: (state) => {
      state.isUpdatingTimer = false;
      state.active = {};
    },
    deleteTimerSuccess: (state) => {},
    initPresetCategoriesFailed: (state, { payload }) => {
      state.error = payload;
      state.list = [];
    },
    initCategoriesWithRequiredFieldsFailed: (state, { payload }) => {
      state.error = payload;
      state.categories = [];
      state.isFetchingCategoriesWithRequiredFields = false;
    },
    initTimelogsFailed: (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    },
    initActiveTimerFailed: (state, { payload }) => {
      state.error = payload;
    },
    initPartnersFailed: (state, { payload }) => {
      state.error = payload;
    },
    initCampaignsFailed: (state, { payload }) => {
      state.error = payload;
    },
    initConceptsFailed: (state, { payload }) => {
      state.error = payload;
    },
    startTimerFailed: (state, { payload }) => {
      state.error = payload;
      state.isUpdatingTimer = false;
    },
    stopTimerFailed: (state, { payload }) => {
      state.error = payload;
      state.isUpdatingTimer = false;
    },
    deleteTimerFailed: (state, { payload }) => {
      state.error = payload;
    },
    updateTimerFailed: (state, { payload }) => {
      state.error = payload;
      state.isUpdatingTimer = false;
    },
  },
});

export const {
  reset,
  initTimeLogs,
  initPaginatedTimeLogs,
  initActiveTimer,
  initPresetCategories,
  initCategoriesWithRequiredFields,
  initPresetCategoriesSuccess,
  initCategoriesWithRequiredFieldsSuccess,
  startTimerStart,
  stopTimerStart,
  initTimelogSuccess,
  initPaginatedTimelogSuccess,
  initActiveTimerSuccess,
  initPartnersSuccess,
  initCampaignsSuccess,
  initConceptsSuccess,
  startTimerSuccess,
  stopTimerSuccess,
  deleteTimerSuccess,
  initPresetCategoriesFailed,
  initCategoriesWithRequiredFieldsFailed,
  initTimelogsFailed,
  initActiveTimerFailed,
  initPartnersFailed,
  initCampaignsFailed,
  initConceptsFailed,
  startTimerFailed,
  stopTimerFailed,
  updateTimerFailed,
  deleteTimerFailed,
} = timer.actions;

// fetch task datasource
export const fetchCategories = () => async (dispatch) => {
  dispatch(initPresetCategories());

  const { success, data, message } = await fetchCategoriesRequest();

  success
    ? dispatch(initPresetCategoriesSuccess(data.data))
    : dispatch(initPresetCategoriesFailed(message));
};

export const fetchCategoriesWithRequiredFields = () => async (dispatch) => {
  dispatch(initCategoriesWithRequiredFields());

  const { success, data, message } =
    await fetchCategoriesWithRequiredFieldsRequest();

  success
    ? dispatch(
        initCategoriesWithRequiredFieldsSuccess(data.task_categories ?? [])
      )
    : dispatch(initCategoriesWithRequiredFieldsFailed(message));
};

// fetch user time logs
export const fetchUserTimeLogs =
  (userId, pagination, onSuccess, shouldShowLoader = true) =>
  async (dispatch) => {
    const wantsToLoadFirstPage =
      _.isNull(pagination.page) || (pagination.page ?? 1) === 1;

    wantsToLoadFirstPage
      ? dispatch(initTimeLogs(shouldShowLoader))
      : dispatch(initPaginatedTimeLogs(shouldShowLoader));

    const { success, data, message } = await fetchUserTimeLogsRequest(
      userId,
      pagination
    );

    if (success) {
      _.isNull(pagination.page) || (pagination.page ?? 1) === 1
        ? dispatch(initTimelogSuccess(data))
        : dispatch(initPaginatedTimelogSuccess(data));
      onSuccess();
    } else {
      dispatch(initTimelogsFailed(message));
    }
  };

// fetch active timer
export const fetchActiveTimer = () => async (dispatch) => {
  dispatch(initActiveTimer());

  const { success, data, message } = await fetchActiveTimerRequest();

  success
    ? dispatch(initActiveTimerSuccess(data))
    : dispatch(initActiveTimerFailed(message));
};

// fetch partners
export const fetchPartners = () => async (dispatch) => {
  const { success, data, message } = await fetchPartnersRequest();

  success
    ? dispatch(initPartnersSuccess(data))
    : dispatch(initPartnersFailed(message));
};

// fetch campaigns
export const fetchCampaigns = () => async (dispatch) => {
  const { success, data, message } = await fetchCampaignsRequest();

  success
    ? dispatch(initCampaignsSuccess(data))
    : dispatch(initCampaignsFailed(message));
};

// fetch concepts
export const fetchConcepts = () => async (dispatch) => {
  const { success, data, message } = await fetchConceptsequest();

  success
    ? dispatch(initConceptsSuccess(data))
    : dispatch(initConceptsFailed(message));
};

// start timer
export const startTimerById = (params) => async (dispatch) => {
  dispatch(startTimerStart());

  const { success, data, message } = await startTimerRequest(params);

  success
    ? dispatch(startTimerSuccess(data))
    : dispatch(startTimerFailed(message));
};

// play timer
// export const playTimerById = (userId, params) => async (dispatch) => {
//   dispatch(startTimerStart());

//   const { success, data, message } = await playRunningTimerRequest(params);

//   if (success) {
//     dispatch(startTimerSuccess(data));
//     dispatch(fetchUserTimeLogs(userId, 1, () => {}, false));
//   } else {
//     dispatch(startTimerFailed(message));
//   }
// };

// stop timer
export const stopTimerById =
  (userId, params, pagination) => async (dispatch) => {
    dispatch(stopTimerStart());

    const { success, message } = await stopRunningTimerRequest(params);

    if (success) {
      dispatch(stopTimerSuccess());
      dispatch(fetchUserTimeLogs(userId, pagination, () => {}, false));
    } else {
      dispatch(startTimerFailed(message));
    }
  };

// update timer
export const updateTimer = (userId, params, pagination) => async (dispatch) => {
  const { success, message } = await updateTimerRequest(params);

  if (success) {
    dispatch(fetchUserTimeLogs(userId, pagination, () => {}, false));
  } else {
    dispatch(updateTimerFailed(message));
  }
};

// delete timer
export const deleteTimer =
  (userId, params, pagination, onSuccess) => async (dispatch) => {
    const { success, message } = await deleteTimerRequest(params);

    if (success) {
      dispatch(deleteTimerSuccess());
      dispatch(fetchUserTimeLogs(userId, pagination, onSuccess, false));
    } else {
      dispatch(deleteTimerFailed(message));
    }
  };

export default timer.reducer;
