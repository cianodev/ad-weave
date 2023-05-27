import React, { useContext, useState } from 'react';
import PartnersContext from 'pages/Partners/context';

import { Box, TextField, Typography, styled } from '@mui/material';

import HandshakeTwoToneIcon from '@mui/icons-material/HandshakeTwoTone';

import { Link } from 'react-router-dom';
import _ from 'lodash';

const StyledBox = styled(Box)({
  border: '1px solid #d2d2d26b',
  borderRadius: '10px',
  color: '#7e14e6',
  ':hover': {
    backgroundColor: '#7e14e6',
    color: '#fff',
    boxShadow:
      'rgba(34, 51, 84, 0.4) 0px 2px 4px -3px, rgba(34, 51, 84, 0.2) 0px 5px 16px -4px;',
  },
});

export default function Main() {
  const { list, isLoading, error } = useContext(PartnersContext);
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <Box
        pb={2}
        px={2}
        sx={{
          boxShadow:
            'rgb(159 162 191 / 9%) 0px 3px 7px 0px, rgb(159 162 191 / 6%) 0px 2px 2px',
          backgroundColor: '#fff',
        }}
      >
        <Box sx={{ padding: '0.8em 0', display: 'flex', alignItems: 'center' }}>
          <HandshakeTwoToneIcon
            sx={{ width: '1.2em', height: '1.2em', marginRight: '8px' }}
          />
          <Typography fontWeight={800} fontSize="18px">
            Partner Group
          </Typography>
        </Box>
        <TextField
          variant="outlined"
          placeholder="Search ..."
          size="small"
          onChange={(e) => handleSearch(e)}
        />
      </Box>
      <Box
        pt={3}
        pb={1}
        display="flex"
        alignItems="center"
        flexDirection="column"
        height="calc(100vh - 148px)"
        overflow="auto"
      >
        {_.orderBy(
          _.filter(list, (data) =>
            data?.name?.toLowerCase().includes(search?.toLowerCase())
          ),
          'name',
          'asc'
        )?.map((data) => (
          <StyledBox key={data?.id} my={0.5} width={800}>
            <Box
              component={Link}
              to={{
                pathname: `https://beta.ad-lib.io/concepts?partner=${data?.id}`,
              }}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Box
                sx={{ padding: '1em', display: 'flex', alignItems: 'center' }}
              >
                <HandshakeTwoToneIcon
                  sx={{ width: '1.2em', height: '1.2em', marginRight: '10px' }}
                />
                <Typography color="inherit">{data?.name}</Typography>
              </Box>
            </Box>
          </StyledBox>
        ))}

        {_.isEmpty(
          _.filter(list, (data) =>
            data?.name?.toLowerCase().includes(search?.toLowerCase())
          )
        ) && (
          <Box>
            <Typography fontWeight={800} color="#b5b5b5">
              No Partner
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
}
