import React, { useContext, useState } from 'react';

import ConceptOverviewContext from 'pages/ConceptOverview/context';

import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Box,
  styled,
  IconButton,
  Link,
  Typography,
  Tooltip,
} from '@mui/material';
import TextFieldsTwoToneIcon from '@mui/icons-material/TextFieldsTwoTone';
import CloudOffTwoToneIcon from '@mui/icons-material/CloudOffTwoTone';

import SearchInput from 'pages/ConceptOverview/components/SearchInput';
import FileDownloadTwoToneIcon from '@mui/icons-material/FileDownloadTwoTone';
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';

import logo from 'assets/smartly/logo-initial.svg';
import { LoadingButton } from '@mui/lab';
import _ from 'lodash';

const StyledLoadingButton = styled(LoadingButton)({
  border: '1px solid #5025c4',
  color: '#5025c4',
  ':hover': {
    backgroundColor: '#5025c4',
    color: '#fff',
    border: '1px solid #5025c4',
  },
});

export default function PlatformAssets() {
  const [search, setSearch] = useState('');

  const {
    conceptOverview: {
      brief: { assets, intro },
    },
    downloadAllAssets,
    handlePopover,
  } = useContext(ConceptOverviewContext);

  return (
    <>
      {_.isEmpty(assets) ? (
        <Box
          textAlign="center"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          height="calc(100vh - 14.1em)"
          padding="0 1.2em"
        >
          <CloudOffTwoToneIcon
            sx={{
              width: '5em',
              height: '5em',
              color: '#9e9e9e',
            }}
          />
          <Typography fontWeight={700} color="#9e9e9e">
            No assets set in the platform.
          </Typography>
        </Box>
      ) : (
        <Box>
          <Box
            mb="8px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            padding="0 1.2em"
          >
            <Box display="flex" alignItems="center">
              <SearchInput
                placeholder="Search Assets"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Tooltip
                title="Filter by asset type"
                componentsProps={{
                  tooltip: {
                    sx: { lineHeight: 'normal', margin: '0 !important' },
                  },
                }}
              >
                <IconButton
                  size="small"
                  sx={{ marginLeft: '0.5em' }}
                  onClick={(e) => handlePopover(e, 'filter_platform_assets')}
                >
                  <FilterAltTwoToneIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <StyledLoadingButton
              size="small"
              variant="outlined"
              disableElevation
              disableFocusRipple
              sx={{ textTransform: 'initial' }}
              startIcon={<FileDownloadTwoToneIcon />}
              loading={false}
              loadingPosition="start"
              onClick={() => downloadAllAssets(assets, intro?.name)}
            >
              Download All
            </StyledLoadingButton>
          </Box>
          <Box
            padding="0 1.2em 1em"
            display="flex"
            justifyContent="center"
            sx={{
              overflowWrap: 'anywhere',
              maxHeight: 'calc(100vh - 14em)',
              overflow: 'auto',
            }}
          >
            {_.isEmpty(
              _.filter(assets, (data) =>
                data?.name?.toLowerCase().includes(search?.toLowerCase())
              )
            ) ? (
              <Box
                textAlign="center"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                height="calc(100vh - 16em)"
              >
                <CloudOffTwoToneIcon
                  sx={{
                    width: '5em',
                    height: '5em',
                    color: '#9e9e9e',
                  }}
                />
                <Typography fontWeight={700} color="#9e9e9e">
                  No asset found in the list.
                </Typography>
              </Box>
            ) : (
              <ImageList variant="quilted" cols={4} gap={22}>
                {_.filter(assets, (data) =>
                  data?.name?.toLowerCase().includes(search?.toLowerCase())
                )?.map((data) => (
                  <ImageListItem
                    key={data?._id}
                    sx={{
                      backgroundColor: '#dbdbdbcc',
                      width: '257.8px',
                      height: '203.8px !important',
                      overflow: 'hidden',
                      border: '1px solid #dddddd',
                    }}
                  >
                    {data?.type === 'fonts' ? (
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        height="142px"
                      >
                        <TextFieldsTwoToneIcon
                          sx={{ color: '#7b7b7b', width: '8em', height: '8em' }}
                        />
                      </Box>
                    ) : (
                      <img
                        src={`${data.url}?w=10&fit=crop&auto=format`}
                        srcSet={`${data.url}?w=10&fit=crop&auto=format&dpr=2 2x`}
                        alt={data.name}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null;
                          currentTarget.src = logo;
                          currentTarget.srcset = logo;
                          currentTarget.style.objectFit = 'fill';
                          currentTarget.style.padding = '0 6em 3em';
                        }}
                        loading="lazy"
                      />
                    )}

                    <ImageListItemBar
                      title={data?.name}
                      subtitle={data?.type}
                      actionIcon={
                        <IconButton
                          sx={{
                            color: 'rgba(255, 255, 255, 0.54)',
                            ':hover': { backgroundColor: '#505050' },
                          }}
                          aria-label={`download ${data?.name}`}
                          component={Link}
                          download
                          href={data?.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FileDownloadTwoToneIcon />
                        </IconButton>
                      }
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            )}
          </Box>
        </Box>
      )}
    </>
  );
}
