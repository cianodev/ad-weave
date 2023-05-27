// React
import { useEffect } from 'react';
// Redux
import { useDispatch } from 'react-redux';
// Router
import { useHistory, useLocation } from 'react-router-dom';
// Reducers
import { logout } from 'store/reducers/auth';
// Utilities
import _ from 'lodash';
import { getToken } from 'utils/session';
import { useOnMount } from 'hooks';

export default () => {
  const accessToken = getToken();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname, search } = useLocation();

  useEffect(() => {
    localStorage.getItem('patch') !== 'v2.2' && dispatch(logout());

    if (_.isNull(accessToken)) {
      pathname.includes('task') && sessionStorage.setItem('path', pathname);
      history.replace('/login');
    } else {
      if (pathname.includes('login')) {
        history.replace('/');
      } else {
        history.push({
          pathname: pathname,
          search: search,
          state: pathname.includes('task')
            ? {
                background: location,
              }
            : {},
        });
      }
    }
  }, [accessToken]);
};
