// MUI
import { Divider, Stack } from '@mui/material';
import { styled } from '@mui/styles';

// App Components
import CustomSkeletonLoader from 'components/Common/Skeleton';

// Utilities
import { appColors } from 'theme/variables';

const StyledStackWrapper = styled(Stack)({
  border: `2px solid ${appColors.lighterGray}`,
  borderRadius: 5,
});

const SkeletonLoader = () => {
  return (
    <Stack spacing={2}>
      {[...Array(3).keys()].map((_, index) => (
        <StyledStackWrapper key={index}>
          <Stack
            p={2}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <CustomSkeletonLoader height={40} width="10%" />
            <Stack
              direction="row"
              alignItems="center"
              width="10%"
              justifyContent="space-between"
            >
              <CustomSkeletonLoader height={30} width="30%" />
              <CustomSkeletonLoader height={40} width="60%" />
            </Stack>
          </Stack>
          <Divider sx={{ border: `1px solid ${appColors.lighterGray}` }} />
          <Stack p={2} spacing={4}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <CustomSkeletonLoader height={25} width="15%" />
              <Stack spacing={3} direction="row">
                <CustomSkeletonLoader height={25} width={60} />
                <CustomSkeletonLoader height={25} width={60} />
                <CustomSkeletonLoader height={25} width={80} />
                <Stack spacing={1} direction="row">
                  <CustomSkeletonLoader
                    variant="circular"
                    height={25}
                    width={25}
                  />
                  <CustomSkeletonLoader
                    variant="circular"
                    height={25}
                    width={25}
                  />
                </Stack>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <CustomSkeletonLoader height={25} width="10%" />
              <Stack spacing={3} direction="row">
                <CustomSkeletonLoader height={25} width={60} />
                <CustomSkeletonLoader height={25} width={60} />
                <CustomSkeletonLoader height={25} width={80} />
                <Stack spacing={1} direction="row">
                  <CustomSkeletonLoader
                    variant="circular"
                    height={25}
                    width={25}
                  />
                  <CustomSkeletonLoader
                    variant="circular"
                    height={25}
                    width={25}
                  />
                </Stack>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <CustomSkeletonLoader height={25} width="30%" />
              <Stack spacing={3} direction="row">
                <CustomSkeletonLoader height={25} width={60} />
                <CustomSkeletonLoader height={25} width={60} />
                <CustomSkeletonLoader height={25} width={80} />
                <Stack spacing={1} direction="row">
                  <CustomSkeletonLoader
                    variant="circular"
                    height={25}
                    width={25}
                  />
                  <CustomSkeletonLoader
                    variant="circular"
                    height={25}
                    width={25}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </StyledStackWrapper>
      ))}
    </Stack>
  );
};

export default SkeletonLoader;
