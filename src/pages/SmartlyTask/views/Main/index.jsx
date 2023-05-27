import React, { useContext } from 'react';

import _ from 'lodash';

import SmartlyTaskContext from 'pages/SmartlyTask/context';
import {
  AvatarGroup,
  Box,
  Dialog,
  Slide,
  Typography,
  Avatar,
  Button,
  Divider,
  IconButton,
  styled,
  Tabs,
  Tab,
  Grid,
  ImageList,
  ImageListItem,
  Card,
  Alert,
} from '@mui/material';

import ConfettiExplosion from 'react-confetti-explosion';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import ImageNotSupportedTwoToneIcon from '@mui/icons-material/ImageNotSupportedTwoTone';
import { overviewList } from 'pages/SmartlyTask/constant';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: '#5025c4',
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: '#000',
    '&.Mui-selected': {
      color: '#5025c4',
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
  })
);

export default function Main() {
  const { overview, fetchOverview, errorOverview } =
    useContext(SmartlyTaskContext);
  const [open, setOpen] = React.useState(false);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onClickButton = () => {
    setOpen(!open);
  };

  return (
    <Dialog
      TransitionComponent={Transition}
      open={!_.isEmpty(overview) && !fetchOverview}
      fullWidth={true}
      maxWidth="lg"
      PaperProps={{ sx: { height: '100vh', borderRadius: '10px', overflow: 'hidden' } }}
    >
      {open && (
        <ConfettiExplosion
          zIndex={9000}
          style={{
            position: 'absolute',
            top: "20%",
            left: "50%",
            margin: 'auto',
          }}
          width={1500}
          height={1000}
          particleCount={200}
        />
      )}
      <Box
        px={2}
        py={1}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" alignItems="center">
          <Button
            variant="contained"
            disableElevation
            disableFocusRipple
            disableRipple
            disableTouchRipple
            sx={{ marginRight: '1em' }}
            onClick={onClickButton}
          >
            {overview?.status}
          </Button>
          <Typography variant="h6" fontWeight={800}>
            {overview?.name}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <AvatarGroup>
            <Avatar>LD</Avatar>
            <Avatar>LD</Avatar>
            <Avatar>LD</Avatar>
          </AvatarGroup>
          <IconButton size="small">
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Box>
      <Divider />
      <StyledTabs
        value={value}
        onChange={handleChange}
        aria-label="task navigation"
        sx={{ padding: '0 1em' }}
      >
        <StyledTab label="Overview" />
        <StyledTab label="Time logs" />
        <StyledTab label="Revisions" />
        <StyledTab label="Activity log" />
        <StyledTab label="Files" />
        <StyledTab label="Related Tasks" />
      </StyledTabs>

      <Grid container px={3} mt={2} spacing={1}>
        <Grid item xs={2} sx={{ borderRight: '1px solid #ececec' }}>
          <Box>
            <Typography fontWeight={800} color="#5025c4">
              General Information
            </Typography>
          </Box>
          <Grid container>
            {overviewList?.map((data, index) => (
              <Grid key={index} item xs={12}>
                <Typography
                  variant="caption"
                  fontWeight={800}
                  textTransform="uppercase"
                >
                  {data?.label}
                </Typography>
                <Typography fontSize="13px">
                  {_.isEmpty(overview[data?.slug]) ? '-' : overview[data?.slug]}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Box mx={2}>
            <Typography fontWeight={800} color="#5025c4">
              Links
            </Typography>
          </Box>
          <Box mx={2}>
            <Typography fontWeight={800} color="#5025c4">
              Formats
            </Typography>
          </Box>
          <Box mx={2}>
            <Typography fontWeight={800} color="#5025c4" mb={1}>
              Additional Assets
            </Typography>
            <Box display="flex" sx={{ flexFlow: 'wrap' }}>
              {_.isEmpty(overview?.assets) ? (
                <Alert
                  icon={<ImageNotSupportedTwoToneIcon fontSize="inherit" />}
                  severity="secondary"
                >
                  No additional assets attached.
                </Alert>
              ) : (
                overview?.assets?.map((item, index) => (
                  <Box
                    key={index}
                    width={50}
                    height={50}
                    border="1px solid #ececec"
                    borderRadius="10px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    padding="0.5em"
                    margin="0.2em"
                    backgroundColor="#efefef61"
                  >
                    <img
                      src={`${item.file}`}
                      srcSet={`${item.file}`}
                      style={{
                        width: '-webkit-fill-available',
                        height: 'auto',
                      }}
                      alt={item.original_name}
                      loading="lazy"
                    />
                  </Box>
                ))
              )}
            </Box>
          </Box>
          <Box mx={2} mt={2}>
            <Typography fontWeight={800} color="#5025c4">
              Reference
            </Typography>
            <Box
              lineHeight="normal"
              dangerouslySetInnerHTML={{
                __html: overview?.reference,
              }}
            />
          </Box>

          <Box mx={2} mt={2}>
            <Typography fontWeight={800} color="#5025c4">
              Background
            </Typography>
            <Box
              lineHeight="normal"
              dangerouslySetInnerHTML={{
                __html: overview?.background,
              }}
            />
          </Box>

          <Box mx={2} mt={2}>
            <Typography fontWeight={800} color="#5025c4">
              Objectives
            </Typography>
            <Box
              lineHeight="normal"
              dangerouslySetInnerHTML={{
                __html: overview?.objective,
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={7}>
          h
        </Grid>
      </Grid>
    </Dialog>
  );
}
