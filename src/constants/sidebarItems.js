import GridViewTwoToneIcon from '@mui/icons-material/GridViewTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SearchIcon from '@mui/icons-material/Search';
import HelpTwoToneIcon from '@mui/icons-material/HelpTwoTone';
import SupportAgentTwoToneIcon from '@mui/icons-material/SupportAgentTwoTone';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
//import HandshakeIcon from '@mui/icons-material/Handshake';

export const upperNavigation = [
  { icon: GridViewTwoToneIcon, index: 0, label: 'Dashboard', link: '/dashboard' },
  { icon: AccountTreeTwoToneIcon, index: 1, label: 'Projects', link: '/projects' },
  // { icon: StarBorderIcon, index: 2, label: 'Favorites', link: '/favorites' },
  // { icon: HandshakeIcon, index: 3, label: 'Handover', link: '/handover' },
];

export const lowerNavigation = [
  { icon: NotificationsActiveTwoToneIcon, index: 4, label: 'Notifications', link: null },
  { icon: SearchIcon, index: 5, label: 'Search', link: null },
  // { icon: HelpTwoToneIcon, index: 6, label: 'Help Center', link: null },
  { icon: SupportAgentTwoToneIcon, index: 8, label: 'Support', link: '/support'},
  { icon: null, index: 7, label: 'Profile', link: null },
];
