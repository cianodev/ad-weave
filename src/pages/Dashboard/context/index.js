import React, { createContext, useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import downloadCsv from 'download-csv';

import { useDispatch, useSelector } from 'react-redux';
import Loader from 'components/Common/Loader';

import { useLocation, useHistory } from 'react-router-dom';
import {
  getDashboardTasks,
  getDashboardTotalTime,
  getResources,
  getStatusCounter,
  getMembers,
  getStatuses,
  getPriorities,
} from 'store/reducers/dashboard';

import { updateGlobal } from 'store/reducers/dashboard';

import _ from 'lodash';

import GlobalPopover from 'components/Common/Popover';

import Filters from 'pages/Dashboard/components/Filters';
import Users from 'pages/Dashboard/components/Filters/Users';
import Status from 'pages/Dashboard/components/Filters/Status';
import Priority from 'pages/Dashboard/components/Filters/Priority';
import DateTime from 'pages/ConceptOverview/components/common/DateTime';
import moment from 'moment';

const DashboardContext = createContext();

const defaultProps = {
  filter: {
    queues: null,
    favorites: false,
    subtask: true,
    status: [1, 19],
    assignees: [],
  },
  sort: ['delivery_date'],
};

let delayDebounceFn;
let timer;

export function DashboardProvider({ children }) {
  const location = useLocation();
  const dispatch = useDispatch();

  const urlParams = new URLSearchParams(location.search);
  const queue = urlParams.get('queue');

  const [numRows, setNumRows] = useState(20);
  const [page, setPage] = useState(0);

  const [state, setState] = useState(defaultProps);

  const [tab, setTab] = useState(queue === null ? 'dashboard' : queue);

  const [counter, setCounter] = React.useState(60);

  const [openFilter, setOpenFilter] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  // popper
  const [popoverType, setPopoverType] = useState(null);
  const [value, setValue] = useState(null);
  const [updateId, setUpdateId] = useState(null);
  const [isParent, setIsParent] = useState(null);

  const {
    statusCount,
    totalTime,
    dashboard,
    resources,
    members,
    statuses,
    priorities,
    fetchStatuses,
    fetchMembers,
    fetchPriorities,
    fetchStatusCount,
    fetchTotalTime,
    fetchDashboard,
    fetchResources,
    fetchRepullDashboard,
    errorStatusCount,
    errorTotalTime,
    errorDashboard,
    errorResources,
  } = useSelector((state) => state.dashboard);

  const {
    data: { id },
  } = useSelector((state) => state.user);

  useEffect(() => {
    if (counter === 0) {
      handleRepullDashboard();
      setCounter(60);
    }

    timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {
    if (!_.isNull(state?.filter?.queues)) {
      dispatch(getDashboardTasks(1, numRows, state));
      dispatch(getStatusCounter());
      dispatch(getResources());
      dispatch(getDashboardTotalTime());
    }

    setCounter(60);
  }, [state]);

  useEffect(() => {
    setState({
      ...state,
      filter: {
        ...state.filter,
        queues:
          _.isNull(queue) || queue === 'dashboard'
            ? 'all_task'
            : queue.includes('-')
            ? queue.replace(/-/g, '_')
            : queue === 'unanswered'
            ? 'unassigned'
            : queue,
      },
    });
    setTab(_.isNull(queue) ? 'dashboard' : queue);
  }, [queue]);

  const handlePopover = (e, _type, _value, _id, _channel, _isParent) => {
    setOpenFilter(!openFilter);
    setAnchorEl(e.currentTarget);
    setPopoverType(_type);
    setValue(_value); // default data
    setUpdateId(_id); // task/rel id
    setIsParent(_isParent);

    switch (_type) {
      case 'table_filter':
        dispatch(getMembers());
        dispatch(getStatuses(3));
        dispatch(getPriorities());
        break;
      case 'task_status':
      case 'subtask_status':
      case 'task_status_campaign':
      case 'subtask_status_campaign':
        dispatch(getStatuses(3));
        break;
      case 'campaign_followers':
      case 'concept_followers':
      case 'task_assignees':
      case 'task_watchers':
        dispatch(getMembers());
        break;
      case 'task_priority':
        dispatch(getPriorities());
        break;
    }
  };

  const handleSearch = (value) => {
    clearTimeout(delayDebounceFn);

    delayDebounceFn = setTimeout(() => {
      setState({
        ...state,
        filter: {
          ...state.filter,
          name: value,
        },
      });
    }, 1000);
  };

  const handlePaginationPageChange = (event, newPage) => {
    setPage(newPage);
    setCounter(60);
    dispatch(getDashboardTasks(newPage + 1, numRows, state, 'repull'));
  };

  const handlePaginationRowPageChange = (event) => {
    setNumRows(parseInt(event.target.value));
    setPage(0);
    setCounter(60);
    dispatch(getDashboardTasks(1, event.target.value, state, 'repull'));
  };

  const handleRepullDashboard = () => {
    dispatch(getDashboardTasks(page, numRows, state, 'repull'));
    setCounter(60);
  };

  const handleTableSort = (value) => {
    let tempSort = _.map(state.sort, (i) =>
      i.includes(value.replace(/[^a-z0-9_]/gi, '')) ? value : i
    );

    !tempSort.includes(value) && tempSort.push(value);

    setState({
      ...state,
      sort: tempSort,
    });
  };

  const handleOnFilterChange = (filters) => {
    setState({
      ...state,
      filter: { ...state.filter, ...filters },
    });
  };

  const handleUpdateGlobal = (_value, _data) => {
    dispatch(
      updateGlobal(
        {
          is_parent: isParent ? 1 : 0,
          id: updateId,
          key: popoverType.replace('_campaign', ''),
          value: _value,
        },
        {
          data: _data, // any form of data e.g string/object/array
        }
      )
    );
  };

  const handleDownloadTable = () => {
    const columns = {
      id: 'Task Id',
      taskName: 'Task Name',
      status: 'Status',
      priority: 'Priority',
      dueDate: 'Due Date',
      deliveryDate: 'Delivery Date',
      relType: 'Is Parent?',
      health: 'Health',
      channel: 'Channel',
      assignees: 'Assignees',
    };

    const data = dashboard.all_tasks.data.map((data) => ({
      id: data.id,
      taskName: _.isEmpty(data.name)
        ? 'NULL'
        : data.name
            .replace(/(\r\n|\n|\r)/gm, '')
            .split(',')
            .join(';'),
      status: _.isEmpty(data.status) ? 'NULL' : data.status,
      priority: _.isEmpty(data.priority) ? 'NULL' : data.priority,
      dueDate: _.isEmpty(data.due_date) ? 'NULL' : data.due_date,
      deliveryDate: _.isEmpty(data.delivery_date) ? 'NULL' : data.delivery_date,
      relType: data.relType === 'task' ? 'Parent' : 'Subtask',
      health: _.isEmpty(data.tracker_status) ? 'NULL' : data.tracker_status,
      channel: _.isEmpty(data.channel) ? 'NULL' : data.channel,
      assignees: _.isEmpty(data.assignees)
        ? 'NULL'
        : data.assignees
            .map((user) => user.username)
            .toString()
            .split(',')
            .join(';'),
    }));

    downloadCsv(
      data,
      columns,
      `AW-Dashboard-${moment().format('YYYY-MM-DD HH:mm:ss')}`
    );
  };

  return (
    <DashboardContext.Provider
      value={{
        tab,
        page,
        state,
        counter,
        statusCount,
        totalTime,
        dashboard,
        resources,
        members,
        statuses,
        priorities,
        errorStatusCount,
        errorTotalTime,
        errorDashboard,
        errorResources,
        fetchMembers,
        fetchStatuses,
        fetchPriorities,
        fetchRepullDashboard,
        handlePaginationPageChange,
        handlePaginationRowPageChange,
        handleRepullDashboard,
        handlePopover,
        handleSearch,
        handleTableSort,
        handleDownloadTable,
      }}
    >
      {children}
      {(fetchStatusCount ||
        fetchTotalTime ||
        fetchDashboard ||
        fetchResources) && <Loader />}

      <GlobalPopover
        id={`${popoverType}-popover`}
        isOpen={Boolean(anchorEl)}
        anchorEl={anchorEl}
        popperHorizontal="left"
        content={
          <>
            {popoverType?.toLowerCase()?.includes('status') ? (
              <Status
                data={statuses}
                fetch={fetchStatuses}
                value={value}
                onSelect={handleUpdateGlobal}
              />
            ) : popoverType?.toLowerCase()?.includes('date') ? (
              <DateTime value={value} handleUpdateGlobal={handleUpdateGlobal} />
            ) : popoverType?.toLowerCase()?.includes('assignees') ? (
              <Users
                data={members?.data}
                fetch={fetchMembers}
                value={value}
                onSelect={handleUpdateGlobal}
              />
            ) : popoverType?.toLowerCase()?.includes('priority') ? (
              <Priority
                data={priorities}
                fetch={fetchPriorities}
                value={value}
                onSelect={handleUpdateGlobal}
              />
            ) : (
              <Filters onFilterChange={handleOnFilterChange} />
            )}
          </>
        }
        handleClose={() => setAnchorEl(null)}
      />
    </DashboardContext.Provider>
  );
}

DashboardProvider.propTypes = {
  children: PropTypes.any,
};

export default DashboardContext;
