import React, { useRef } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
// Hooks
import useRouteGuard from 'hooks/useRouteGuard';
// Reducers
import { login as loginRequest } from 'store/reducers/auth';

//reuseable
import InputField from 'components/Common/InputField';
import Button from 'components/Common/Button';

import {
  FormControlLabel,
  Typography,
  InputLabel,
  FormGroup,
  Checkbox,
  Divider,
  Link,
  Card,
  Grid,
  Box,
  styled,
} from '@mui/material';

import background from 'assets/images/login/background.jpg';
import logo from 'assets/smartly/ad-weave-logo-white.svg';
import { useOnMount } from 'hooks';

const BackgroundBox = styled(Box)({
  backgroundColor: '#673AB7',
  background: 'linear-gradient(25deg, rgb(85 10 97) 0%, rgba(41,19,91,1) 100%)',
  height: '100vh',
  width: '100vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export default function Login() {
  const methods = useForm();
  const dispatch = useDispatch();

  useRouteGuard();

  //destructured
  const { handleSubmit } = methods;

  //reducers-value
  const { isLoading, error } = useSelector((state) => state.auth);

  //functions
  const onSubmit = (data) => {
    dispatch(loginRequest(data));
  };

  return (
    <BackgroundBox>
      <Card
        sx={{
          width: 1050,
          height: 575,
          boxShadow: '0px 12px 10px rgb(0 0 0 / 0.2)',
        }}
      >
        <Grid container sx={{ background: '#24285e' }}>
          <Grid
            item
            xs={6}
            sx={{
              background: `url(${background})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '35.3em',
              backgroundPositionY: 'bottom',
              height: '38.8em',
            }}
          >
            <Box
              sx={{
                height: '19em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background:
                  'radial-gradient(19em at 16em 23em,rgba(28,96,144,1) 0%,rgb(36 40 94 / 0%) 100%)',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1144.9 130.19"
                style={{ width: '20em' }}
              >
                <defs></defs>
                <g id="Layer_2" data-name="Layer 2">
                  <g id="Layer_1-2" data-name="Layer 1">
                    <polygon
                      className="cls-1"
                      points="108.51 62.65 72.34 0 36.17 62.65 0 125.29 33.66 125.29 36.17 120.96 41.17 112.3 85.43 112.41 68.64 83.27 57.95 83.22 72.34 58.31 108.51 120.96 111.01 125.29 144.68 125.29 108.51 62.65"
                    />
                    <polygon
                      className="cls-2"
                      points="183.35 0 111.01 125.29 144.68 125.29 200.36 29.47 183.35 0"
                    />
                    <polygon
                      className="cls-3"
                      points="183.31 0.09 255.64 125.38 221.98 125.38 166.29 29.56 183.31 0.09"
                    />
                    <polygon
                      className="cls-4"
                      points="222.02 125.38 255.69 125.38 311.19 29.24 294.36 0.09 222.02 125.38"
                    />
                    <text
                      className="cls-5"
                      transform="translate(357.29 109.28)"
                    >
                      AD
                      <tspan className="cls-6" x="169.13" y="0">
                        -
                      </tspan>
                      <tspan x="208.08" y="0">
                        WE
                      </tspan>
                      <tspan className="cls-7" x="387.67" y="0">
                        A
                      </tspan>
                      <tspan x="464.93" y="0">
                        VE.IO
                      </tspan>
                    </text>
                  </g>
                </g>
              </svg>
            </Box>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              background: '#fff',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Box>
              <FormProvider {...methods}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="h4" fontWeight={700} color="primary">
                    Welcome Back!
                  </Typography>
                  <Typography color="#66666a">
                    Sign in to your account to continue
                  </Typography>
                </Box>

                <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                  <Box marginY={2} px={8} py={1}>
                    <Box marginY={1}>
                      <InputLabel>Email</InputLabel>
                      <InputField
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        disabled={isLoading}
                        required
                        sx={{ borderRadius: '4px' }}
                      />
                      <Box my={2} />
                      <InputLabel>Password</InputLabel>
                      <InputField
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        disabled={isLoading}
                        error={error != null}
                        errorMessage={error}
                        required
                        sx={{ borderRadius: '4px' }}
                      />
                    </Box>

                    <Box marginLeft="auto">
                      <Button
                        type="submit"
                        loading={isLoading}
                        variant="contained"
                        color="secondary"
                        sx={{ width: '100%' }}
                      >
                        Sign In
                      </Button>
                    </Box>
                  </Box>
                </form>
              </FormProvider>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </BackgroundBox>
  );
}
