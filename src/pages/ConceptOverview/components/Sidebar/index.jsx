import React, { useContext } from 'react';

import _ from 'lodash';

import {
  MenuList,
  MenuItem,
  Typography,
  ListItemIcon,
  Avatar,
  styled,
} from '@mui/material';

import ConceptOverviewContext from 'pages/ConceptOverview/context';

import { string2Initial } from 'hooks';
import { appColors } from 'theme/variables';
import { Link, useParams } from 'react-router-dom';

const StyledMenuItem = styled(MenuItem)({
  '&.Mui-selected': {
    borderRight: '3px solid #f22176',
  },
});

export default function Sidebar() {
  const { conceptId } = useParams();

  const { conceptList: list } = useContext(ConceptOverviewContext);

  return (
    <MenuList dense>
      {list?.data?.map((data) => (
        <StyledMenuItem
          key={data?.uuid}
          selected={data?.uuid === conceptId}
          component={Link}
          to={`/projects/${data?.partner_uuid}/concept/${data?.uuid}/overview`}
        >
          <ListItemIcon>
            <Avatar
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '3px',
                fontSize: '12px',
                textTransform: 'capitalize',
                backgroundColor:
                  appColors?.status[
                    _.camelCase(data?.status?.replace(/_/g, ' ').toLowerCase())
                  ],
                border: '0.15em solid #fff',
              }}
              {...string2Initial(data?.status?.replace(/_/g, ' '))}
            />
          </ListItemIcon>
          <Typography
            variant="inherit"
            noWrap
            id={data?.uuid}
            title={data?.name}
          >
            {data?.name}
          </Typography>
        </StyledMenuItem>
      ))}
    </MenuList>
  );
}
