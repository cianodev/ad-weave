import { memo, useContext } from 'react';

import { DataGrid } from '@mui/x-data-grid';

import TimerSheetContext from 'pages/TimerSheet/Context';

import clsx from 'clsx';

// MUI Components
import {
  Box,
  Typography,
  Tooltip,
  IconButton,
  Stack,
  Chip,
} from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';

import PropTypes from 'prop-types';
import { getItemByKey } from 'utils/dictionary';

function TimelineSummary({ data }) {
  const { handleModal, handlePopper, timesheetFilterData } =
    useContext(TimerSheetContext);

  const selectedLog = getItemByKey(
    'timer_id',
    data?.timer_id,
    timesheetFilterData?.timesheet
  );

  const renderColumnCellWithTooltip = (params) => (
    <Tooltip
      title={
        params.value === '-' ? (
          ''
        ) : (
          <Typography
            sx={{ color: 'white', fontSize: '1.15em', lineHeight: '1.6em' }}
          >
            {params.value}
          </Typography>
        )
      }
      placement="bottom-end"
    >
      <Box
        sx={{ cursor: 'pointer' }}
        onClick={(e) =>
          ['time_in', 'time_out'].includes(params.field) &&
          handlePopper(
            e,
            params.field === 'time_in' ? 'start_date' : 'end_date',
            {
              timer_id:
                params.row.timer_type === 'preset'
                  ? params.row.timer_id
                  : params.row.id,
              selectedDate: params.value,
              timer_type: params.row.timer_type,
            }
          )
        }
      >
        <span
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {params.value}
        </span>
      </Box>
    </Tooltip>
  );

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    {
      field: 'time_in',
      headerName: 'Time In',
      flex: 1,
      renderCell: renderColumnCellWithTooltip,
    },
    {
      field: 'time_out',
      headerName: 'Time Out',
      flex: 1,
      renderCell: renderColumnCellWithTooltip,
    },
    {
      field: 'total',
      headerName: 'Total',
      flex: 1,
    },
  ];

  const rows = selectedLog?.timeline?.map((d) => ({
    timer_id: data?.timer_id,
    id: d.timeline_id,
    time_in: d.time_in ?? '-',
    time_out: d.time_out ?? '-',
    total: d.total ?? '-',
    timer_type: data?.timer_type,
  }));

  return (
    <Box
      sx={{
        mt: 2,
        mb: 3,
        mx: 3,
        // '& .status': {
        //   '& .MuiDataGrid-cellContent': {
        //     backgroundColor: 'transparent',
        //   },
        // },
        // '& .status--resolved': {
        //   '& .MuiDataGrid-cellContent': {
        //     color: '#2ED47A !important',
        //   },
        // },
        // '& .status--rejected.MuiDataGrid-cellContent': {
        //   '& .MuiDataGrid-cellContent': {
        //     color: '#EB5757 !important',
        //   },
        // },
      }}
    >
      <Stack spacing={2}>
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {/* <Stack flexDirection="row" spacing={2}> */}
          <Chip
            label={data?.timer_type ?? '-'}
            size="small"
            sx={{
              borderRadius: '3px',
              height: '19px',
              textTransform: 'capitalize',
            }}
            color={
              data?.timer_type === 'subtask'
                ? 'secondary'
                : data?.timer_type === 'task'
                ? 'primary'
                : 'warning'
            }
          />
          <Typography
            sx={{
              fontWeight: 700,
            }}
          >
            {data?.task?.name}
          </Typography>
          {/* </Stack> */}
          <IconButton onClick={() => handleModal(false, null, null)}>
            <ClearIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </Stack>
        <Box sx={{ height: '500px' }}>
          <DataGrid
            initialState={{
              columns: {
                columnVisibilityModel: {
                  // Hide columns status and traderName, the other columns will remain visible
                  id: false,
                },
              },
            }}
            rows={rows ?? []}
            columns={columns ?? []}
            disableSelectionOnClick
          />
        </Box>
      </Stack>
    </Box>
  );
}

export default memo(TimelineSummary);

TimelineSummary.propTypes = {
  data: PropTypes.any,
};
