import api from 'utils/api';

// concept list
export const requestStatus = (type) =>
  api.callGet(`admin/status?rel_type=${type}`);