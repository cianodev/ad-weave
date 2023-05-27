import React, { memo } from 'react';
import { Drawer } from '@mui/material';
// Utilities
import PropTypes from 'prop-types';

const GlobalDrawer = ({
  width,
  left,
  isOpen,
  anchor,
  variant,
  content,
  ...props
}) => {
  return (
    <Drawer
      sx={{
        width,
        left,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width,
          left,
          boxSizing: 'border-box',
        },
      }}
      variant={variant}
      anchor={anchor}
      open={isOpen}
      {...props}
    >
      {content}
    </Drawer>
  );
};

GlobalDrawer.propTypes = {
  width: PropTypes.any,
  left: PropTypes.any,
  isOpen: PropTypes.bool,
  anchor: PropTypes.string,
  variant: PropTypes.string,
  content: PropTypes.any,
};

export default memo(GlobalDrawer);
