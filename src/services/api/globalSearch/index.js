import api from 'utils/api';

export const fetchSearchResultsRequest = ({ keyword, page }) =>
  api.callGet(`admin/search?keyword=${keyword}&page=${page}`);

export const requestGlobalSearch = ({ type, keyword, page }) =>
  api.callPost(
    `admin/global/search?type=${type}&keyword=${keyword}&page=${page}&limit=10`
  );
