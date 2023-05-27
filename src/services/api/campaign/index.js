import api from 'utils/api';

// export const fetchCampaignsSpecific = (id) =>
//   api.callGet(`admin/campaigns/overview?id=${id}`);

// export const requestUpdateCampaignBykey = (params) =>
//   api.callPost('admin/campaigns/update-key', params);

export const fetchTimelog = (id) =>
  api.callGet(`admin/task-timelog/campaign?campaign_id=${id}`);

export const fetchReferenceLink = (id) =>
  api.callGet(`admin/link?rel_id=${id}&rel_type=2`);

export const fetchCampaignByConcept = (conceptId, partnerId) =>
  api.callGet(
    `admin/concepts/get-campaign?concept_id=${conceptId}&partner_id=${partnerId}`
  );

export const requestCampaignOverview = (campaignId) =>
  api.callGet(`admin/campaigns/overview/${campaignId}`);

// campaign task
export const requestCampaignTasks = (campaignId) =>
  api.callGet(`admin/campaigns/task/${campaignId}`);
