import Loader from 'components/Common/Loader';
import { useOnMount } from 'hooks';
import _ from 'lodash';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getConceptList } from 'store/reducers/projects';

export default function Project() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { conceptList, fetchConceptList } = useSelector(
    (state) => state.projects
  );

  useOnMount(() => {
    dispatch(getConceptList());
  });

  useEffect(() => {
    const overview = !_.isEmpty(conceptList) && conceptList?.data[0];

    !_.isEmpty(overview) &&
      history.push(
        `/projects/${overview?.partner_uuid}/concept/${overview?.uuid}/overview`
      );
  }, [conceptList]);

  return <>{fetchConceptList && <Loader />}</>;
}
