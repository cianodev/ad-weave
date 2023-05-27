import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import {
  requestDashboardStatusCount,
  requestDashboardResources,
  requestDashboardTimelog,
  requestDashboardFilters,
} from 'services/api/dashboard';

import { requestUsers } from 'services/api/user';

import { requestStatus } from 'services/api/status';

import { requestPriorityFlag } from 'services/api/maintenance';

import { requestUpdateKey } from 'services/api/updateKey';

import { initTimeLogs } from './timer';

const initialState = {
  statusCount: {},
  totalTime: {},
  dashboard: {},
  resources: {},
  members: [],
  statuses: [],
  priorities: [],
  fetchUpdateKey: false,
  fetchStatusCount: false,
  fetchTotalTime: false,
  fetchDashboard: false,
  fetchResources: false,
  fetchMembers: false,
  fetchStatuses: false,
  fetchPriorities: false,
  errorUpdateKey: null,
  errorStatusCount: null,
  errorTotalTime: null,
  errorDashboard: null,
  errorResources: null,
  errorMembers: null,
  errorStatuses: null,
  errorPriorities: null,
  fetchRepullDashboard: false,
};

const dashboard = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    initDashboard: (state) => {
      state.fetchDashboard = true;
      state.errorDashboard = null;
    },
    initRepullDashboard: (state) => {
      state.fetchRepullDashboard = true;
      state.errorDashboard = null;
    },
    initStatusCount: (state) => {
      state.fetchStatusCount = true;
      state.errorStatusCount = null;
    },
    initTotalTime: (state) => {
      state.fetchTotalTime = true;
      state.errorTotalTime = null;
    },
    initResources: (state) => {
      state.fetchResources = true;
      state.errorResources = null;
    },
    initMembers: (state) => {
      state.fetchMembers = true;
      state.errorMembers = null;
    },
    initStatuses: (state) => {
      state.fetchStatuses = true;
      state.errorStatuses = null;
    },
    initPriorities: (state) => {
      state.fetchPriorities = true;
      state.errorPriorities = null;
    },
    successDashboard: (state, { payload }) => {
      state.dashboard = payload;
      state.fetchDashboard = false;
      state.errorDashboard = null;
    },
    successRepullDashboard: (state, { payload }) => {
      state.dashboard = payload;
      state.fetchRepullDashboard = false;
      state.errorDashboard = null;
    },
    successTotalTime: (state, { payload }) => {
      state.totalTime = payload;
      state.fetchTotalTime = false;
      state.errorTotalTime = null;
    },
    successStatusCount: (state, { payload }) => {
      state.statusCount = payload;
      state.fetchStatusCount = false;
      state.errorStatusCount = null;
    },
    successResources: (state, { payload }) => {
      state.resources = payload;
      state.fetchResources = false;
      state.errorResources = null;
    },
    initUpdateKey: (state) => {
      state.fetchUpdateKey = true;
      state.errorUpdateKey = null;
    },
    successMembers: (state, { payload }) => {
      state.members = payload;
      state.fetchMembers = false;
      state.errorMembers = null;
    },
    successStatuses: (state, { payload }) => {
      state.statuses = payload;
      state.fetchStatuses = false;
      state.errorStatuses = null;
    },
    successPriorities: (state, { payload }) => {
      state.priorities = payload;
      state.fetchPriorities = false;
      state.errorPriorities = null;
    },
    successUpdateKey: (state, { payload }) => {
      const {
        params1: { id, key, value },
        params2: { data, channel },
        response, // api response
      } = payload;

      switch (key) {
        // case 'task_status':
        //   return {
        //     ...state,
        //     dashboard: {
        //       ...state?.dashboard,
        //       all_tasks: {
        //         ...state?.dashboard?.all_tasks,
        //         data: state?.dashboard?.all_tasks?.data?.map((task) =>
        //           task?.id === id
        //             ? {
        //                 ...task,
        //                 status_name: data, // TODO: Map response from BE
        //                 status_id: value,
        //               }
        //             : task
        //         ),
        //       },
        //     },
        //   };

        case 'task_due_date':
          return {
            ...state,
            dashboard: {
              ...state?.dashboard,
              all_tasks: {
                ...state?.dashboard?.all_tasks,
                data: state?.dashboard?.all_tasks?.data?.map((task) =>
                  task?.id === id
                    ? {
                        ...task,
                        due_date: response,
                      }
                    : task
                ),
              },
            },
          };

        case 'task_delivery_date':
          return {
            ...state,
            dashboard: {
              ...state?.dashboard,
              all_tasks: state?.dashboard?.all_tasks?.data?.map((task) =>
                task?.id === id
                  ? {
                      ...task,
                      delivery_date: response,
                    }
                  : task
              ),
            },
          };

        case 'task_assignees':
          return {
            ...state,
            dashboard: {
              ...state?.dashboard,
              all_tasks: state?.dashboard?.all_tasks?.data?.map((task) =>
                task?.id === id
                  ? {
                      ...task,
                      assignees: response,
                    }
                  : task
              ),
            },
          };

        default:
          break;
      }
    },
    errorDashboard: (state, { payload }) => {
      state.errorDashboard = { message: payload };
      state.fetchDashboard = false;
    },
    errorTotalTime: (state, { payload }) => {
      state.fetchTotalTime = false;
      state.errorTotalTime = { message: payload };
    },
    errorStatusCount: (state, { payload }) => {
      state.fetchStatusCount = false;
      state.errorStatusCount = { message: payload };
    },
    errorResources: (state, { payload }) => {
      state.fetchResources = false;
      state.errorResources = { message: payload };
    },
    errorUpdateKey: (state, { payload }) => {
      state.fetchUpdateKey = false;
      state.errorUpdateKey = { message: payload };
    },
  },
});

