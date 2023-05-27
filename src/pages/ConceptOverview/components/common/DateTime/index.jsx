import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Box, Typography } from '@mui/material';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MultiSectionDigitalClock } from '@mui/x-date-pickers/MultiSectionDigitalClock';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import PropTypes from 'prop-types';
import { useOnUnmount } from 'hooks';

export default function DateTime({ value, handleUpdateGlobal }) {
  const [date, setDate] = useState(
    dayjs(value ?? new Date()).format('MM-DD-YYYY')
  );
  const [time, setTime] = useState(
    dayjs(value ?? new Date()).format('HH:mm:ss')
  );

  useOnUnmount(() => handleUpdateGlobal(`${date} ${time}`));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex">
        <Box>
          <StaticDatePicker
            defaultValue={dayjs(value ?? new Date())}
            onChange={(e) => setDate(dayjs(e).format('MM-DD-YYYY'))}
            showToolbar={false}
            className="static-date-picker"
          />
        </Box>
        <Box borderLeft="1px solid #ececec">
          <Box p={1} borderBottom="1px solid #ececec">
            <Typography variant="caption" fontWeight={700}>
              Time
            </Typography>
          </Box>
          <MultiSectionDigitalClock
            timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
            views={['hours', 'minutes', 'seconds']}
            ampm={false}
            defaultValue={dayjs(value ?? new Date())}
            onChange={(e) => setTime(dayjs(e).format('HH:mm:ss'))}
            className="static-time-picker"
          />
        </Box>
      </Box>
    </LocalizationProvider>
  );
}

DateTime.propTypes = {
  value: PropTypes.any,
  handleUpdateGlobal: PropTypes.func,
};
