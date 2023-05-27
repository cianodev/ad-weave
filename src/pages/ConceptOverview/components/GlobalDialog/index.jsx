import * as React from 'react';
import PropTypes from 'prop-types';

import {
  Slide,
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function GlobalDialog({ open, handleClose, content }) {
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        componentsProps={{
          backdrop: {
            sx: {
              backgroundColor: 'rgb(103 58 183 / 29%)',
            },
          },
        }}
      >
        {content}
      </Dialog>
    </div>
  );
}

GlobalDialog.propTypes = {
  open: PropTypes.any,
  content: PropTypes.any,
  handleClose: PropTypes.func.isRequired,
};
