import React from 'react';

import PropTypes from 'prop-types';

import { Snackbar, Alert, AlertTitle, Slide } from '@mui/material';

function TransitionRight(props) {
  return <Slide {...props} direction="left" />;
}

export default function Notification({
  isNotify,
  handleCloseNotification,
  notification,
}) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={6000}
      open={isNotify}
      onClose={handleCloseNotification}
      sx={{ width: 400 }}
      TransitionComponent={TransitionRight}
    >
      <Alert
        severity={notification?.type}
        sx={{ width: '100%' }}
        elevation={9}
        onClose={handleCloseNotification}
      >
        <AlertTitle sx={{ textTransform: 'capitalize' }}>
          {notification?.title}
        </AlertTitle>
        {notification?.message}
      </Alert>
    </Snackbar>
  );
}

Notification.propTypes = {
  isNotify: PropTypes.any,
  handleCloseNotification: PropTypes.func,
  notification: PropTypes.any,
};
