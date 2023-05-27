import React, { useContext } from 'react';

import _ from 'lodash';

import ConceptOverviewContext from 'pages/ConceptOverview/context';

import { useOnMount } from 'hooks';

import { useParams } from 'react-router-dom';
import {
  Box,
  Grid,
  Link,
  List,
  ListItem,
  ListItemButton,
  Typography,
  IconButton,
  styled,
  ListItemIcon,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';

import SearchInput from 'pages/ConceptOverview/components/SearchInput';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
import LinkTwoToneIcon from '@mui/icons-material/LinkTwoTone';
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';

const StyledLoadingButton = styled(LoadingButton)({
  border: '1px solid #5025c4',
  color: '#5025c4',
  ':hover': {
    backgroundColor: '#5025c4',
    color: '#fff',
    border: '1px solid #5025c4',
  },
});

export default function ReferenceLinks() {
  const { conceptId } = useParams();

  const {
    referenceLinks,
    fetchReferenceLinks,
    onOpenReferenceLink,
    handlePopover,
    handleDialogOpen,
    handleDeleteReferenceLink,
  } = useContext(ConceptOverviewContext);

  useOnMount(() => {
    onOpenReferenceLink(conceptId);
  });

  return (
    <Box>
      {_.isEmpty(referenceLinks?.data) ? (
        <Box
          textAlign="center"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          height="calc(100vh - 14em)"
        >
          <LinkTwoToneIcon
            sx={{
              width: '5em',
              height: '5em',
              color: '#9e9e9e',
            }}
          />
          <Typography fontWeight={700} color="#9e9e9e">
            No reference link found for this concept.
          </Typography>
          <Box mt={1}>
            <StyledLoadingButton
              size="small"
              variant="outlined"
              disableElevation
              disableFocusRipple
              sx={{ textTransform: 'initial' }}
              startIcon={<AddTwoToneIcon />}
              loading={false}
              loadingPosition="start"
              onClick={() => handleDialogOpen(null)}
            >
              Add new reference
            </StyledLoadingButton>
          </Box>
        </Box>
      ) : (
        <>
          <Box
            mb="8px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            padding="0 1.2em"
          >
            <Box display="flex" alignItems="center">
              <SearchInput placeholder="Search reference link" />
              {/* <IconButton
                size="small"
                sx={{ marginLeft: '0.5em' }}
                onClick={(e) => handlePopover(e, 'filter_reference_link')}
              >
                <FilterAltTwoToneIcon />
              </IconButton> */}
            </Box>
            <StyledLoadingButton
              size="small"
              variant="outlined"
              disableElevation
              disableFocusRipple
              sx={{ textTransform: 'initial' }}
              startIcon={<AddTwoToneIcon />}
              loading={false}
              loadingPosition="start"
              onClick={() => handleDialogOpen(null)}
            >
              Add new reference
            </StyledLoadingButton>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            padding="0 2.1em"
          >
            <Typography variant="button" fontWeight={800}>
              Reference Name
            </Typography>
            <Typography variant="button" fontWeight={800}>
              Actions
            </Typography>
          </Box>
          <List sx={{ padding: '0 1.2em' }}>
            {referenceLinks?.data?.map((data, index) => (
              <ListItem
                key={index}
                sx={{ padding: 0 }}
                secondaryAction={
                  <Box>
                    <IconButton
                      size="small"
                      color="warning"
                      onClick={() => handleDialogOpen(data)}
                    >
                      <ModeEditOutlineTwoToneIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteReferenceLink(data.id)}
                    >
                      <CloseTwoToneIcon />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemButton
                  component={Link}
                  href={data?.url}
                  target="_blank"
                >
                  <ListItemIcon
                    style={{ minWidth: 'auto', marginRight: '0.5em' }}
                  >
                    <LinkTwoToneIcon />
                  </ListItemIcon>
                  {data?.name}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Box>
  );
}
