import React, { useContext } from 'react';
import _ from 'lodash';

import ConceptOverviewContext from 'pages/ConceptOverview/context';

import { Grid, Typography, Stack, Chip, Box } from '@mui/material';

export default function PlatformInfo() {
  const {
    conceptOverview: {
      brief: { intro, objectives, formats, otherBusiness },
    },
  } = useContext(ConceptOverviewContext);
  
  return (
    <Grid container spacing={2}>
      {/* Concept Name */}
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Typography variant="button" fontSize="11px" fontWeight={800}>
              Concept Name
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="body1" fontWeight={700}>
              {intro?.name}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {/* Concept Objectives  */}
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Typography variant="button" fontWeight={800} fontSize="11px">
              Objectives
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Stack flexWrap="wrap" direction="row">
              {objectives?.elements?.map((data, index) => (
                <Chip
                  key={index}
                  label={data}
                  variant="outlined"
                  size="small"
                  sx={{
                    textTransform: 'capitalize',
                    borderRadius: 1,
                    marginLeft: '4px',
                    marginBottom: '4px',
                  }}
                  color="primary"
                />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      {/* Concept Language */}
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Typography variant="button" fontWeight={800} fontSize="11px">
              Language
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Stack flexWrap="wrap" direction="row">
              {intro?.languages?.map((data, index) => (
                <Chip
                  key={index}
                  label={data}
                  variant="outlined"
                  size="small"
                  sx={{
                    textTransform: 'uppercase',
                    borderRadius: 1,
                    marginLeft: '4px',
                    marginBottom: '4px',
                  }}
                  color="secondary"
                />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      {/* Formats */}
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Typography variant="button" fontWeight={800} fontSize="11px">
              Formats
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Grid container spacing={2}>
              {/* Google Dispaly */}
              {!_.isEmpty(formats?.google?.display) && (
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    color="#8a8a8a"
                    fontWeight={800}
                    mb={1}
                  >
                    Google Display
                  </Typography>
                  <Stack flexWrap="wrap" direction="row">
                    {formats?.google?.display?.map((data, index) => (
                      <Chip
                        key={index}
                        label={data}
                        variant="outlined"
                        size="small"
                        sx={{
                          borderRadius: 1,
                          marginLeft: '4px',
                          marginBottom: '4px',
                        }}
                        color="warning"
                      />
                    ))}
                  </Stack>
                </Grid>
              )}

              {/* Google Video */}
              {!_.isEmpty(formats?.google?.video) && (
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    color="#8a8a8a"
                    fontWeight={800}
                    mb={1}
                  >
                    Google Video
                  </Typography>
                  <Stack direction="row">
                    {formats?.google?.video?.map((data, index) => (
                      <Chip
                        key={index}
                        label={data}
                        variant="outlined"
                        size="small"
                        sx={{
                          borderRadius: 1,
                          marginLeft: '4px',
                          marginBottom: '4px',
                        }}
                        color="warning"
                      />
                    ))}
                  </Stack>
                </Grid>
              )}

              {/* Meta Static */}
              {!_.isEmpty(formats?.facebook?.static) && (
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    color="#8a8a8a"
                    fontWeight={800}
                    mb={1}
                  >
                    Meta Static
                  </Typography>
                  <Stack flexWrap="wrap" direction="row">
                    {formats?.facebook?.static?.map((data, index) => (
                      <Chip
                        key={index}
                        label={data}
                        variant="outlined"
                        size="small"
                        sx={{
                          borderRadius: 1,
                          textTransform: 'capitalize',

                          marginLeft: '4px',
                          marginBottom: '4px',
                        }}
                        color="info"
                      />
                    ))}
                  </Stack>
                </Grid>
              )}

              {/* Meta Video */}
              {!_.isEmpty(formats?.facebook?.video) && (
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    color="#8a8a8a"
                    fontWeight={800}
                    mb={1}
                  >
                    Meta Video
                  </Typography>
                  <Stack flexWrap="wrap" direction="row">
                    {formats?.facebook?.video?.map((data, index) => (
                      <Chip
                        key={index}
                        label={data}
                        variant="outlined"
                        size="small"
                        sx={{
                          borderRadius: 1,
                          textTransform: 'capitalize',

                          marginLeft: '4px',
                          marginBottom: '4px',
                        }}
                        color="info"
                      />
                    ))}
                  </Stack>
                </Grid>
              )}

              {/* Youtube */}
              {!_.isEmpty(formats?.youtube?.video) && (
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    color="#8a8a8a"
                    fontWeight={800}
                    mb={1}
                  >
                    Youtube
                  </Typography>
                  <Stack flexWrap="wrap" direction="row">
                    {formats?.youtube?.video?.map((data, index) => (
                      <Chip
                        key={index}
                        label={data}
                        variant="outlined"
                        size="small"
                        sx={{
                          borderRadius: 1,
                          textTransform: 'capitalize',

                          marginLeft: '4px',
                          marginBottom: '4px',
                        }}
                        color="error"
                      />
                    ))}
                  </Stack>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* Additional Information */}
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Typography variant="button" fontWeight={800} fontSize="11px">
              Additional Info
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Box
              lineHeight="normal"
              whiteSpace="pre-line"
              margin="0px"
              dangerouslySetInnerHTML={{
                __html:
                  otherBusiness?.text ??
                  'No additional information set in the platform',
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
