import React, { createContext } from 'react';

import { useHistory, useLocation, useParams } from 'react-router-dom';

import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getSmartlyOverview } from 'store/reducers/smartly';
import { useOnMount } from 'hooks';
import Loader from 'components/Common/Loader';

const SmartlyTaskContext = createContext();

export function SmartlyTaskProvider({ children }) {
  const location = useLocation();
  const history = useHistory();

  const { type, taskId } = useParams();
  const dispatch = useDispatch();
  const { overview, fetchOverview, errorOverview } = useSelector(
    (state) => state.smartly
  );

  useOnMount(() => {
    // history.replace({
    //   pathname: `/smartly/${type}/${taskId}`,
    //   state: {
    //     background: location,
    //     type: type,
    //     subtask: false,
    //   },
    // });
  });

  React.useEffect(() => {
    dispatch(getSmartlyOverview(taskId));
  }, [type, taskId]);

  return (
    <SmartlyTaskContext.Provider
      value={{ overview, fetchOverview, errorOverview }}
    >
      {children}
      {fetchOverview && <Loader />}
    </SmartlyTaskContext.Provider>
  );
}

SmartlyTaskProvider.propTypes = {
  children: PropTypes.any,
};

export default SmartlyTaskContext;
