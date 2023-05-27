import { memo } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import useRouteGuard from 'hooks/useRouteGuard';

import { useSelector } from 'react-redux';

// MUI Components
import { Box } from '@mui/material';

// Components

import Header from 'components/Common/Header';

//styles
import { headerMargin } from 'theme/variables';
import { useStyles } from 'app/styles';

const AuthenticatedRoutes = ({ component: Component, ...rest }) => {
  const classes = useStyles();
  const { data: user } = useSelector((state) => state.user);
  // const { pathname } = useLocation();
  useRouteGuard();

  return (
    <Box width="100%" className={classes.overflowHiddenX} height="100vh">
      {!user?.first_login && <Header />}

      <Route
        {...rest}
        render={(props) => {
          // return pathname === '/team' ? (
          //   <Component {...props} />
          // ) : (
          return (
            <Box
              width={'100%'}
              style={{ marginTop: !user?.first_login ? headerMargin : 0 }}
            >
              <Box>
                <Component {...props} />
              </Box>
            </Box>
          );
        }}
      />
    </Box>
  );
};

AuthenticatedRoutes.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default memo(AuthenticatedRoutes);
