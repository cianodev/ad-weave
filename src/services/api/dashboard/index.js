import api from 'utils/api';

export const requestDashboard = (page, params) =>
  api.callPost(`admin/dashboard?page=${page}`, params);

export const requestDashboardFilters = (page, limit, params) =>
  api.callPost(
    `admin/dashboard/filter-search?page=${page}&limit=${limit}`,
    params
  );

export const requestDashboardResources = () =>
  api.callGet(`admin/dashboard/dashboard-resource`);

export const requestDashboardStatusCount = () =>
  api.callGet(`admin/task/status-count`);

export const requestDashboardTimelog = () =>
  api.callGet(`admin/dashboard/user_total_time?limit=1000`);

export const requestDashboardEOD = (params) =>
  api.callPost('admin/dashboard/eod-report', params);

export const requestDashboardFilter = (params) =>
  api.callPost('admin/dashboard', params);
