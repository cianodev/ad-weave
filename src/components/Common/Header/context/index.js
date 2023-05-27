import React, { createContext, useState } from 'react';

import PropTypes from 'prop-types';
import { useOnMount } from 'hooks';
import { useDispatch, useSelector } from 'react-redux';
import {
  getNotificationCount,
  getNotificationAllRead,
  getNotification,
  setNotificationToRead,
} from 'store/reducers/notifications';

import {
  addRecentSearches,
  addSavedSearches,
  getGlobalSearch,
  resetGlobalSearch,
  setIsSearching,
  resetNotification,
} from 'store/reducers/globalSearch';

import Notification from 'components/Common/Notification';
import Search from 'components/Common/Header/component/Search';
import GlobalDrawer from 'components/Common/Drawer';
import Notifications from 'components/Common/Header/component/Notifications';
import _ from 'lodash';
import TaskTimer from 'components/TaskTimer';
import TaskCreation from 'components/TaskCreation';

const HeaderContext = createContext();

export function HeaderProvider({ children }) {
  const dispatch = useDispatch();
  const [hasMore, setHasMore] = useState(true);
  const [openSearch, setOpenSearch] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [openPreset, setOpenPreset] = useState(false);
  const [notificationTab, setNotificationTab] = useState('all');
  const [openTaskCreation, setOpenTaskCreation] = useState(false);

  const {
    count: { all, read, unread },
    list,
    fetchNotification,
    errorNotification,
  } = useSelector((state) => state.notifications);

  const {
    savedSearches,
    recentSearches,
    concepts,
    campaigns,
    tasks,
    subTasks,
    fetchConcepts,
    fetchCampaigns,
    fetchTasks,
    fetchSubtasks,
    isSearching,
    isNotify,
    notify,
  } = useSelector((state) => state.globalSearch);

  useOnMount(() => {
    dispatch(getNotificationCount('unread'));
  });

  const handleOpenNotification = () => {
    setOpenNotification(!openNotification);
    if (!openNotification) {
      dispatch(getNotificationCount('read'));
      dispatch(getNotificationCount('unread'));
      dispatch(getNotificationCount('all'));
      dispatch(getNotification('all'));
      setNotificationTab('all');
    }
  };

  const handleOpenSearch = () => {
    setOpenSearch(!openSearch);
    dispatch(resetGlobalSearch());
  };

  const handleOpenPreset = () => {
    setOpenPreset(!openPreset);
  };

  const handleNotificationTab = (e, tabValue) => {
    e.preventDefault();
    setHasMore(true);
    setNotificationTab(tabValue);
    dispatch(getNotification(tabValue));
  };

  const handleMarkAllNotificationAsRead = () => {
    dispatch(getNotificationAllRead(notificationTab));
  };

  const handleNotificationScroll = () => {
    setHasMore(true);
    if (!_.isEmpty(list[notificationTab])) {
      const nextPage = list[notificationTab]?.current_page + 1;

      if (nextPage <= list[notificationTab]?.last_page) {
        dispatch(getNotification(notificationTab, nextPage));
      } else {
        setHasMore(false);
      }
    }
  };

  const handleClickNotification = (notificationId, notificationStatus) => {
    notificationStatus === 'unread' &&
      dispatch(setNotificationToRead(notificationId, notificationTab));
  };

  const handleSearch = (searchString) => {
    dispatch(getGlobalSearch('concept', searchString));
    dispatch(getGlobalSearch('campaign', searchString));
    dispatch(getGlobalSearch('task', searchString));
    dispatch(getGlobalSearch('subtask', searchString));
    dispatch(setIsSearching(!_.isEmpty(searchString)));
    !_.isEmpty(searchString) && dispatch(addRecentSearches(searchString));
  };

  const handleAddSaveSearch = (value) => {
    dispatch(addSavedSearches(value));
  };

  const handleCloseNotification = () => {
    dispatch(resetNotification());
  };

  const handleTaskCreation = () => {
    setOpenTaskCreation(!openTaskCreation);
  };

  return (
    <HeaderContext.Provider
      value={{
        all,
        read,
        unread,
        openSearch,
        openNotification,
        openPreset,
        notificationTab,
        list,
        fetchNotification,
        errorNotification,
        hasMore,
        savedSearches,
        recentSearches,
        concepts,
        campaigns,
        tasks,
        subTasks,
        fetchConcepts,
        fetchCampaigns,
        fetchTasks,
        fetchSubtasks,
        isSearching,
        openTaskCreation,
        handleTaskCreation,
        handleOpenNotification,
        handleOpenSearch,
        handleOpenPreset,
        handleNotificationTab,
        handleMarkAllNotificationAsRead,
        handleNotificationScroll,
        handleClickNotification,
        handleSearch,
        handleAddSaveSearch,
      }}
    >
      {children}
      <GlobalDrawer
        isOpen={openNotification}
        content={<Notifications />}
        name="notifications"
        width={400}
        anchor="right"
        onClose={handleOpenNotification}
      />

      <GlobalDrawer
        content={<TaskCreation onClose={handleTaskCreation} />}
        transitionDuration={{ enter: 300, exit: 0 }}
        name="manual-task-creation"
        width={700}
        isOpen={openTaskCreation}
        anchor="left"
        BackdropProps={{
          invisible: false,
          sx: { backdropFilter: 'blur(0)' },
        }}
        hideBackdrop={false}
      />

      {openSearch && (
        <Search open={openSearch} handleClose={handleOpenSearch} />
      )}

      <Notification
        handleCloseNotification={handleCloseNotification}
        isNotify={isNotify}
        notification={notify}
      />

      {openPreset && (
        <TaskTimer isOpen={openPreset} handleClose={handleOpenPreset} />
      )}
    </HeaderContext.Provider>
  );
}

HeaderProvider.propTypes = {
  children: PropTypes.any,
};

export default HeaderContext;
