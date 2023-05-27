import React, { createContext, useState } from 'react';

import PropTypes from 'prop-types';
import { useOnMount } from 'hooks';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'components/Common/Loader';
import { fetchPartners } from 'store/reducers/partners';

const PartnersContext = createContext();

export function PartnersProvider({ children }) {
  const dispatch = useDispatch();
  const { list, isLoading, error } = useSelector((state) => state.partners);

  useOnMount(() => {
    dispatch(fetchPartners());
  });

  const handleSearch = () => {};

  return (
    <PartnersContext.Provider
      value={{
        list,
        error,
        handleSearch,
      }}
    >
      {children}
      {isLoading && <Loader />}
    </PartnersContext.Provider>
  );
}

PartnersProvider.propTypes = {
  children: PropTypes.any,
};

export default PartnersContext;
