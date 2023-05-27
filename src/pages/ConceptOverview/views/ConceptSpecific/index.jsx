import React, { useContext } from 'react';
import { Typography, Box, Breadcrumbs } from '@mui/material';
import LinkOffTwoToneIcon from '@mui/icons-material/LinkOffTwoTone';

import ConceptOverviewContext from 'pages/ConceptOverview/context';

import _ from 'lodash';

import { Link, useParams, useLocation } from 'react-router-dom';
import Header from 'pages/ConceptOverview/components/Header';
import Overview from 'pages/ConceptOverview/views/Overview';
import PlatformAssets from 'pages/ConceptOverview/views/PlatformAssets';
import ReferenceLinks from 'pages/ConceptOverview/views/ReferenceLinks';
import Campaign from 'pages/Campaign';

export default function ConceptSpecific() {
  const { type } = useParams();
  const location = useLocation();

  const urlParams = new URLSearchParams(location.search);

  const { conceptOverview: data } = useContext(ConceptOverviewContext);

  const breadcrumbs = [
    <Link
      key="1"
      color="inherit"
      to={`/projects/${data?.partner_uuid}/concept/${data?.concept_id}/overview`}
      style={{ textDecoration: 'none' }}
    >
      <Typography
        color="primary"
        fontSize="12px"
        noWrap
        sx={{ ':hover': { textDecoration: 'underline' } }}
      >
        {data?.name}
      </Typography>
    </Link>,
    <Typography key="2" color="#968f92" fontSize="12px">
      {type === 'assets'
        ? 'Platform Assets'
        : type === 'campaign'
        ? 'Campaign'
        : 'Reference Links'}
    </Typography>,
  ];

  return (
    <Box width="-webkit-fill-available">
      {['assets', 'campaign', 'links', 'overview'].includes(
        type.toLowerCase()
      ) ? (
        <>
          {_.isEmpty(urlParams.get('campaignId')) && <Header />}

          {
            // Overview
            type.toLowerCase() === 'overview' ? (
              <Overview />
            ) : (
              <Box>
                <Box padding="0 1.2em">
                  <Box backgroundColor="#ececec" pt={0.2} pb={0.4} px={1}>
                    <Breadcrumbs
                      separator="›"
                      aria-label="breadcrumb"
                      sx={{ li: { maxWidth: '150px' } }}
                    >
                      {breadcrumbs}
                    </Breadcrumbs>
                  </Box>
                </Box>
                <Box mt={1}>
                  {type.toLowerCase() === 'assets' ? (
                    <PlatformAssets />
                  ) : type.toLowerCase() === 'links' ? (
                    <ReferenceLinks />
                  ) : (
                    <Campaign />
                  )}
                </Box>
              </Box>
            )
          }
        </>
      ) : (
        <Box
          textAlign="center"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          height="calc(100vh - 6em)"
          width="-webkit-fill-available"
        >
          <LinkOffTwoToneIcon
            sx={{
              width: '8em',
              height: '8em',
              color: '#f16079',
            }}
          />
          <Typography fontWeight={700} variant="h4">
            Link not available
          </Typography>
          <Typography color="#949494">
            Kindly make sure the link is spelled correctly.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
