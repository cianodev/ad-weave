import React from 'react';

import PropTypes from 'prop-types';

import { OutlinedInput, styled } from '@mui/material';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';

const StyledInputField = styled(OutlinedInput)({
  fontSize: '12px',
  borderRadius: '0.2em',
  width: '200px',
  height: 'max-content',
  input: {
    padding: '5px 7px',
  },
  paddingLeft: '9px',
  '&.Mui-focused fieldset': {
    border: '1px solid #5025c4 !important',
    boxShadow: '0 0 0 4px rgb(80 37 196 / 10%)',
  },
});

export default function SearchInput({ placeholder, ...props }) {
  return (
    <StyledInputField
      startAdornment={
        <SearchTwoToneIcon sx={{ fontSize: '20px', color: '#9e9e9e' }} />
      }
      size="small"
      fullWidth
      placeholder={placeholder}
      {...props}
    />
  );
}

SearchInput.propTypes = {
  placeholder: PropTypes.string,
};
