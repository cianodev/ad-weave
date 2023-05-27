import React, { useState } from 'react';

import _ from 'lodash';

import PropTypes from 'prop-types';
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import CircleTwoToneIcon from '@mui/icons-material/CircleTwoTone';

import { appColors } from 'theme/variables';

export default function Status({ data, fetch, value, multiselect, onSelect }) {
  // value = id || value = [ids]
  const [selected, setSelected] = useState(value);

  return (
    <Box>
      {fetch ? (
        <Box
          width={100}
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding="0.5em"
        >
          <CircularProgress size={20} color="secondary" />
        </Box>
      ) : (
        <List dense disablePadding>
          {data?.map((data) => (
            <ListItem disablePadding key={data?.id}>
              <ListItemButton
                sx={{
                  textTransform: 'capitalize',
                }}
                selected={
                  multiselect
                    ? selected?.includes(data.id)
                    : data.id == selected
                }
                onClick={() => {
                  if (multiselect) {
                    const isAlreadySelected =
                      selected?.includes(data?.id) ?? false;

                    setSelected(
                      isAlreadySelected
                        ? _.filter(
                            // Remove
                            selected,
                            (id) => id != data?.id
                          )
                        : [
                            // Add
                            ...(selected ?? []),
                            data.id,
                          ]
                    );
                    onSelect(
                      isAlreadySelected
                        ? _.filter(
                            // Remove
                            selected,
                            (id) => id != data?.id
                          )
                        : [
                            // Add
                            ...(selected ?? []),
                            data.id,
                          ]
                    );
                  } else {
                    setSelected(data.id);
                    onSelect(data.id);
                  }
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 'max-content',
                    marginRight: '0.4em',
                  }}
                >
                  <CircleTwoToneIcon
                    sx={{
                      color:
                        appColors?.status[
                          _.camelCase(
                            data?.name?.replace(/_/g, ' ').toLowerCase()
                          )
                        ],
                    }}
                  />
                </ListItemIcon>
                <ListItemText>{data?.name?.replace(/_/g, ' ')}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}

Status.propTypes = {
  data: PropTypes.any,
  fetch: PropTypes.any,
  value: PropTypes.any,
  multiselect: PropTypes.any,
  onSelect: PropTypes.func,
};
