import FormatListBulletedTwoToneIcon from '@mui/icons-material/FormatListBulletedTwoTone';
import PersonOffTwoToneIcon from '@mui/icons-material/PersonOffTwoTone';
import SpeakerNotesOffTwoToneIcon from '@mui/icons-material/SpeakerNotesOffTwoTone';
import TodayTwoToneIcon from '@mui/icons-material/TodayTwoTone';
import VolunteerActivismTwoToneIcon from '@mui/icons-material/VolunteerActivismTwoTone';

import pie from 'assets/icons/pie.svg';
import line from 'assets/icons/line.svg';
import bar from 'assets/icons/bar.svg';
import dot from 'assets/icons/dot.svg';

export const filterList = [
  {
    filter_key: 'status',
    label: 'Status',
  },
  {
    filter_key: 'priority',
    label: 'Priority',
  },
  {
    filter_key: 'assignee',
    label: 'Assignee',
  },
];

export const cardStatus = [
  {
    label: 'Not Started',
    key: 'not_started',
    image: pie,
    color: '#402176',
  },
  {
    label: 'In-Progress',
    key: 'in_progress',
    image: line,
    color: '#15a6c9',
  },
  {
    label: 'Completed',
    key: 'completed',
    image: dot,
    color: '#f2b601',
  },
  {
    label: 'On-Hold',
    key: 'on_hold',
    image: bar,
    color: '#f16079',
  },
];

export const sideNavigation = [
  {
    label: 'All Tasks',
    search: '',
    icon: <FormatListBulletedTwoToneIcon />,
    key: 'dashboard',
    slug: 'all_task',
  },
  {
    label: 'Unassigned',
    search: '?queue=unassigned',
    icon: <PersonOffTwoToneIcon />,
    key: 'unassigned',
    slug: 'unassigned',
  },
  {
    label: 'Unanswered',
    search: '?queue=unanswered',
    icon: <SpeakerNotesOffTwoToneIcon />,
    key: 'unanswered',
    slug: 'unresponded',
  },
  {
    label: 'Due Today',
    search: '?queue=due-today',
    icon: <TodayTwoToneIcon />,
    key: 'due-today',
    slug: 'due_today',
  },
  {
    label: 'My Tasks',
    search: '?queue=my-tasks',
    icon: <VolunteerActivismTwoToneIcon />,
    key: 'my-tasks',
    slug: 'my_tasks',
  },
];
