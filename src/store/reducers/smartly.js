import { createSlice } from '@reduxjs/toolkit';
import {
  requestGetSmartlyTaskList,
  requestGetSmartlyTaskCount,
  requestGetSmartlyTask,
} from 'services/api/smartly';

const initialState = {
  list: {},
  statistics: {},
  overview: {},
  fetchList: false,
  fetchStatistics: false,
  fetchOverview: false,
  errorList: null,
  errorStatistics: null,
  errorOverview: null,
};

const smartly = createSlice({
  name: 'smartly',
  initialState,
  reducers: {
    initSmartlyList: (state) => {
      state.fetchList = true;
      state.errorList = null;
    },
    successSmartlyList: (state, { payload }) => {
      state.list = payload;
      state.fetchList = false;
      state.errorList = null;
    },
    errorSmartlyList: (state, { payload }) => {
      state.fetchList = false;
      state.errorList = { message: payload };
    },
    initSmartlyStatistics: (state) => {
      state.fetchStatistics = true;
      state.errorStatistics = null;
    },
    successSmartlyStatistics: (state, { payload }) => {
      state.statistics = payload;
      state.fetchStatistics = false;
      state.errorStatistics = null;
    },
    errorSmartlyStatistics: (state, { payload }) => {
      state.fetchStatistics = false;
      state.errorStatistics = { message: payload };
    },
    initSmartlyOverview: (state) => {
      state.fetchOverview = true;
      state.errorOverview = null;
    },
    successSmartlyOverview: (state, { payload }) => {
      state.overview = payload;
      state.fetchOverview = false;
      state.errorOverview = null;
    },
    errorSmartlyOverview: (state, { payload }) => {
      state.fetchOverview = false;
      state.errorOverview = { message: payload };
    },
  },
});

export const {
  initSmartlyList,
  successSmartlyList,
  errorSmartlyList,
  initSmartlyStatistics,
  successSmartlyStatistics,
  errorSmartlyStatistics,
  initSmartlyOverview,
  successSmartlyOverview,
  errorSmartlyOverview,
} = smartly.actions;

export const getSmartlyTasksList = () => async (dispatch) => {
  dispatch(initSmartlyList());
  const { success, message, data } = await requestGetSmartlyTaskList();

  if (success) {
    dispatch(successSmartlyList(data));
  } else {
    dispatch(errorSmartlyList(message));
  }
};

export const getSmartlyStatistics = () => async (dispatch) => {
  dispatch(initSmartlyStatistics());

  const { success, message, data } = await requestGetSmartlyTaskCount();

  if (success) {
    dispatch(successSmartlyStatistics(data));
  } else {
    dispatch(errorSmartlyStatistics(message));
  }
};

export const getSmartlyOverview =
  (id) =>
  async (dispatch) => {
    dispatch(initSmartlyOverview());
    const { success, message, data } = await requestGetSmartlyTask(id);

    if (success) {
      dispatch(successSmartlyOverview(data));
    } else {
      dispatch(errorSmartlyOverview(message));
    }
  };

export default smartly.reducer;