export const {
  initDashboard,
  initStatusCount,
  initTotalTime,
  initResources,
  initRepullDashboard,
  initMembers,
  initStatuses,
  initPriorities,
  initUpdateKey,
  successDashboard,
  successStatusCount,
  successTotalTime,
  successResources,
  successRepullDashboard,
  successMembers,
  successStatuses,
  successPriorities,
  successUpdateKey,
  errorUpdateKey,
  errorDashboard,
  errorStatusCount,
  errorTotalTime,
  errorResources,
  errorMembers,
  errorStatuses,
  errorPriorities,
} = dashboard.actions;

export const getDashboardTasks =
  (page = 1, limit = 20, params, type) =>
  async (dispatch) => {
    type === 'repull'
      ? dispatch(initRepullDashboard())
      : dispatch(initDashboard());

    const { success, data, message } = await requestDashboardFilters(
      page,
      limit,
      params
    );

    success
      ? type === 'repull'
        ? dispatch(successRepullDashboard(data))
        : dispatch(successDashboard(data))
      : dispatch(errorDashboard(message));
  };

export const getStatusCounter = () => async (dispatch) => {
  dispatch(initStatusCount());

  const { success, data, message } = await requestDashboardStatusCount();

  success
    ? dispatch(successStatusCount(data[0]))
    : dispatch(errorStatusCount(message));
};

export const getResources = () => async (dispatch) => {
  dispatch(initResources());

  const { success, data, message } = await requestDashboardResources();

  success
    ? dispatch(successResources(data))
    : dispatch(errorResources(message));
};

export const getMembers = () => async (dispatch) => {
  dispatch(initMembers());

  const { success, message, data } = await requestUsers();

  success ? dispatch(successMembers(data)) : dispatch(errorMembers(message));
};

export const getStatuses = (type) => async (dispatch) => {
  dispatch(initStatuses());

  const { success, message, data } = await requestStatus(type);

  success ? dispatch(successStatuses(data)) : dispatch(errorStatuses(message));
};

export const getPriorities = () => async (dispatch) => {
  dispatch(initPriorities());

  const { success, data, message } = await requestPriorityFlag();

  success
    ? dispatch(successPriorities(data))
    : dispatch(errorPriorities(message));
};

export const getDashboardTotalTime = () => async (dispatch) => {
  dispatch(initTimeLogs());

  const { success, data, message } = await requestDashboardTimelog();
  success
    ? dispatch(successTotalTime(data))
    : dispatch(errorTotalTime(message));
};

export const updateGlobal = (params1, params2) => async (dispatch) => {
  dispatch(initUpdateKey());

  const { success, data, message } = await requestUpdateKey(params1);

  success
    ? dispatch(successUpdateKey({ params1, params2, response: data ?? {} }))
    : dispatch(errorUpdateKey(message));
};

export default dashboard.reducer;
