// MUI
import { Stack } from '@mui/material';
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
    <StyledStackWrapper>
      <Stack
        px={2}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <CustomSkeletonLoader height={40} width="30%" />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <CustomSkeletonLoader height={40} width={50} />
          <CustomSkeletonLoader height={40} width={50} />
          <CustomSkeletonLoader height={50} width={70} />
        </Stack>
      </Stack>
    </StyledStackWrapper>
  );
};

export default SkeletonLoader;
