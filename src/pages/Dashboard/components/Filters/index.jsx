import React, { useContext } from 'react';

import PropTypes from 'prop-types';

import {
  Menu,
  MenuItem,
  Box,
  Typography,
  Switch,
  ListItemText,
  Divider,
} from '@mui/material';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';

import { NestedMenuItem, IconMenuItem } from 'mui-nested-menu';
import { filterList } from 'pages/Dashboard/constant';
import DashboardContext from 'pages/Dashboard/context';
import _ from 'lodash';

import Users from 'pages/Dashboard/components/Filters/Users';
import Status from 'pages/Dashboard/components/Filters/Status';
import Priority from 'pages/Dashboard/components/Filters/Priority';

export default function Filters({ anchorEl, open, onClose, onFilterChange }) {
  const {
    state,
    members,
    priorities,
    statuses,
    fetchMembers,
    fetchStatuses,
    fetchPriorities,
    handleDownloadTable,
  } = useContext(DashboardContext);

  return (
    <Box
      sx={{
        width: '150px',
      }}
    >
      <Box px="12px">
        <Typography variant="button" fontWeight={800}>
          Filters
        </Typography>
      </Box>
      <Box
        py={0.8}
        pl="12px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography>Subtask</Typography>
        <Switch
          size="small"
          color="success"
          onChange={(e) => onFilterChange({ subtask: e.target.checked })}
        />
      </Box>
      {filterList?.map((data, index) => {
        switch (data.filter_key) {
          case 'assignee':
            return (
              <NestedMenuItem
                key={index}
                label={data?.label}
                parentMenuOpen={true}
              >
                <Users
                  data={members?.data}
                  fetch={fetchMembers}
                  value={_.map(state.filter.assignees, (id) => ({ id }))}
                  onSelect={(id, data) =>
                    onFilterChange({
                      assignees: _.map(data ?? [], (d) => d.id),
                    })
                  }
                />
              </NestedMenuItem>
            );

          case 'status':
            return (
              <NestedMenuItem
                key={index}
                label={data?.label}
                parentMenuOpen={true}
              >
                <Status
                  data={statuses}
                  fetch={fetchStatuses}
                  value={state.filter.status}
                  multiselect
                  onSelect={(data) =>
                    onFilterChange({
                      status: data,
                    })
                  }
                />
              </NestedMenuItem>
            );

          case 'priority':
            return (
              <NestedMenuItem
                key={index}
                label={data?.label}
                parentMenuOpen={true}
              >
                <Priority
                  data={priorities}
                  fetch={fetchPriorities}
                  value={state.filter.priority}
                  multiselect
                  onSelect={(data) =>
                    onFilterChange({
                      priority: data,
                    })
                  }
                />
              </NestedMenuItem>
            );
        }
      })}
      <Divider />
      <MenuItem onClick={handleDownloadTable}>
        <ListItemText>Download</ListItemText>
        <BrowserUpdatedIcon fontSize="small" />
      </MenuItem>
    </Box>
  );
}

Filters.propTypes = {
  anchorEl: PropTypes.any,
  open: PropTypes.any,
  onClose: PropTypes.func,
  onFilterChange: PropTypes.func,
};
