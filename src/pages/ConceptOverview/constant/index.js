import { Box, styled } from '@mui/material';
import google from 'assets/smartly/icons/googleIconGray.svg';
import meta from 'assets/smartly/icons/metaIconGray.svg';
import youtube from 'assets/smartly/icons/youtubeIconGray.svg';
import googleChannel from 'assets/smartly/icons/google.svg';
import metaChannel from 'assets/smartly/icons/meta.svg';
import youtubeChannel from 'assets/smartly/icons/youtube.svg';

import ImageTwoToneIcon from '@mui/icons-material/ImageTwoTone';
import VideocamTwoToneIcon from '@mui/icons-material/VideocamTwoTone';

const StyledBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

export const googleDisplay = (
  <StyledBox>
    <img style={{ width: '15px' }} src={google} alt="google display" />{' '}
    <ImageTwoToneIcon sx={{ color: '#7d6d9b' }} />
  </StyledBox>
);
export const googleVideo = (
  <StyledBox>
    <img style={{ width: '15px' }} src={google} alt="google video" />{' '}
    <VideocamTwoToneIcon sx={{ color: '#7d6d9b' }} />
  </StyledBox>
);
export const metaStatic = (
  <StyledBox>
    <img style={{ width: '15px' }} src={meta} alt="meta static" />{' '}
    <ImageTwoToneIcon sx={{ color: '#7d6d9b' }} />
  </StyledBox>
);
export const metaVideo = (
  <StyledBox>
    <img style={{ width: '15px' }} src={meta} alt="meta video" />{' '}
    <VideocamTwoToneIcon sx={{ color: '#7d6d9b' }} />
  </StyledBox>
);
export const youtubeVideo = (
  <StyledBox>
    <img style={{ width: '15px' }} src={youtube} alt="youtube" />{' '}
    <VideocamTwoToneIcon sx={{ color: '#7d6d9b' }} />
  </StyledBox>
);

export const channels = [
  {
    label: 'google',
    content: (
      <img style={{ width: '20px' }} src={googleChannel} alt="google channel" />
    ),
  },
  {
    label: 'facebook',
    content: (
      <img style={{ width: '20px' }} src={metaChannel} alt="meta channel" />
    ),
  },
  {
    label: 'youtube',
    content: (
      <img
        style={{ width: '20px' }}
        src={youtubeChannel}
        alt="youtube channel"
      />
    ),
  },
];

export const campaignTable = [
  {
    label: '',
    width: 27,
    slug: '',
    type: '',
    align: '',
  },
  {
    label: 'Name',
    width: 300,
    slug: 'name',
    type: 'link',
    align: 'left',
  },
  {
    label: 'Status',
    width: 100,
    slug: 'status',
    type: 'buttonSelection',
    align: 'center',
  },
  {
    label: 'Channels',
    width: 80,
    slug: 'channel',
    type: 'image',
    align: 'center',
  },
  {
    label: 'Watchers',
    width: 150,
    slug: 'followers',
    type: 'avatar',
    align: 'center',
  },
  {
    label: 'Tags',
    width: 150,
    slug: 'tags',
    type: 'chip',
    align: 'center',
  },
  {
    label: 'Delivery Type',
    width: 120,
    slug: 'delivery_type',
    type: 'colorTag',
    align: 'center',
  },
  {
    label: 'Delivery Date',
    width: 180,
    slug: 'delivery_date',
    type: 'date',
    align: 'center',
  },
  {
    label: 'Personalization Type',
    width: 150,
    slug: 'personalization_type',
    type: 'text',
    align: 'center',
  },
  {
    label: 'Launch Date',
    width: 180,
    slug: 'launch_date',
    type: 'date',
    align: 'center',
  },
  {
    label: 'Date Created',
    width: 180,
    slug: 'date_created',
    type: 'textDate',
    align: 'center',
  },
];

