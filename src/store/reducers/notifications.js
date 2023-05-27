// Redux
import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
// Services
import {
  requestNotification,
  requestNotificationMarkAsRead,
  requestNotificationMarkAllRead,
  requestNotificationCount,
} from 'services/api/notification';

const initialState = {
  list: {
    all: {},
    read: {},
    unread: {},
  },
  count: {
    all: null,
    read: null,
    unread: null,
  },
  fetchNotification: false,
  errorNotification: null,
};

const notifications = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    initNotification: (state) => {
      state.errorNotification = null;
      state.fetchNotification = true;
    },

    notificationSuccess: (state, { payload }) => {
      return {
        ...state,
        list: {
          ...state.list,
          [payload.type]: {
            ...state.list[payload.type],
            data:
              payload?.data?.current_page === 1
                ? payload.data?.data
                : [...state.list[payload.type]?.data, ...payload.data?.data],
            current_page: payload.data.current_page,
            next_page_url: payload.data.next_page_url,
            last_page: payload.data.last_page,
          },
        },
        fetchNotification: false,
      };
    },

    notificationCountSuccess: (state, { payload }) => {
      state.count[_.isEmpty(payload?.query) ? 'all' : payload?.query] =
        payload?.data;
    },

    notificationUpdate: (state, { payload }) => {
      return {
        ...state,
        list: {
          ...state.list,
          data: state.list.data?.map((obj) =>
            obj?.id === payload.data
              ? { ...obj, status: 'read' }
              : { ...obj, status: obj?.status }
          ),
        },
      };
    },

    notificationError: (state, { payload }) => {
      state.errorNotification = payload;
      state.fetchNotification = false;
    },
  },
});

export const {
  initNotification,
  notificationSuccess,
  notificationCountSuccess,
  notificationUpdate,
  notificationError,
} = notifications.actions;

export const getNotification =
  (type, page = 1) =>
  async (dispatch) => {
    page === 1 && dispatch(initNotification());

    const { success, data, message } = await requestNotification(type, page);

    if (success) {
      dispatch(notificationSuccess({ type, data }));
    } else {
      dispatch(notificationError(message));
    }
  };

export const getNotificationAllRead = (type) => async (dispatch) => {
  dispatch(initNotification());
  const { success, message } = await requestNotificationMarkAllRead();
  if (success) {
    dispatch(getNotificationCount('all'));
    dispatch(getNotificationCount('unread'));
    dispatch(getNotificationCount('read'));
    dispatch(getNotification(type, 1));
  } else {
    dispatch(notificationError(message));
  }
};

export const setNotificationToRead = (id, type) => async (dispatch) => {
  const { success, message } = await requestNotificationMarkAsRead(id);
  if (success) {
    dispatch(getNotificationCount('all'));
    dispatch(getNotificationCount('unread'));
    dispatch(getNotificationCount('read'));
    dispatch(getNotification(type, 1));
  } else {
    dispatch(notificationError(message));
  }
};

//read, unread, no param  all
export const getNotificationCount = (query) => async (dispatch) => {
  const { success, data, message } = await requestNotificationCount(query);
  if (success) {
    dispatch(notificationCountSuccess({ query, data }));
  } else {
    dispatch(notificationError(message));
  }
};

export default notifications.reducer;
