import React, { useRef, useEffect, useContext, useState } from 'react';

import PropTypes from 'prop-types';

import _ from 'lodash';

import {
  Box,
  TextField,
  Typography,
  Divider,
  Button,
  Autocomplete,
} from '@mui/material';

import PlaylistAddTwoToneIcon from '@mui/icons-material/PlaylistAddTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

import ConceptOverviewContext from 'pages/ConceptOverview/context';

export default function ReferenceContent({ open, value, onClose }) {
  const inputRef = useRef(null);

  const {
    inputDatasources,
    fetchInputDatasources,
    handleAddReferenceLink,
    handleUpdateReferenceLink,
  } = useContext(ConceptOverviewContext);

  const [linkId, setLinkId] = useState(null);
  const [label, setLabel] = useState('');
  const [url, setUrl] = useState('');
  const [parentTasks, setParentTasks] = useState([]);
  const [subTasks, setSubTasks] = useState([]);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    open && inputRef.current.focus();

    setLinkId(value?.id ?? '');
    setLabel(value?.name ?? '');
    setUrl(value?.url ?? '');
    setParentTasks(
      value?.types?.map((i) => ({
        id: i.task_type.id,
        label: i.task_type.name,
      })) ?? []
    );
    setSubTasks(
      value?.categories?.map((i) => ({
        id: i.category.id,
        label: i.category.name,
      })) ?? []
    );
    setChannels(
      value?.channels?.map((i) => ({
        id: i.channel_id,
        label: i.channel_name,
      })) ?? []
    );
  }, [open]);

  useEffect(() => {}, [value]);

  const isEditing = !_.isNull(value);

  const handleOnClickAddOrSave = () => {
    const inputs = {
      name: label,
      url: url,
      task_type: parentTasks?.map((i) => `${i.id}`) ?? [],
      category: subTasks?.map((i) => `${i.id}`) ?? [],
      channel: channels?.map((i) => `${i.id}`) ?? [],
    };

    isEditing
      ? handleUpdateReferenceLink({ ...inputs, link_id: linkId })
      : handleAddReferenceLink(inputs);
    onClose();
  };

  const handleOnClickCancel = () => {
    onClose();
  };

  return (
    <>
      <Box width={600} py={2} px={3}>
        <Box display="flex" alignItems="center" mb={1}>
          <AddTwoToneIcon
            sx={{ width: '1.5em', height: '1.5em', marginRight: '0.5em' }}
          />
          <Typography variant="h6" fontWeight={800} color="primary">
            Add/Edit Reference Link
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="caption"
            textTransform="uppercase"
            fontWeight={700}
            color="#777777"
          >
            Label
          </Typography>
          <TextField
            size="small"
            inputRef={inputRef}
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </Box>
        <Box>
          <Typography
            variant="caption"
            textTransform="uppercase"
            fontWeight={700}
            color="#777777"
          >
            Url
          </Typography>
          <TextField
            size="small"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Box>
        <Box>
          <Typography
            variant="caption"
            textTransform="uppercase"
            fontWeight={700}
            color="#777777"
          >
            Parent Task
          </Typography>
          <Autocomplete
            fullWidth
            disablePortal
            multiple
            freeSolo
            value={parentTasks}
            isOptionEqualToValue={(o, v) => o.id == v.id}
            options={inputDatasources.parentTasks.map((i) => ({
              id: i.id,
              label: i.name,
            }))}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => <TextField {...params} size="small" />}
            onChange={(_, value) => setParentTasks(value)}
          />
        </Box>
        <Box>
          <Typography
            variant="caption"
            textTransform="uppercase"
            fontWeight={700}
            color="#777777"
          >
            Sub Task
          </Typography>
          <Autocomplete
            fullWidth
            disablePortal
            multiple
            freeSolo
            value={subTasks}
            isOptionEqualToValue={(o, v) => o.id == v.id}
            options={inputDatasources.subTasks.map((i) => ({
              id: i.id,
              label: i.name,
            }))}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => <TextField {...params} size="small" />}
            onChange={(_, value) => setSubTasks(value)}
          />
        </Box>
        <Box>
          <Typography
            variant="caption"
            textTransform="uppercase"
            fontWeight={700}
            color="#777777"
          >
            Channel
          </Typography>
          <Autocomplete
            fullWidth
            disablePortal
            multiple
            freeSolo
            value={channels}
            isOptionEqualToValue={(o, v) => o.id == v.id}
            options={channelList}
            renderInput={(params) => <TextField {...params} size="small" />}
            onChange={(_, value) => setChannels(value)}
          />
        </Box>
      </Box>
      <Box my={1} />
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
        px={3}
        py={2}
      >
        <Button
          variant="contained"
          color="secondary"
          disableElevation
          disableFocusRipple
          sx={{ textTransform: 'capitalize' }}
          startIcon={<PlaylistAddTwoToneIcon />}
          onClick={handleOnClickAddOrSave}
        >
          {isEditing ? 'Save' : 'Add'}
        </Button>
        <Box mx={0.5} />
        <Button
          color="error"
          variant="contained"
          disableElevation
          disableFocusRipple
          sx={{ textTransform: 'capitalize' }}
          startIcon={<CloseTwoToneIcon />}
          onClick={handleOnClickCancel}
        >
          Cancel
        </Button>
      </Box>
    </>
  );
}

ReferenceContent.propTypes = {
  open: PropTypes.any,
  value: PropTypes.any,
  onClose: PropTypes.func,
};

const channelList = [
  { label: 'Google Display', id: 1 },
  { label: 'Google Video', id: 2 },
  { label: 'Social Static', id: 3 },
  { label: 'Social Video', id: 4 },
  { label: 'Youtube', id: 5 },
];
