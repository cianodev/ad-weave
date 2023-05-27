import * as React from 'react';

import PropTypes from 'prop-types';

import { styled } from '@mui/system';
import { useAutocomplete } from '@mui/material';

const Input = styled('input')({
  width: '-webkit-fill-available',
  backgroundColor: '#fff',
  color: '#000',
  border: '1px solid #E1E3F0',
  padding: '0.4em 1em',
  borderRadius: '5px',
  margin: '0 4px',
  ':focus': {
    border: '1px solid #5025c4',
    boxShadow: '0 0 0 4px rgb(80 37 196 / 10%)',
  },
  ':focus-visible': {
    outline: 'none',
  },
});

const Listbox = styled('ul')(({ theme }) => ({
  width: 203,
  margin: '0 4px',
  padding: 0,
  zIndex: 1,
  position: 'absolute',
  listStyle: 'none',
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#000',
  overflow: 'auto',
  maxHeight: 194,
  border: '1px solid #86868663',
  boxShadow: '0px 0 10px 0px #00000045',
  '& li': {
    padding: '0 1em',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  '& li.Mui-focused': {
    backgroundColor: '#7e14e6c4',
    color: 'white',
    cursor: 'pointer',
  },
  '& li:active': {
    backgroundColor: '#7e14e694',
    color: 'white',
  },
}));

export default function UseAutocomplete({
  partners,
  setSyncWithPartner,
  loading,
}) {
  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: 'use-autocomplete-demo',
    options: partners || [],
    getOptionLabel: (option) => option.name,
    onChange: (event, newValue) => {
      event.preventDefault();
      setSyncWithPartner(newValue?.id);
    },
  });

  return (
    <div style={{ width: '-webkit-fill-available' }}>
      <div {...getRootProps()}>
        <Input
          {...getInputProps()}
          placeholder="Select a partner"
          disabled={loading}
        />
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            // eslint-disable-next-line react/jsx-key
            <li {...getOptionProps({ option, index })}>{option.name}</li>
          ))}
        </Listbox>
      ) : null}
    </div>
  );
}

UseAutocomplete.propTypes = {
  partners: PropTypes.array,
  setSyncWithPartner: PropTypes.func,
  loading: PropTypes.any,
};
