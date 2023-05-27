import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Autocomplete, TextField } from '@mui/material';
import _ from 'lodash';
import { useOnMount } from 'hooks';

export default function GlobalAutoComplete({ value, data, onChange, loading }) {
  const [state, setState] = useState([]);

  useOnMount(() => {
    setState(value);
  });

  const handleOnChange = (e, value) => {
    setState(value);
    onChange(e, value);
  };

  return (
    <div>
      <Autocomplete
        freeSolo
        multiple
        size="small"
        value={state || []}
        options={data || []}
        getOptionLabel={(option) =>
          _.isEmpty(option?.name)
            ? option?.fullname
            : _.startCase(option?.name?.replace(/_/g, ' '))
        }
        renderInput={(params) => <TextField {...params} disabled={loading} />}
        disabled={loading}
        onChange={handleOnChange}
      />
    </div>
  );
}

GlobalAutoComplete.propTypes = {
  value: PropTypes.array,
  data: PropTypes.array,
  loading: PropTypes.any,
  onChange: PropTypes.any,
};
