import React from 'react';

import PropTypes from 'prop-types';
import _ from 'lodash';
import { Box, Checkbox, FormControlLabel, FormGroup } from '@mui/material';

export default function FilterAsset({ assets }) {
  return (
    <Box px={2} py={1}>
      <FormGroup>
        {_.map(_.uniqBy(assets, 'type'), (asset) => asset.type)?.map(
          (asset, index) => (
            <FormControlLabel
              key={index}
              control={<Checkbox />}
              label={asset}
              sx={{ textTransform: 'capitalize' }}
            />
          )
        )}
      </FormGroup>
    </Box>
  );
}

FilterAsset.propTypes = {
  assets: PropTypes.array,
};
