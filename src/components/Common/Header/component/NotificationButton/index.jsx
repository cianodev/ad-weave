import React from 'react';

import _ from 'lodash';

import PropTypes from 'prop-types';

import Pusher from 'pusher-js';

import Notifier from 'react-desktop-notification';

import { Badge } from '@mui/material';

import image from 'assets/smartly/logo-initial.svg';

import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import { useOnMount } from 'hooks';

const pusher = new Pusher('2cf1716ee0edf55bd4d7', {
  cluster: 'ap1',
  encrypted: true,
});

export default function NotificationButton({ teamId, userId, defaultValue }) {
  const [message, setMessage] = React.useState(null);
  const [count, setCount] = React.useState(0);
  const [url, setUrl] = React.useState('/');

  useOnMount(() => {
    const channel = pusher.subscribe(`team.${teamId}.${userId}`);
    channel.bind('App\\Events\\NotifCounterEvent', (data) => {
      setMessage(data?.message);
      setCount(data?.unread + 1);
      Notifier.start(
        'Task Notification',
        data?.message,
        `https://www.ad-weave.io${data?.url}`,
        image
      );
    });

    return () => {
      pusher.unsubscribe(`team.${teamId}.${userId}`);
    };
  });

  React.useEffect(() => {
    setCount(defaultValue);
  }, [defaultValue]);

  return (
    <Badge badgeContent={count} color="error" max={1000} showZero={false}>
      <NotificationsActiveTwoToneIcon />
    </Badge>
  );
}

NotificationButton.propTypes = {
  teamId: PropTypes.any,
  userId: PropTypes.any,
  defaultValue: PropTypes.any,
};
