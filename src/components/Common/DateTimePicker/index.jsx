import * as React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';

export default function DateTimePicker({
  value,
  handleOnChange,
  handleOnClose,
}) {
  const handleOnClosePicker = () => {
    handleOnClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDateTimePicker
        value={value}
        componentsProps={{
          actionBar: {
            actions: [],
          },
        }}
        ampm={false}
        closeOnSelect={true}
        onClose={handleOnClosePicker}
        onChange={handleOnChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

DateTimePicker.propTypes = {
  value: PropTypes.any,
  handleOnChange: PropTypes.func,
  handleOnClose: PropTypes.func,
};
