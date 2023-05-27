import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import _ from 'lodash';

import PropTypes from 'prop-types';

import SubtaskList from 'pages/Task/Components/SubtaskList';

// Reducer
import {
  requestAddSubtask_,
  startTimer,
  playTimer,
  pauseTimer,
  stopTimer,
  requestDestroySubtask_,
} from 'store/reducers/tasks';

import {
  Box,
  Stack,
  Typography,
  Card,
  IconButton,
  Autocomplete,
  TextField,
} from '@mui/material';

import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';

// Colors
import { appColors } from 'theme/variables';

export default function Subtasks({
  subTask,
  priorityList,
  usersList,
  statusList,
  handleOpen,
  task_id,
  data,
  onCloseDialog,
}) {
  const dispatch = useDispatch();
  const {
    overview: { rel_type, status_id, status, assignees },
    isLoading,
  } = useSelector((state) => state.tasks);

  const [selectedTaskSubCategory, setSelectedTaskSubCategory] = useState({});

  const Swal = require('sweetalert2');

  const handlePlayPauseButtonClick = (id, type, activeTimeLogId, option) => {
    switch (option) {
      case 'start':
        dispatch(startTimer(id, { rel_id: id, rel_type: type }));
        break;
      case 'pause':
        dispatch(pauseTimer(id, { id: activeTimeLogId }));
        break;
      default:
        dispatch(playTimer(id, { id: activeTimeLogId }));
        break;
    }
  };

  const handleDeleteSubtask = (id) => {
    Swal.fire({
      title: 'Do you want to delete this subtask?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        const params = {
          task_id: task_id,
          id: id,
        };
        dispatch(requestDestroySubtask_(params));

        Swal.fire('Saved!', '', 'success');
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  };

  const handleOnKeyUpRefLink = (e) => {
    if (e.key.toLowerCase() === 'enter') {
      setSelectedTaskSubCategory({});
      dispatch(
        requestAddSubtask_({
          category_id: selectedTaskSubCategory.id,
          task_id: task_id,
        })
      );
    }
  };

  const handleStopButtonClick = (id, activeTimeLogId) => {
    dispatch(stopTimer(id, { id: activeTimeLogId }));
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing={2}>
          <Box>
            <Typography variant="overline" fontWeight={800}>
              {subTask?.length} {subTask?.length < 2 ? 'Subtask' : 'Subtasks'}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="overline"
              fontWeight={700}
              sx={{
                color: appColors.gray,
                cursor: 'pointer',
                '&:hover': { color: appColors.lightViolet },
              }}
            >
              Priority
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Box>
            <Typography
              variant="overline"
              fontWeight={700}
              sx={{
                color: appColors.gray,
                cursor: 'pointer',
                '&:hover': { color: appColors.lightViolet },
              }}
            >
              All
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="overline"
              fontWeight={700}
              sx={{
                color: appColors.gray,
                cursor: 'pointer',
                '&:hover': { color: appColors.lightViolet },
              }}
            >
              Mine
            </Typography>
          </Box>
        </Stack>
      </Stack>
      {!_.isEmpty(subTask) ? (
        <Stack spacing={1}>
          {subTask?.map((sub_category, index) => (
            <SubtaskList
              key={index}
              sub_category={sub_category}
              handlePlayPauseButtonClick={handlePlayPauseButtonClick}
              handleStopButtonClick={handleStopButtonClick}
              priorityList={priorityList}
              usersList={usersList}
              statusList={_.filter(statusList, (stats) =>
                _.map(
                  stats?.related_to,
                  (types) => types.name === 'task'
                ).includes(true)
              )}
              status={status}
              assigneesList={assignees}
              rel_type={rel_type}
              status_id={status_id}
              handleOpen={handleOpen}
              handleDeleteSubtask={handleDeleteSubtask}
              onCloseDialog={onCloseDialog}
            />
          ))}
        </Stack>
      ) : (
        <Card variant="outlined" sx={{ borderStyle: 'none' }}>
          <Stack alignItems="center" p={1}>
            <Box>
              <IconButton
                size="large"
                color="error"
                disableRipple
                disableTouchRipple
                disableFocusRipple
                sx={{ backgroundColor: '#f2445c1a' }}
              >
                <AssignmentLateIcon />
              </IconButton>
            </Box>
            <Box>
              <Typography fontWeight={700} color="#999999">
                No Subtask found.
              </Typography>
            </Box>
          </Stack>
        </Card>
      )}
      <Box mt={2}>
        <Autocomplete
          freeSolo
          disablePortal
          options={data?.task_sub_categories ?? []}
          value={selectedTaskSubCategory ?? {}}
          getOptionLabel={(option) => option.name ?? ''}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => (
            <TextField
              {...params}
              onKeyUp={(e) => handleOnKeyUpRefLink(e)}
              sx={{
                borderRadius: '0.1em',
                fieldset: {
                  border: '1px dashed #ececec',
                },
              }}
              fullWidth
              size="small"
              placeholder="Add a Subtask"
              label="Add a Subtask"
            />
          )}
          onChange={(_, newValue) => setSelectedTaskSubCategory(newValue)}
          sx={{ width: 300 }}
          disabled={isLoading}
        />
      </Box>
    </Box>
  );
}

Subtasks.propTypes = {
  subTask: PropTypes.any,
  data: PropTypes.any,
  task_id: PropTypes.any,
  priorityList: PropTypes.any,
  usersList: PropTypes.any,
  statusList: PropTypes.any,
  status: PropTypes.any,
  assigneesList: PropTypes.any,
  handleOpen: PropTypes.func,
  handleDeleteSubtask: PropTypes.func,
  onCloseDialog: PropTypes.func,
};
