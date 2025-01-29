import { Box, IconButton, Tooltip } from '@mui/material';
import { colors, spacing } from '../../constants/theme';
import {
  Home as HomeIcon,
  AccessTime as ClockIcon,
  Email as EmailIcon,
  Description as DocumentIcon,
  Help as HelpIcon,
  Lock as LockIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Navigation() {
  const navigate = useNavigate();

  const navItems = [
    { 
      icon: <HomeIcon />, 
      tooltip: 'Home',
      path: '/'
    },
    { 
      icon: <ClockIcon />, 
      tooltip: 'Activity',
      path: '/activity'
    },
    { 
      icon: <EmailIcon />, 
      tooltip: 'Messages',
      path: '/messages'
    },
    { 
      icon: <DocumentIcon />, 
      tooltip: 'Documents',
      path: '/documents'
    },
    { 
      icon: <LockIcon />, 
      tooltip: 'Security',
      path: '/security'
    },
    { 
      icon: <HelpIcon />, 
      tooltip: 'Help',
      path: '/help'
    }
  ];

  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100vh',
        width: '80px',
        backgroundColor: colors.primary.main,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: spacing.xl,
        gap: spacing.xl
      }}
    >
      {navItems.map((item, index) => (
        <Tooltip key={index} title={item.tooltip} placement="right">
          <IconButton
            onClick={() => navigate(item.path)}
            sx={{
              color: colors.background.paper,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            {item.icon}
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
}

export default Navigation;