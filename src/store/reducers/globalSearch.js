// Redux
import { createSlice } from '@reduxjs/toolkit';

// Services
import { requestGlobalSearch } from 'services/api/globalSearch';

const initialState = {
  concepts: [],
  campaigns: [],
  tasks: [],
  subTasks: [],
  savedSearches: [],
  recentSearches: [],
  fetchConcepts: false,
  fetchCampaigns: false,
  fetchTasks: false,
  fetchSubtasks: false,
  errorSearch: null,
  isSearching: false,
  notify: {
    title: null,
    type: null,
    message: null,
  },
  isNotify: false,
};

const globalSearch = createSlice({
  name: 'globalSearch',
  initialState,
  reducers: {
    initSearchConcepts: (state) => {
      state.fetchConcepts = true;
      state.errorSearch = null;
    },
    initSearchCampaigns: (state) => {
      state.fetchCampaigns = true;
      state.errorSearch = null;
    },
    initSearchTasks: (state) => {
      state.fetchTasks = true;
      state.errorSearch = null;
    },
    initSearchSubtasks: (state) => {
      state.fetchSubtasks = true;
      state.errorSearch = null;
    },
    successSearchConcepts: (state, { payload }) => {
      state.concepts = payload;
      state.fetchConcepts = false;
      state.errorSearch = null;
    },
    successSearchCampaigns: (state, { payload }) => {
      state.campaigns = payload;
      state.fetchCampaigns = false;
      state.errorSearch = null;
    },
    successSearchTasks: (state, { payload }) => {
      state.tasks = payload;
      state.fetchTasks = false;
      state.errorSearch = null;
    },
    successSearchSubtasks: (state, { payload }) => {
      state.subTasks = payload;
      state.fetchSubtasks = false;
      state.errorSearch = null;
    },
    errorSearch: (state, { payload }) => {
      state.fetchConcepts = false;
      state.fetchCampaigns = false;
      state.fetchTasks = false;
      state.fetchSubtasks = false;
      state.error = { message: payload };
    },
    // Populate
    addRecentSearches: (state, { payload }) => {
      state.recentSearches = [
        payload,
        ...state.recentSearches
          .slice(0, 9)
          .filter((i) => i.toLowerCase() != payload.toLowerCase()),
      ];
    },
    addSavedSearches: (state, { payload }) => {
      state.savedSearches = [
        payload,
        ...state.savedSearches.filter(
          (i) => i.toLowerCase() != payload.toLowerCase()
        ),
      ];

      state.isNotify = true;
      state.notify.title = 'Successfully added!';
      state.notify.message = `${payload} is now added in saved search.`;
      state.notify.type = 'success';
    },
    removeFromSavedSearches: (state, { payload }) => {
      state.savedSearches = [
        ...state.savedSearches.filter(
          (i) => i.toLowerCase() != payload.toLowerCase()
        ),
      ];
      state.isNotify = true;
      state.notify.title = 'Successfully removed!';
      state.notify.message = `${payload} is now removed in saved search.`;
      state.notify.type = 'success';
    },
    resetGlobalSearch: (state) => {
      state.concepts = [];
      state.campaigns = [];
      state.tasks = [];
      state.subTasks = [];
    },
    setIsSearching: (state, { payload }) => {
      
      state.isSearching = payload;
    },
    resetNotification: (state) => {
      state.isNotify = false;
    },
  },
});

export const {
  initSearchCampaigns,
  initSearchConcepts,
  initSearchSubtasks,
  initSearchTasks,
  successSearchCampaigns,
  successSearchConcepts,
  successSearchSubtasks,
  successSearchTasks,
  errorSearch,
  addSavedSearches,
  addRecentSearches,
  removeFromSavedSearches,
  resetGlobalSearch,
  setIsSearching,
  resetNotification,
} = globalSearch.actions;

export const getGlobalSearch =
  (type, keyword, page = 1) =>
  async (dispatch) => {
    switch (type) {
      case 'concept':
        dispatch(initSearchConcepts());
        break;
      case 'campaign':
        dispatch(initSearchCampaigns());
        break;
      case 'tasks':
        dispatch(initSearchTasks());
        break;
      default:
        dispatch(initSearchSubtasks());
        break;
    }

    const { success, data, message } = await requestGlobalSearch({
      type,
      keyword,
      page,
    });

    if (success) {
      switch (type) {
        case 'concept':
          dispatch(successSearchConcepts(data?.data));
          break;
        case 'campaign':
          dispatch(successSearchCampaigns(data?.data));
          break;
        case 'task':
          dispatch(successSearchTasks(data?.data));
          break;
        default:
          dispatch(successSearchSubtasks(data?.data));
          break;
      }
    } else {
      dispatch(errorSearch(message));
    }
  };

export default globalSearch.reducer;
