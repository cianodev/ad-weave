import api from 'utils/api';

// Task Status
export const requestNotification = (type, page) =>
  api.callGet(
    type === 'all'
      ? `admin/notification?page=${page}`
      : `admin/notification/${type}-notification?page=${page}`
  );

export const requestNotificationMarkAllRead = () =>
  api.callGet('admin/notification?query=read_all');

export const requestNotificationMarkAsRead = (id) =>
  api.callGet(`admin/notification?id=${id}&query=read`);

export const requestNotificationById = (rel_type, rel_id) =>
  api.callGet(
    `admin/notification/get-data?rel_type=${rel_type}&rel_id=${rel_id}`
  );

export const requestNotificationCount = (query) =>
  api.callGet(`admin/notification/count?q=${query}`);
