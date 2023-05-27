import React, { useState } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import {
  Box,
  IconButton,
  Typography,
  CircularProgress,
  Collapse,
  styled,
} from '@mui/material';

import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';

import TaskTree from 'pages/ConceptOverview/components/TaskTree';

import { taskTable } from 'pages/ConceptOverview/constant';

const StyledTypography = styled(Typography)({
  lineHeight: 'normal',
  cursor: 'default',
});

const StyledCollapse = styled(Collapse)({
  borderLeft: '1px dashed #757575',
  paddingLeft: '1em',
  marginLeft: '0.5em',
});

export default function ChannelTree({
  channel,
  handlePopover,
  channelId,
  defaultCollapse,
  handleChannelTask,
  fetchConceptTaskList,
}) {
  const [openCollapse, setOpenCollapse] = useState(defaultCollapse);

  const handleCollapse = (chId) => {
    !openCollapse && handleChannelTask(chId);
    setOpenCollapse(!openCollapse);
  };

  return (
    <Box mt={2}>
      <Box display="flex" alignItems="center">
        <IconButton
          size="small"
          onClick={() => handleCollapse(channelId)}
          sx={{ padding: 0, marginRight: '0.5em' }}
        >
          {openCollapse ? (
            <IndeterminateCheckBoxOutlinedIcon />
          ) : (
            <AddBoxOutlinedIcon />
          )}
        </IconButton>
        <StyledTypography fontWeight={800} variant="h6">
          {channelId === 1
            ? 'Google Display'
            : channelId === 2
            ? 'Google Video'
            : channelId === 3
            ? 'Meta Static'
            : channelId === 4
            ? 'Meta Video'
            : 'YouTube'}
        </StyledTypography>
      </Box>

      <StyledCollapse in={openCollapse}>
        {/* Task List */}
        {!_.isEmpty(channel) && !fetchConceptTaskList ? (
          <Box overflow="auto" mt={1}>
            {/* Header */}
            <Box display="inline-flex">
              {taskTable?.map((header, index) => (
                <Box
                  width={header?.width}
                  margin="0px 2px 3px 0"
                  key={index}
                  textAlign={header?.align}
                >
                  <StyledTypography variant="body2" fontWeight={700}>
                    {header?.label}
                  </StyledTypography>
                </Box>
              ))}
            </Box>

            {channel?.map((data) => (
              <TaskTree
                key={data?.id}
                task={data}
                handlePopover={handlePopover}
                type="task"
              />
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '1em 0'
            }}
          >
            <CircularProgress size={30} color="secondary"/>
          </Box>
        )}
      </StyledCollapse>
    </Box>
  );
}

ChannelTree.propTypes = {
  channel: PropTypes.any,
  handlePopover: PropTypes.func,
  channelId: PropTypes.number,
  defaultCollapse: PropTypes.any,
  handleChannelTask: PropTypes.func,
  fetchConceptTaskList: PropTypes.any,
};
