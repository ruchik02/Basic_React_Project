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

function Navigation() {
  const navItems = [
    { icon: <LockIcon />, tooltip: 'Security' },
    { icon: <HomeIcon />, tooltip: 'Home' },
    { icon: <ClockIcon />, tooltip: 'Activity' },
    { icon: <EmailIcon />, tooltip: 'Messages' },
    { icon: <DocumentIcon />, tooltip: 'Documents' },
    { icon: <HelpIcon />, tooltip: 'Help' }
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