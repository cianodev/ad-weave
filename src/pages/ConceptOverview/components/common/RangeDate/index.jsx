import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import { Box } from '@mui/material';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import PropTypes from 'prop-types';

export default function RangeDate({ onChange }) {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const handleOnChange = (item) => {
    setState([item.selection]);
    onChange([item.selection]);
  };

  return (
    <Box>
      <DateRange
        editableDateInputs={true}
        onChange={handleOnChange}
        moveRangeOnFirstSelection={false}
        ranges={state}
      />
    </Box>
  );
}

RangeDate.propTypes = {
  onChange: PropTypes.any,
};
