import api from 'utils/api';

// concept list
export const requestUpdateKey = (params) =>
  api.callPost(`admin/global/update`, params);

//   parent = 0/1, id = concept, campaign,task id, key= "type_key", value=id