export const taskTable = [
  {
    label: '',
    width: 27,
    slug: '',
    type: '',
    align: '',
  },
  {
    label: 'Parent Task Name',
    width: 300,
    slug: 'name',
    type: 'link',
    align: 'left',
  },
  {
    label: 'Status',
    width: 100,
    slug: 'status',
    type: 'buttonSelection',
    align: 'center',
  },
  {
    label: 'Assignee',
    width: 150,
    slug: 'assignee',
    type: 'avatar',
    align: 'center',
  },
  {
    label: 'Tags',
    width: 150,
    slug: 'tags',
    type: 'chip',
    align: 'center',
  },
  {
    label: 'Due Date',
    width: 180,
    slug: 'due_date',
    type: 'date',
    align: 'center',
  },
  {
    label: 'Delivery Date',
    width: 180,
    slug: 'delivery_date',
    type: 'date',
    align: 'center',
  },
  {
    label: 'Watchers',
    width: 150,
    slug: 'watchers',
    type: 'avatar',
    align: 'center',
  },
  {
    label: 'Date Created',
    width: 180,
    slug: 'date_created',
    type: 'textDate',
    align: 'center',
  },
];

export const campaignTaskTable = [
  {
    label: '',
    width: 27,
    slug: '',
    type: '',
    align: '',
  },
  {
    label: 'Parent Task Name',
    width: 272,
    slug: 'name',
    type: 'link',
    align: 'left',
  },
  {
    label: 'Status',
    width: 100,
    slug: 'status',
    type: 'buttonSelection',
    align: 'center',
  },
  {
    label: 'Assignee',
    width: 150,
    slug: 'assignee',
    type: 'avatar',
    align: 'center',
  },
  {
    label: 'Tags',
    width: 232,
    slug: 'tags',
    type: 'chip',
    align: 'center',
  },
  {
    label: 'Due Date',
    width: 200,
    slug: 'due_date',
    type: 'date',
    align: 'center',
  },
  {
    label: 'Delivery Date',
    width: 200,
    slug: 'delivery_date',
    type: 'date',
    align: 'center',
  },
  {
    label: 'Watchers',
    width: 232,
    slug: 'watchers',
    type: 'avatar',
    align: 'center',
  },
  {
    label: 'Date Created',
    width: 180,
    slug: 'date_created',
    type: 'textDate',
    align: 'center',
  },
];

export const subtaskTable = [
  {
    label: '',
    width: 10,
    slug: '',
    type: '',
    align: '',
  },
  {
    label: 'Sub-Task Name',
    width: 290,
    slug: 'name',
    type: 'link',
    align: 'left',
  },
  {
    label: 'Status',
    width: 100,
    slug: 'status',
    type: 'buttonSelection',
    align: 'center',
  },
  {
    label: 'Assignee',
    width: 150,
    slug: 'assignee',
    type: 'avatar',
    align: 'center',
  },
  {
    label: 'Tags',
    width: 150,
    slug: 'tags',
    type: 'chip',
    align: 'center',
  },
  {
    label: 'Due Date',
    width: 180,
    slug: 'due_date',
    type: 'date',
    align: 'center',
  },
  {
    label: 'Delivery Date',
    width: 180,
    slug: 'delivery_date',
    type: 'date',
    align: 'center',
  },
  {
    label: 'Watchers',
    width: 150,
    slug: 'watchers',
    type: 'avatar',
    align: 'center',
  },
  {
    label: 'Date Created',
    width: 180,
    slug: 'date_created',
    type: 'textDate',
    align: 'center',
  },
];

export const campaignSubtaskTable = [
  {
    label: '',
    width: 10,
    slug: '',
    type: '',
    align: '',
  },
  {
    label: 'Sub-Task Name',
    width: 262,
    slug: 'name',
    type: 'link',
    align: 'left',
  },
  {
    label: 'Status',
    width: 100,
    slug: 'status',
    type: 'buttonSelection',
    align: 'center',
  },
  {
    label: 'Assignee',
    width: 150,
    slug: 'assignee',
    type: 'avatar',
    align: 'center',
  },
  {
    label: 'Tags',
    width: 232,
    slug: 'tags',
    type: 'chip',
    align: 'center',
  },
  {
    label: 'Due Date',
    width: 200,
    slug: 'due_date',
    type: 'date',
    align: 'center',
  },
  {
    label: 'Delivery Date',
    width: 200,
    slug: 'delivery_date',
    type: 'date',
    align: 'center',
  },
  {
    label: 'Watchers',
    width: 232,
    slug: 'watchers',
    type: 'avatar',
    align: 'center',
  },
  {
    label: 'Date Created',
    width: 180,
    slug: 'date_created',
    type: 'textDate',
    align: 'center',
  },
];
