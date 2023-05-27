import api from 'utils/api';

export const requestGetSmartlyTaskList = () =>
  api.callPost(`admin/smartly/task/`);

export const requestGetSmartlyTask = (id) =>
  api.callGet(`admin/smartly/task/overview/${id}/task/smartly`);

export const requestGetSmartlyTaskCount = () =>
  api.callGet(`admin/smartly/task/count`);
