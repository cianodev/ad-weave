import api from 'utils/api';

// concept list
export const requestConceptList = (page, params) =>
  api.callPost(`admin/concepts?page=${page}&limit=30`, params);

//   concept overview
export const requestConceptOverview = ({ conceptId, partnerId }) =>
  api.callGet(
    `admin/concepts/overview-v2?concept_id=${conceptId}&partner_id=${partnerId}`
  );

//   campaigns list
export const requestCampaignList = (conceptId, page) =>
  api.callGet(`admin/concepts/campaign/${conceptId}?page=${page}&limit=5`);

// concept task, 1 = GD, 2 = GV, 3 = MS, 4 = MV, 5 = Y, 6 = ALL
export const requestConceptTasks = (conceptId, channel) =>
  api.callGet(`admin/concepts/task/${conceptId}/${channel}`);

//   reference link list
export const requestReferenceLinks = (cid) =>
  api.callGet(`admin/link?rel_id=${cid}&rel_type=1`);

//    add reference link
export const requestAddReferenceLink = (params) =>
  api.callPost(`admin/link/create`, params);

// export const requestAddReferenceLink = (params) =>
//   api.callPost('admin/concepts/link-store', params);

// edit reference link
export const requestUpdateReferenceLink = (params) =>
  api.callPost(`admin/link/update`, params);

// export const requestUpdateReferenceLink = (params) =>
//   api.callPost('admin/concepts/link-update', params);

// remove reference link
export const requestDeleteReferenceLink = (params) =>
  api.callPost(`admin/link/delete`, params);

// export const requestDeleteReferenceLink = (params) =>
//   api.callPost('admin/concepts/links-delete', params);

// force sync campaign
export const requestSyncCampaign = (id) =>
  api.callGet(`admin/campaigns/pull-campaign?cid=${id}`);

// force sync concept
export const requestSyncConcept = (id) =>
  api.callGet(`admin/concepts/pull?pid=${id}`);

// update projects per key 1 = concept, 2 = campaign, 3 = task, 4 subtask
export const requestProjectUpdate = (params, rel_type) =>
  api.callPost(`admin/projects/update?rel_type${rel_type}`, params);

export const fetchAllTags = () => api.callGet(`admin/tags`);
